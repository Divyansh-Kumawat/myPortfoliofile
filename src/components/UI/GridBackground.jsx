import { useEffect, useRef } from 'react';

// Deterministic hex columns so the field doesn't reshuffle on re-render.
const HEX = '0123456789ABCDEF';
const COLUMNS = Array.from({ length: 14 }, (_, i) => ({
    left: 4 + i * 7.2,
    delay: (i * 0.87) % 8,
    duration: 6 + ((i * 1.3) % 5),
    text: Array.from({ length: 9 }, (_, j) => HEX[(i * 7 + j * 5) % 16]).join(''),
}));

const GridBackground = () => {
    const glowRef = useRef(null);

    // Written straight to the node — routing this through state would
    // re-render the whole tree on every mouse move.
    useEffect(() => {
        const node = glowRef.current;
        if (!node || window.matchMedia('(pointer: coarse)').matches) return;

        let frame = 0;
        const onMove = (e) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                node.style.transform = `translate3d(${e.clientX - 260}px, ${e.clientY - 260}px, 0)`;
                frame = 0;
            });
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-paper" aria-hidden="true">
            {/* Drifting technical grid */}
            <div className="absolute inset-x-0 -top-14 h-[calc(100%+56px)] animate-grid-drift will-change-transform">
                <div className="grid-overlay h-full w-full" />
            </div>

            {/* Warm paper wash in the corners */}
            <div className="absolute -left-[15%] top-[-10%] h-[60vw] w-[60vw] rounded-full bg-term/[0.07] blur-[120px]" />
            <div className="absolute -right-[15%] bottom-[-15%] h-[55vw] w-[55vw] rounded-full bg-term/[0.05] blur-[130px]" />

            {/* Falling hex columns */}
            <div className="absolute inset-0">
                {COLUMNS.map((c, i) => (
                    <span
                        key={i}
                        className="font-pixel absolute top-0 animate-data-fall text-[10px] leading-[1.35] tracking-widest text-term/30"
                        style={{
                            left: `${c.left}%`,
                            animationDelay: `${c.delay}s`,
                            animationDuration: `${c.duration}s`,
                            writingMode: 'vertical-rl',
                        }}
                    >
                        {c.text}
                    </span>
                ))}
            </div>

            {/* Horizontal scan beam */}
            <div className="absolute inset-x-0 top-0 h-24 animate-scan-beam bg-gradient-to-b from-transparent via-term/[0.10] to-transparent" />

            {/* Cursor glow */}
            <div
                ref={glowRef}
                className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full opacity-70 blur-[80px]"
                style={{ background: 'radial-gradient(circle, rgba(255,95,31,0.13), transparent 65%)' }}
            />

            {/* CRT scanlines over everything */}
            <div className="scanlines absolute inset-0" />
        </div>
    );
};

export default GridBackground;
