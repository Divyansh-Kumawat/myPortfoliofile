// Renders model output as terminal text: strips stray markdown, turns "- "
// lines into ▸ bullets and makes URLs and emails clickable.

const LINK_RE = /(https?:\/\/[^\s<>()]+|[\w.+-]+@[\w-]+\.[a-z]{2,}(?:\.[a-z]{2,})?)/gi;
const TRAILING = /[.,;:!?'"]+$/;

const cleanMarkdown = (line) =>
    line
        .replace(/^#{1,6}\s+/, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/__(.+?)__/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        // [label](url) -> "label url" so the URL still gets linkified
        .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '$1 $2');

function linkify(text, keyPrefix) {
    const parts = text.split(LINK_RE);
    return parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const trail = part.match(TRAILING)?.[0] || '';
        const target = trail ? part.slice(0, -trail.length) : part;
        const isEmail = !target.startsWith('http');
        return (
            <span key={`${keyPrefix}-${i}`}>
                <a
                    href={isEmail ? `mailto:${target}` : target}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    className="break-all text-term underline decoration-term/40 underline-offset-2 hover:decoration-term"
                >
                    {target}
                </a>
                {trail}
            </span>
        );
    });
}

const TermText = ({ text, className = '' }) => {
    const lines = text.split('\n');
    return (
        <div className={className}>
            {lines.map((raw, i) => {
                const line = cleanMarkdown(raw);
                const bullet = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
                if (bullet) {
                    return (
                        <div key={i} className="flex gap-2">
                            <span className="text-term" aria-hidden="true">▸</span>
                            <span>{linkify(bullet[1], i)}</span>
                        </div>
                    );
                }
                if (!line.trim()) return <div key={i} className="h-2" />;
                return <div key={i}>{linkify(line, i)}</div>;
            })}
        </div>
    );
};

export default TermText;
