import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { personalData, projects } from '../../data/portfolioData';
import { analyzeJobFit } from '../../lib/aiClient';

const FIRST = personalData.name.split(' ')[0];
const MAX_CHARS = 8000;

const SAMPLE_JD = `AI Engineer (Full-Stack)

We're hiring an engineer to build LLM-powered features end to end.

Responsibilities:
- Design and ship agentic workflows with tool calling and retrieval (RAG)
- Build React/Next.js frontends and Node.js APIs around AI features
- Own prompt design, evaluation and reliability in production
- Deploy and operate services on AWS

Requirements:
- Strong JavaScript/TypeScript and Python
- Experience with LangChain/LangGraph or similar agent frameworks
- Familiarity with vector databases and embeddings
- Docker, CI/CD, and cloud deployment experience`;

const STEPS = [
    'parsing job description',
    `loading ${FIRST.toLowerCase()}'s profile (${projects.length} projects)`,
    'matching requirements to evidence',
    'checking for gaps',
    'computing fit score',
];

const verdictTone = {
    'Strong fit': 'border-term bg-term text-black',
    'Good fit': 'border-term text-term',
    'Partial fit': 'border-term-glow/60 text-term-glow',
    'Weak fit': 'border-rule text-ink-soft',
};

const Heading = ({ children }) => (
    <h5 className="font-pixel prompt mb-2.5 text-xs uppercase tracking-widest text-term">{children}</h5>
);

const fade = (i) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] },
});

