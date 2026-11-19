import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import SectionHeader from '../UI/SectionHeader';

const inputClasses =
    "w-full border border-rule bg-black/40 px-4 py-3 text-sm text-ink transition-colors duration-200 placeholder:text-ink-mute/60 focus:border-term focus:outline-none focus:ring-2 focus:ring-term/20";

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };

const Contact = () => {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    // Sends through /api/contact (Resend), so the message lands in the inbox
    // without relying on the visitor having a mail app set up.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');
        setError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
            setStatus('sent');
            setForm(EMPTY);
        } catch (err) {
            setError(err.message === 'Failed to fetch'
                ? `Couldn't reach the server. Please email ${personalData.email} directly.`
                : err.message);
            setStatus('error');
        }
    };

    const channels = [
        { icon: Mail, label: 'email', value: personalData.email, href: `mailto:${personalData.email}` },
        { icon: Phone, label: 'phone', value: personalData.phone, href: `tel:${personalData.phone.replace(/\s/g, '')}` },
        { icon: MapPin, label: 'location', value: personalData.location, href: null },
    ];

    return (
        <section id="contact" className="relative border-t border-white/5 bg-white/[0.018] py-24 px-5 sm:px-6 md:px-10 lg:px-14">
            <SectionHeader
                index="06"
                label="talk"
                title="LET'S"
                pixelWord="BUILD SOMETHING"
                lede="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Channels */}
                <div className="grid grid-cols-1 gap-3 self-start">
                    {channels.map(({ icon: Icon, label, value, href }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="brackets panel panel-glow group p-5"
                        >
                            <div className="mb-3 flex items-center gap-3">
                                <span className="grid h-9 w-9 place-items-center border border-rule bg-term-tint text-term transition-colors duration-300 group-hover:bg-term group-hover:text-white">
                                    <Icon size={16} strokeWidth={1.75} />
                                </span>
                                <span className="font-pixel prompt text-sm uppercase tracking-widest text-term">
                                    {label}
                                </span>
                            </div>
                            {href ? (
                                <a href={href} className="break-all text-sm text-ink-soft transition-colors hover:text-term">
                                    {value}
                                </a>
                            ) : (
                                <p className="text-sm text-ink-soft">{value}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Form */}
                <motion.div
                    className="border border-rule bg-surface/70 p-7 md:p-9 lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <form className="relative space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="font-pixel prompt mb-2 block text-sm uppercase tracking-widest text-term">Name</label>
                                <input id="name" type="text" value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputClasses} required />
                            </div>
                            <div>
                                <label htmlFor="email" className="font-pixel prompt mb-2 block text-sm uppercase tracking-widest text-term">Email</label>
                                <input id="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" className={inputClasses} required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="font-pixel prompt mb-2 block text-sm uppercase tracking-widest text-term">Subject</label>
                            <input id="subject" type="text" value={form.subject} onChange={handleChange} placeholder="Project inquiry" className={inputClasses} required />
                        </div>

                        <div>
                            <label htmlFor="message" className="font-pixel prompt mb-2 block text-sm uppercase tracking-widest text-term">Message</label>
                            <textarea id="message" rows="6" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." className={`${inputClasses} resize-none`} required />
                        </div>

                        {/* Honeypot: hidden from people, tempting to bots. */}
                        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                            <label htmlFor="website">Website</label>
                            <input id="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
                        </div>

                        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:cursor-wait disabled:opacity-70">
                            {status === 'sending' ? (
                                <>Sending<Loader2 size={16} className="animate-spin" /></>
                            ) : (
                                <>Send Message<Send size={16} /></>
                            )}
                        </button>

                        <div aria-live="polite">
                            {status === 'sent' && (
                                <p className="font-pixel flex items-center gap-2 text-sm text-term">
                                    <Check size={16} /> message sent. I&apos;ll get back to you soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="font-pixel text-sm text-red-400">error: {error}</p>
                            )}
                            {(status === 'idle' || status === 'sending') && (
                                <p className="font-pixel text-xs text-ink-mute">
                                    {'//'} goes straight to my inbox. I usually reply within a day or two.
                                </p>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
