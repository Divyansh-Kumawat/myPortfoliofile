import { useEffect, useRef, useState } from 'react';
import { personalData } from '../../data/portfolioData';
import { streamChat } from '../../lib/aiClient';
import TermText from './TermText';

const FIRST = personalData.name.split(' ')[0].toLowerCase();

const SUGGESTIONS = [
    `what is ${FIRST} building at ask first?`,
    'show me the AI projects',
    `is ${FIRST} a fit for a backend role?`,
    'summarize the experience in 3 lines',
    `how do I contact ${FIRST}?`,
];

const INTRO = [
    { kind: 'sys', text: `connected to ${FIRST}-gpt (grounded on this portfolio)` },
    { kind: 'sys', text: 'ask anything about projects, experience or skills. type "help" for commands.' },
];

let nextId = 0;
const line = (kind, text, extra = {}) => ({ id: nextId++, kind, text, ...extra });

const AskTerminal = ({ onOpenJobFit }) => {
    const [lines, setLines] = useState(() => INTRO.map((l) => line(l.kind, l.text)));
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    // Only real exchanges go to the model; local commands stay local.
    const history = useRef([]);
    const sent = useRef([]);
    const recall = useRef(-1);
    const abortRef = useRef(null);
    const outputRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => () => abortRef.current?.abort(), []);

    // Scroll the terminal itself, never the page.
    useEffect(() => {
        const el = outputRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [lines]);

    const push = (...items) => setLines((prev) => [...prev, ...items]);

    const runLocal = (cmd) => {
        const c = cmd.toLowerCase().replace(/\s+/g, ' ');
        if (c === 'clear' || c === 'cls') {
            history.current = [];
            setLines([]);
            return true;
        }
        if (c === 'help') {
            push(line('sys', [
                'commands:',
                '- help: show this list',
                '- clear: wipe the screen and start a fresh conversation',
                '- whoami: what am I talking to?',
                '- jobfit: match a job description against this portfolio',
                '- anything else is sent to the AI',
            ].join('\n')));
            return true;
        }
        if (c === 'whoami') {
            push(line('ai', `you: a curious visitor.\nme: an LLM running on Groq behind a Vercel function, answering only from ${personalData.name}'s portfolio data. a small demo of the grounded AI work ${FIRST} builds.`));
            return true;
        }
        if (c === 'jobfit' || c === 'job-fit' || c === './jobfit.sh') {
            push(line('sys', 'opening jobfit.sh ...'));
            onOpenJobFit?.();
            return true;
        }
        if (c.startsWith('sudo hire')) {
            push(line('ai', `[sudo] password for recruiter: ********\naccess granted. great decision.\nnext step: ${personalData.email}`));
            return true;
        }
        if (c.startsWith('sudo')) {
            push(line('err', 'nice try. this incident will be reported.'));
            return true;
        }
        return false;
    };

    const ask = async (raw) => {
        const text = raw.trim();
        if (!text || busy) return;

        setInput('');
        sent.current = [text, ...sent.current].slice(0, 30);
        recall.current = -1;
        push(line('user', text));
        if (runLocal(text)) return;

        const replyId = nextId;
        push(line('ai', '', { streaming: true }));
        setBusy(true);

        const controller = new AbortController();
        abortRef.current = controller;
        const messages = [...history.current, { role: 'user', content: text }];
        let reply = '';

        try {
            await streamChat(messages, {
                signal: controller.signal,
                onToken: (chunk) => {
                    reply += chunk;
                    setLines((prev) => prev.map((l) => (l.id === replyId ? { ...l, text: reply } : l)));
                },
            });
            if (!reply.trim()) throw new Error('The AI returned an empty answer. Try rephrasing.');
            history.current = [...messages, { role: 'assistant', content: reply }].slice(-8);
            setLines((prev) => prev.map((l) => (l.id === replyId ? { ...l, streaming: false } : l)));
        } catch (err) {
            if (err.name === 'AbortError') return;
            setLines((prev) => [
                ...prev.filter((l) => l.id !== replyId || reply),
                line('err', `error: ${err.message}`),
            ].map((l) => (l.id === replyId ? { ...l, streaming: false } : l)));
        } finally {
            if (abortRef.current === controller) abortRef.current = null;
            setBusy(false);
            inputRef.current?.focus({ preventScroll: true });
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const list = sent.current;
            if (!list.length) return;
            e.preventDefault();
            const next = e.key === 'ArrowUp'
                ? Math.min(recall.current + 1, list.length - 1)
                : recall.current - 1;
            recall.current = Math.max(next, -1);
            setInput(recall.current === -1 ? '' : list[recall.current]);
        }
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            {/* Output */}
            <div
                ref={outputRef}
                onClick={() => {
                    if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
                }}
                className="font-pixel min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[15px] leading-snug sm:px-5"
                aria-live="polite"
            >
                {lines.map((l) => {
                    if (l.kind === 'user') {
                        return (
                            <div key={l.id} className="break-words text-ink">
                                <span className="text-term">visitor@portfolio:~$ </span>{l.text}
                            </div>
                        );
                    }
                    if (l.kind === 'sys') {
                        return <TermText key={l.id} text={l.text} className="text-ink-mute" />;
                    }
                    if (l.kind === 'err') {
                        return <div key={l.id} className="text-red-400">{l.text}</div>;
                    }
                    return (
                        <div key={l.id} className="border-l border-term/40 pl-3 text-ink-soft">
                            {l.text ? (
                                <TermText text={l.text} className={l.streaming ? 'cursor' : ''} />
                            ) : (
                                <span className="text-term">thinking<span className="animate-blink">...</span></span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Suggestions */}
            <div className="flex gap-2 overflow-x-auto border-t border-rule px-4 py-2.5 sm:px-5 [scrollbar-width:none]">
                {SUGGESTIONS.map((s) => (
                    <button
                        key={s}
                        type="button"
                        disabled={busy}
                        onClick={() => ask(s)}
                        className="font-pixel shrink-0 border border-rule bg-black/40 px-2.5 py-1 text-xs text-ink-soft transition-colors hover:border-term hover:text-term disabled:opacity-40"
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Prompt */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                }}
                className="flex items-center gap-2 border-t border-rule bg-black/40 px-4 py-3 sm:px-5"
            >
                <label htmlFor="ask-input" className="font-pixel shrink-0 text-term">&gt;</label>
                <input
                    id="ask-input"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    maxLength={500}
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={busy ? 'streaming answer...' : `ask about ${FIRST}...`}
                    disabled={busy}
                    className="font-pixel min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-mute focus:outline-none disabled:opacity-60"
                />
                <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    className="font-pixel shrink-0 border border-term px-3 py-1 text-xs uppercase tracking-widest text-term transition-colors hover:bg-term hover:text-black disabled:border-rule disabled:text-ink-mute disabled:hover:bg-transparent"
                >
                    run
                </button>
            </form>
        </div>
    );
};

export default AskTerminal;