const ScoreMeter = ({ score }) => {
    const cells = 20;
    const filled = Math.round((score / 100) * cells);
    return (
        <div className="flex gap-[3px]" aria-hidden="true">
            {Array.from({ length: cells }, (_, i) => (
                <motion.span
                    key={i}
                    className={`h-3 flex-1 ${i < filled ? 'bg-term' : 'bg-white/[0.06]'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.03 }}
                />
            ))}
        </div>
    );
};

const Result = ({ result, onReset }) => {
    const [copied, setCopied] = useState(false);

    const copyPitch = async () => {
        try {
            await navigator.clipboard.writeText(result.pitch);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* clipboard blocked; the text is still selectable */ }
    };

    return (
        <div className="space-y-6">
            {/* Score */}
            <motion.div {...fade(0)} className="border border-rule bg-black/40 p-4">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className="font-pixel text-xs uppercase tracking-widest text-ink-mute">fit for</div>
                        <div className="text-lg font-bold text-ink">{result.role}</div>
                    </div>
                    <span className={`font-pixel border px-2.5 py-1 text-xs uppercase tracking-widest ${verdictTone[result.verdict]}`}>
                        {result.verdict}
                    </span>
                </div>
                <div className="mb-3 flex items-baseline gap-1.5">
                    <span className="font-pixel text-5xl leading-none text-term">{result.score}</span>
                    <span className="font-pixel text-sm text-ink-mute">/100</span>
                </div>
                <ScoreMeter score={result.score} />
                {result.summary && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{result.summary}</p>}
            </motion.div>

            {result.matches.length > 0 && (
                <motion.div {...fade(1)}>
                    <Heading>matches</Heading>
                    <ul className="space-y-2.5">
                        {result.matches.map((m) => (
                            <li key={m.requirement} className="flex gap-2.5 text-sm">
                                <span className="font-pixel mt-px text-term" aria-hidden="true">✓</span>
                                <span>
                                    <span className="text-ink">{m.requirement}</span>
                                    <span className="block text-ink-soft">{m.evidence}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {result.projects.length > 0 && (
                <motion.div {...fade(2)}>
                    <Heading>relevant projects</Heading>
                    <div className="grid gap-2">
                        {result.projects.map((p) => {
                            const known = projects.find((x) => x.title.toLowerCase() === p.name.toLowerCase());
                            const href = known?.live || known?.github;
                            return (
                                <div key={p.name} className="border border-rule bg-black/30 p-3 text-sm">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="font-semibold text-ink">{p.name}</span>
                                        {href && (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-pixel shrink-0 text-xs text-term hover:underline"
                                            >
                                                open ↗
                                            </a>
                                        )}
                                    </div>
                                    <p className="mt-1 text-ink-soft">{p.why}</p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {result.gaps.length > 0 && (
                <motion.div {...fade(3)}>
                    <Heading>gaps</Heading>
                    <ul className="space-y-1.5">
                        {result.gaps.map((g) => (
                            <li key={g} className="flex gap-2.5 text-sm text-ink-soft">
                                <span className="font-pixel text-term-glow" aria-hidden="true">△</span>
                                {g}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {result.pitch && (
                <motion.div {...fade(4)}>
                    <Heading>pitch</Heading>
                    <blockquote className="border-l-2 border-term bg-term-tint/60 px-4 py-3 text-sm italic leading-relaxed text-ink">
                        {result.pitch}
                    </blockquote>
                </motion.div>
            )}

            <motion.div {...fade(5)} className="flex flex-wrap gap-2.5 pb-1">
                <a
                    href="#contact"
                    className="font-pixel border border-term bg-term px-3.5 py-2 text-xs uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-term"
                >
                    contact {FIRST.toLowerCase()} →
                </a>
                {result.pitch && (
                    <button
                        type="button"
                        onClick={copyPitch}
                        className="font-pixel border border-rule px-3.5 py-2 text-xs uppercase tracking-widest text-ink-soft transition-colors hover:border-term hover:text-term"
                    >
                        {copied ? 'copied ✓' : 'copy pitch'}
                    </button>
                )}
                <button
                    type="button"
                    onClick={onReset}
                    className="font-pixel border border-rule px-3.5 py-2 text-xs uppercase tracking-widest text-ink-soft transition-colors hover:border-term hover:text-term"
                >
                    analyze another
                </button>
            </motion.div>
        </div>
    );
};

const Loading = () => {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 900);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="font-pixel space-y-1.5 text-[15px]">
            {STEPS.slice(0, step + 1).map((s, i) => (
                <div key={s} className={i < step ? 'text-ink-mute' : 'text-ink'}>
                    <span className="text-term">&gt; </span>{s}
                    {i < step ? <span className="text-term"> ... ok</span> : <span className="cursor" />}
                </div>
            ))}
        </div>
    );
};

const JobFitMatcher = () => {
    const [jd, setJd] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | done
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const abortRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => () => abortRef.current?.abort(), []);

    const run = async () => {
        if (status === 'loading') return;
        setError('');
        setStatus('loading');
        const controller = new AbortController();
        abortRef.current = controller;
        try {
            const data = await analyzeJobFit(jd.trim(), { signal: controller.signal });
            setResult(data);
            setStatus('done');
            scrollRef.current?.scrollTo({ top: 0 });
        } catch (err) {
            if (err.name === 'AbortError') return;
            setError(err.message);
            setStatus('idle');
        }
    };

    const reset = () => {
        setResult(null);
        setStatus('idle');
        setJd('');
    };

    return (
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            <AnimatePresence mode="wait">
                {status === 'done' && result ? (
                    <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Result result={result} onReset={reset} />
                    </motion.div>
                ) : status === 'loading' ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loading />
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            run();
                        }}
                        className="flex min-h-full flex-col"
                    >
                        <p className="font-pixel mb-3 text-[15px] leading-snug text-ink-mute">
                            hiring? paste a job description and get an honest breakdown of how {FIRST.toLowerCase()} fits: matching skills, relevant projects, gaps and a ready-to-send pitch.
                        </p>
                        <label htmlFor="jd-input" className="sr-only">Job description</label>
                        <textarea
                            id="jd-input"
                            value={jd}
                            onChange={(e) => setJd(e.target.value.slice(0, MAX_CHARS))}
                            placeholder="paste the job description here..."
                            className="min-h-[220px] w-full flex-1 resize-none border border-rule bg-black/40 p-3 text-sm leading-relaxed text-ink placeholder:font-pixel placeholder:text-ink-mute focus:border-term focus:outline-none"
                        />
                        <div className="mt-2 flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setJd(SAMPLE_JD)}
                                className="font-pixel text-xs text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-term hover:decoration-term"
                            >
                                try a sample JD
                            </button>
                            <span className="font-pixel text-xs text-ink-mute">
                                {jd.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                            </span>
                        </div>
                        {error && <p className="font-pixel mt-3 text-sm text-red-400">error: {error}</p>}
                        <button
                            type="submit"
                            disabled={jd.trim().length < 60}
                            className="font-pixel mt-4 w-full border border-term bg-term px-4 py-2.5 text-sm uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-term disabled:cursor-not-allowed disabled:border-rule disabled:bg-transparent disabled:text-ink-mute"
                        >
                            {jd.trim().length < 60 ? 'paste a job description' : 'run ./jobfit.sh'}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobFitMatcher;
