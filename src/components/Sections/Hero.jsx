import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Play, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { personalData, projects, skills, certifications } from '../../data/portfolioData';
import Typewriter from '../UI/Typewriter';
// Cropped + background-keyed from the supplied render, so it sits on paper.
import avatar from '../../assets/avatar-cut.png';
// Zoom-out chain for the scroll sequence, segmented from their baked
// backgrounds (u2net) and shipped as WebP-with-alpha. Ordered by measured
// head size: waist (tightest) -> neck -> knees -> full body.
import stageWaist from '../../assets/waist-cut.webp';
import stageNeck from '../../assets/neck-cut.webp';
import stageKnees from '../../assets/knees-cut.webp';
import fullBody from '../../assets/fullimage-cut.webp';

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

// One intermediate framing in the zoom-out chain. Fades in over [r0,r1],
// holds, fades out over [r2,r3], while continuously shrinking — so each
// handoff overlaps a stage that is still in motion and reads as one pull-back.
const MidStage = ({ progress, src, range }) => {
    const [r0, r1, r2, r3] = range;
    const opacity = useTransform(progress, [r0, r1, r2, r3], [0, 1, 1, 0]);
    const scale = useTransform(progress, [r0, r3], [1.22, 0.9]);
    return (
        <motion.div
            style={{ opacity, scale, transformOrigin: 'top center' }}
            className="absolute inset-x-0 bottom-0 flex justify-center"
        >
            <img
                src={src}
                alt=""
                aria-hidden="true"
                className="h-[84vh] w-auto object-contain drop-shadow-[0_18px_40px_rgba(255,95,31,0.22)]"
            />
        </motion.div>
    );
};

const Hero = () => {
    const heroRef = useRef(null);
    const prefersReduced = useReducedMotion();

    // 0 at the top of the page, 1 when the tall section has fully scrolled by.
    // The inner viewport is sticky, so this progress scrubs the sequence.
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });

    // Phase A — zoom-out through the framing chain, every layer shrinking
    // while the next fades in, so it reads as one continuous camera move.
    const faceOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0]);
    const faceScale = useTransform(scrollYProgress, [0, 0.16], [1, 0.6]);
    const bodyOpacity = useTransform(scrollYProgress, [0.52, 0.6], [0, 1]);
    const bodyScale = useTransform(scrollYProgress, [0.52, 0.68], [1.14, 1]);
    // Phase B — one full turn, scrubbed by the remaining scroll.
    const bodyRotate = useTransform(scrollYProgress, [0.68, 0.96], [0, 360]);

    const scrollToProjects = (e) => {
        e.preventDefault();
        const el = document.querySelector('#projects');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            ref={heroRef}
            className={`relative w-full ${prefersReduced ? '' : 'lg:h-[300vh]'}`}
        >
            {/* Pinned viewport: stays on screen while the tall section scrolls
                past, which is what turns scroll distance into animation time. */}
            <div className={`relative min-h-screen w-full overflow-hidden ${prefersReduced ? '' : 'lg:sticky lg:top-0 lg:h-screen'}`}>

            {/* ── Oversized name, sitting behind the avatar ── */}
            <div className="pointer-events-none absolute inset-x-0 top-[16%] z-0 flex flex-col items-center justify-center sm:top-[13%]">
                <h1 className="text-outline whitespace-nowrap text-[19vw] font-black uppercase leading-[0.82] tracking-tighter">
                    DIVYANSH
                </h1>
                <h1 className="text-outline-term whitespace-nowrap text-[19vw] font-black uppercase leading-[0.82] tracking-tighter">
                    KUMAWAT
                </h1>
            </div>

            {/* ── Avatar stage: absolute and dominant from lg up, where the
                   headline sits in its own column and never collides with it. ── */}
            {prefersReduced ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center lg:flex">
                    <Avatar className="h-[82vh]" />
                </div>
            ) : (
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden items-end justify-center lg:flex"
                    style={{ perspective: '1400px' }}
                >
                    {/* Final layer: full body, revealed last, then spun. */}
                    <motion.div
                        style={{
                            opacity: bodyOpacity,
                            scale: bodyScale,
                            rotateY: bodyRotate,
                            transformOrigin: 'top center',
                        }}
                        className="relative"
                    >
                        <img
                            src={fullBody}
                            alt=""
                            aria-hidden="true"
                            className="h-[86vh] w-auto object-contain drop-shadow-[0_18px_40px_rgba(255,95,31,0.25)]"
                        />
                    </motion.div>

                    {/* Intermediate framings, tightest first. */}
                    <MidStage progress={scrollYProgress} src={stageKnees} range={[0.38, 0.46, 0.52, 0.6]} />
                    <MidStage progress={scrollYProgress} src={stageNeck} range={[0.24, 0.32, 0.38, 0.46]} />
                    <MidStage progress={scrollYProgress} src={stageWaist} range={[0.08, 0.16, 0.24, 0.32]} />

                    {/* Face layer on top, handing over as the scroll starts. */}
                    <motion.div
                        style={{ opacity: faceOpacity, scale: faceScale }}
                        className="absolute inset-x-0 bottom-0 flex justify-center"
                    >
                        <Avatar className="h-[82vh]" />
                    </motion.div>
                </div>
            )}

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
                        <div className="brackets border border-rule bg-surface/70 p-4 backdrop-blur-md">
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
                                    className="border border-rule bg-surface/70 p-2 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-term hover:text-term hover:shadow-[3px_3px_0_0_#FF5F1F]"
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
            </div>
        </section>
    );
};

export default Hero;
