// Small helpers shared by the /api functions. Written against plain Node
// req/res so the same handlers run on Vercel and in the Vite dev middleware.

export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export function sendJson(res, status, body) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
}

export async function readJson(req, maxBytes = 32_000) {
    // Vercel pre-parses JSON bodies; the dev server hands us the raw stream.
    if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === 'object') return req.body;
        try {
            return JSON.parse(req.body);
        } catch {
            throw new HttpError(400, 'Body must be valid JSON.');
        }
    }

    let raw = '';
    for await (const chunk of req) {
        raw += chunk;
        if (raw.length > maxBytes) throw new HttpError(413, 'Request is too large.');
    }
    if (!raw) return {};
    try {
        return JSON.parse(raw);
    } catch {
        throw new HttpError(400, 'Body must be valid JSON.');
    }
}

// Best-effort, per-instance limiter. Serverless instances don't share memory,
// so this stops casual hammering rather than a determined attacker; the Groq
// key's own rate limits are the hard backstop.
const buckets = new Map();

export function rateLimit(req, { key, limit, windowMs }) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim()
        || req.socket?.remoteAddress
        || 'unknown';
    const id = `${key}:${ip}`;
    const now = Date.now();

    if (buckets.size > 5000) {
        for (const [k, b] of buckets) if (b.reset <= now) buckets.delete(k);
    }

    const bucket = buckets.get(id);
    if (!bucket || bucket.reset <= now) {
        buckets.set(id, { count: 1, reset: now + windowMs });
        return;
    }
    bucket.count += 1;
    if (bucket.count > limit) {
        const mins = Math.ceil((bucket.reset - now) / 60_000);
        throw new HttpError(429, `Easy there. Rate limit reached; try again in ~${mins} min.`);
    }
}

export function handleError(res, err) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof HttpError ? err.message : 'Something went wrong on the server.';
    if (status === 500) console.error(err);
    if (res.headersSent) {
        res.end();
        return;
    }
    sendJson(res, status, { error: message });
}
