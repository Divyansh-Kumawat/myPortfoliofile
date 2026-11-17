import { useState } from 'react';
import AskTerminal from './AskTerminal';
import JobFitMatcher from './JobFitMatcher';

const TABS = [
    { id: 'ask', file: 'ask.sh', label: 'Ask my portfolio' },
    { id: 'fit', file: 'jobfit.sh', label: 'Job-fit matcher' },
];

const AiConsole = () => {
    const [tab, setTab] = useState('ask');

    return (
        <div className="flex h-[580px] flex-col border border-rule bg-surface/70 lg:h-auto lg:min-h-[620px] lg:flex-1">
            {/* Window chrome */}
            <div className="flex items-center justify-between gap-3 border-b border-rule bg-black/50 px-4 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-term" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <span className="font-pixel truncate text-xs text-ink-mute">visitor@portfolio: ~/ai</span>
                <span className="font-pixel flex shrink-0 items-center gap-1.5 text-xs text-ink-mute">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-term/60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-term" />
                    </span>
                    groq
                </span>
            </div>

            {/* Tabs */}
            <div role="tablist" aria-label="AI tools" className="flex border-b border-rule">
                {TABS.map((t) => {
                    const active = tab === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            id={`ai-tab-${t.id}`}
                            aria-selected={active}
                            aria-controls={`ai-panel-${t.id}`}
                            onClick={() => setTab(t.id)}
                            className={`font-pixel flex-1 border-r border-rule px-3 py-2.5 text-left text-xs uppercase tracking-widest transition-colors last:border-r-0 ${
                                active ? 'bg-term-tint text-term' : 'text-ink-mute hover:text-ink'
                            }`}
                        >
                            <span className={active ? 'text-term' : 'text-ink-mute'}>./</span>{t.file}
                            <span className="ml-2 hidden normal-case tracking-normal text-ink-mute sm:inline">{t.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Both panels stay mounted so switching tabs keeps the conversation. */}
            {TABS.map((t) => (
                <div
                    key={t.id}
                    role="tabpanel"
                    id={`ai-panel-${t.id}`}
                    aria-labelledby={`ai-tab-${t.id}`}
                    className={`min-h-0 flex-1 flex-col ${tab === t.id ? 'flex' : 'hidden'}`}
                >
                    {t.id === 'ask' ? <AskTerminal onOpenJobFit={() => setTab('fit')} /> : <JobFitMatcher />}
                </div>
            ))}
        </div>
    );
};

export default AiConsole;
