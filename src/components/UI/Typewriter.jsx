import { useState, useEffect } from 'react';

// Types through `lines` once, character by character, leaving a blinking
// terminal cursor on the final line.
const Typewriter = ({ lines, speed = 28, startDelay = 350, className = '' }) => {
    const [done, setDone] = useState([]);
    const [current, setCurrent] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), startDelay);
        return () => clearTimeout(t);
    }, [startDelay]);

    useEffect(() => {
        if (!started || lineIndex >= lines.length) return;

        const target = lines[lineIndex];
        if (current.length < target.length) {
            const t = setTimeout(() => setCurrent(target.slice(0, current.length + 1)), speed);
            return () => clearTimeout(t);
        }

        // Line finished — commit it and move to the next after a short beat.
        const t = setTimeout(() => {
            setDone((d) => [...d, target]);
            setCurrent('');
            setLineIndex((i) => i + 1);
        }, 260);
        return () => clearTimeout(t);
    }, [started, current, lineIndex, lines, speed]);

    return (
        <div className={`font-pixel leading-relaxed ${className}`}>
            {done.map((line, i) => (
                <div key={i}>
                    <span className="text-term">$ </span>
                    <span>{line}</span>
                </div>
            ))}
            {lineIndex < lines.length && (
                <div>
                    <span className="text-term">$ </span>
                    <span>{current}</span>
                    <span className="animate-blink text-term">█</span>
                </div>
            )}
        </div>
    );
};

export default Typewriter;
