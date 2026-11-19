// POST /api/contact: emails a contact-form message to the site owner via Resend.
import { personalData } from '../src/data/portfolioData.js';
import { HttpError, handleError, rateLimit, readJson, sendJson } from './_lib/http.js';

const RESEND_URL = 'https://api.resend.com/emails';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };

const escapeHtml = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Header-safe: no line breaks can sneak into the subject.
const oneLine = (s) => s.replace(/[\r\n]+/g, ' ').trim();

function validate(body) {
    const field = (key) => (typeof body[key] === 'string' ? body[key].trim() : '');
    const data = {
        name: oneLine(field('name')),
        email: field('email'),
        subject: oneLine(field('subject')),
        message: field('message'),
    };

    if (!data.name) throw new HttpError(400, 'Please add your name.');
    if (!EMAIL_RE.test(data.email)) throw new HttpError(400, 'Please enter a valid email address.');
    if (data.message.length < 10) throw new HttpError(400, 'Your message is a little short. Add a few more details.');
    for (const [key, max] of Object.entries(LIMITS)) {
        if (data[key].length > max) throw new HttpError(400, `The ${key} is too long (max ${max} characters).`);
    }
    return data;
}

function buildEmail({ name, email, subject, message }) {
    const title = subject || 'New message';
    const text = [
        `New message from your portfolio contact form`,
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${title}`,
        '',
        message,
        '',
        '(Reply to this email to answer them directly.)',
    ].join('\n');

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#111">
  <h2 style="margin:0 0 12px;color:#FF5F1F">New portfolio message</h2>
  <table style="border-collapse:collapse;margin-bottom:16px;font-size:14px">
    <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td style="padding:4px 0"><strong>${escapeHtml(name)}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Subject</td><td style="padding:4px 0">${escapeHtml(title)}</td></tr>
  </table>
  <div style="white-space:pre-wrap;font-size:15px;line-height:1.55;border-left:3px solid #FF5F1F;padding:8px 14px;background:#fff7f2">${escapeHtml(message)}</div>
  <p style="margin-top:16px;font-size:12px;color:#888">Hit reply to answer ${escapeHtml(name)} directly.</p>
</div>`;

    return { subject: `[Portfolio] ${title} (from ${name})`, text, html };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return handleError(res, new HttpError(405, 'Use POST.'));
    }

    try {
        rateLimit(req, { key: 'contact', limit: 5, windowMs: 10 * 60_000 });
        const body = await readJson(req);

        // Honeypot: a hidden field real visitors never fill. Pretend success so
        // bots don't learn to skip it.
        if (typeof body.website === 'string' && body.website.trim()) {
            return sendJson(res, 200, { ok: true });
        }

        const data = validate(body);

        const apiKey = process.env.RESEND_API_KEY?.trim();
        if (!apiKey) {
            throw new HttpError(503, `The contact form isn't configured yet. Please email ${personalData.email} directly.`);
        }
        const to = process.env.CONTACT_TO_EMAIL?.trim() || personalData.email;
        const from = process.env.CONTACT_FROM_EMAIL?.trim() || 'Portfolio Contact <onboarding@resend.dev>';

        const { subject, text, html } = buildEmail(data);

        let response;
        try {
            response = await fetch(RESEND_URL, {
                method: 'POST',
                headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text, html }),
            });
        } catch {
            throw new HttpError(502, `Couldn't send right now. Please email ${personalData.email} directly.`);
        }

        if (!response.ok) {
            let detail = '';
            try {
                detail = (await response.json())?.message || '';
            } catch { /* not JSON */ }
            console.error(`Resend ${response.status}: ${detail}`);
            throw new HttpError(502, `Couldn't send right now. Please email ${personalData.email} directly.`);
        }

        sendJson(res, 200, { ok: true });
    } catch (err) {
        handleError(res, err);
    }
}
