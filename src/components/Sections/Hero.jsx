import { motion } from 'framer-motion';
import { Play, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { personalData, projects, skills, certifications } from '../../data/portfolioData';
import Typewriter from '../UI/Typewriter';
// Cropped + background-keyed from the supplied render, so it sits on paper.
import avatar from '../../assets/avatar-cut.png';

const services = [
    'Full Stack Development (MERN)',
    'AI/ML & GenAI Integration',
    'Cloud & DevOps (AWS / Azure)',
    'UX/UI Design (Figma)',
    'Data Science & Analytics',
    'SEO & Performance',
];

// Counts derive from the real certification list so the chips can never drift.
const credentials = [
    { label: 'AWS', count: certifications.filter((c) => c.includes('AWS')).length },
    { label: 'OCI', count: certifications.filter((c) => c.includes('OCI')).length },
    { label: 'AZURE', count: certifications.filter((c) => c.includes('Azure')).length },
];

const socials = [
    { icon: Github, url: personalData.social.github, label: 'GitHub' },
    { icon: Linkedin, url: personalData.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: personalData.social.twitter, label: 'X' },
];

// Shared between the in-flow mobile placement and the absolute desktop one.
// Same `src` either way, so the browser fetches it once.
const Avatar = ({ className = '' }) => (
    <div className="relative flex items-end">
        <div className="absolute bottom-[18%] left-1/2 h-[52vh] w-[52vh] -translate-x-1/2 animate-spin-slow rounded-full border border-dashed border-term/25" />
        <div className="absolute bottom-[20%] left-1/2 h-[42vh] w-[42vh] -translate-x-1/2 animate-spin-rev rounded-full border border-term/15" />
        <div className="absolute bottom-[22%] left-1/2 h-[38vh] w-[38vh] -translate-x-1/2 animate-pulse-ring rounded-full border-2 border-term/30" />

        <motion.img
            src={avatar}
            alt={`${personalData.name} — 3D avatar`}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className={`avatar-fade relative w-auto animate-float object-contain drop-shadow-[0_18px_40px_rgba(255,95,31,0.28)] ${className}`}
        />
    </div>
);

const Hero = () => {
    const scrollToProjects = (e) => {
        e.preventDefault();
        const el = document.querySelector('#projects');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen w-full overflow-hidden">

            {/* ── Oversized name, sitting behind the avatar ── */}
            <div className="pointer-events-none absolute inset-x-0 top-[16%] z-0 flex flex-col items-center justify-center sm:top-[13%]">
                <h1 className="text-outline whitespace-nowrap text-[19vw] font-black uppercase leading-[0.82] tracking-tighter">
                    DIVYANSH
                </h1>
                <h1 className="text-outline-term whitespace-nowrap text-[19vw] font-black uppercase leading-[0.82] tracking-tighter">
                    KUMAWAT
                </h1>
            </div>

            {/* ── Avatar: absolute and dominant from lg up, where the headline
                   sits in its own column and never collides with it. ── */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center lg:flex">
                <Avatar className="h-[82vh]" />
            </div>

            {/* ── Foreground UI ── */}
            <div className="relative z-20 flex min-h-screen flex-col px-5 pt-24 sm:px-6 md:px-10 lg:px-14">

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">

                    {/* Terminal readout */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-2 lg:col-span-1"
                    >
                        <div className="brackets border border-rule bg-surface/85 p-4 backdrop-blur-sm">
                            <div className="mb-3 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-term" />
                                <span className="h-2 w-2 rounded-full bg-ink/20" />
                                <span className="h-2 w-2 rounded-full bg-ink/20" />
                                <span className="font-pixel ml-2 text-[10px] uppercase tracking-widest text-ink-mute">
                                    ~/divyansh
                                </span>
                            </div>
                            <Typewriter
                                className="text-xs text-ink-soft"
                                lines={[
                                    'whoami',
                                    'MERN + AI/ML engineer',
                                    'AWS · Azure · Oracle certified',
                                    'VIT Vellore — CSE',
                                ]}
                            />
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            {socials.map(({ icon: Icon, url, label }) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="border border-rule bg-surface p-2 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-term hover:text-term hover:shadow-[3px_3px_0_0_#FF5F1F]"
                                >
                                    <Icon size={15} strokeWidth={1.75} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <div className="hidden lg:block" />
                    <div className="hidden lg:block" />

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-2 text-right lg:col-span-1 lg:text-left"
                    >
                        <p className="section-label prompt mb-3 text-sm">Services</p>
                        <ul className="space-y-1 text-sm text-ink-soft">
                            {services.map((s) => (
                                <li key={s} className="transition-colors duration-200 hover:text-term">{s}</li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* In-flow on small screens: stacking keeps the headline legible
                    instead of laying it over the face. */}
                <div className="mt-6 flex justify-center lg:hidden">
                    <Avatar className="h-[38vh] sm:h-[46vh]" />
                </div>

                <div className="flex-1" />

                {/* Bottom block */}
                <div className="pb-5">
                    <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2">

                        <motion.div
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="section-label prompt cursor mb-4 text-sm">init portfolio</p>
                            <h2
                                className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]"
                                style={{ lineHeight: 0.86 }}
                            >
                                I BRING THE
                                <br />
                                <span className="font-pixel font-normal text-term">UNEXPECTED</span> TO
                                <br />
                                WEB &amp; AI
                                <br />
                                <span className="font-pixel font-normal text-term">EXPERIENCES</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-5 lg:items-end"
                        >
                            <div className="flex flex-wrap gap-3">
                                <a href="#projects" onClick={scrollToProjects} className="btn-primary">
                                    <Play size={14} fill="currentColor" />
                                    VIEW PROJECTS
                                </a>
                                <a
                                    href={personalData.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline"
                                >
                                    <Download size={14} />
                                    RESUME
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {credentials.map((c) => (
                                    <div
                                        key={c.label}
                                        className="flex items-center gap-2 border border-rule bg-term-tint px-3 py-1.5"
                                    >
                                        <span className="font-pixel text-sm text-term-deep">[{c.label}]</span>
                                        <span className="font-pixel text-xs text-ink-mute">x{c.count}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Status strip */}
                    <div className="mt-6 flex flex-col gap-2 border-t border-rule pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-pixel text-xs text-ink-mute">
                            <span className="mr-2 inline-block h-2 w-2 animate-blink bg-term" />
                            STATUS: OPEN TO INTERNSHIPS, FREELANCE OR FULL-TIME.{' '}
                            <a
                                href={`mailto:${personalData.email}?subject=Let%27s%20work%20together`}
                                className="text-term underline decoration-term/40 underline-offset-4 transition-colors hover:text-ink"
                            >
                                SCHEDULE A CALL
                            </a>
                        </p>
                        <p className="font-pixel text-xs text-ink-mute sm:text-right">
                            {projects.length} PROJECTS &middot; {skills.length} SKILLS &middot; {certifications.length} CERTS
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
