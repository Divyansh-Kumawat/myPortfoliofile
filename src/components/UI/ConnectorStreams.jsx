import { useState, useLayoutEffect, useCallback } from 'react';

// Fingertip positions as fractions of the photo itself (1091x976), read off
// the source image. Kept in image space so they stay correct no matter how the
// panel is sized.
const FINGERS = [
    { x: 0.138, y: 0.707 }, // thumb, low left
    { x: 0.335, y: 0.528 },
    { x: 0.513, y: 0.499 }, // middle, highest
    { x: 0.642, y: 0.553 },
    { x: 0.807, y: 0.717 }, // low right
];

const IMG_ASPECT = 1091 / 976;

// Which finger feeds which card — upper cards from the taller fingers, lower
// cards from the outer ones, so the fan reads naturally.
const FINGER_FOR_CARD = [2, 3, 1, 4, 0, 4];

const buildPath = (from, to) => {
    const dx = to.x - from.x;
    return `M${from.x.toFixed(1)} ${from.y.toFixed(1)} C${(from.x + dx * 0.45).toFixed(1)} ${from.y.toFixed(1)}, ${(from.x + dx * 0.62).toFixed(1)} ${to.y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
};

const ConnectorStreams = ({ hostRef, photoRef, cardRefs }) => {
    const [geo, setGeo] = useState(null);

    const measure = useCallback(() => {
        const host = hostRef.current;
        const photo = photoRef.current;
        if (!host || !photo) return;

        const hb = host.getBoundingClientRect();
        const pb = photo.getBoundingClientRect();
        if (!hb.width || !pb.width) return;

        // object-contain means the drawn image is inset within its box; solve
        // for that rect so fingertips land on the actual photo, not the panel.
        const boxAspect = pb.width / pb.height;
        const dw = boxAspect > IMG_ASPECT ? pb.height * IMG_ASPECT : pb.width;
        const dh = boxAspect > IMG_ASPECT ? pb.height : pb.width / IMG_ASPECT;
        const dx = pb.left + (pb.width - dw) / 2 - hb.left;
        const dy = pb.top + (pb.height - dh) / 2 - hb.top;

        const origins = FINGERS.map((f) => ({ x: dx + f.x * dw, y: dy + f.y * dh }));

        const paths = cardRefs.current.map((el, i) => {
            if (!el) return null;
            const b = el.getBoundingClientRect();
            const target = { x: b.left - hb.left, y: b.top + b.height / 2 - hb.top };
            return buildPath(origins[FINGER_FOR_CARD[i]], target);
        }).filter(Boolean);

        setGeo({ w: hb.width, h: hb.height, paths });
    }, [hostRef, photoRef, cardRefs]);

    useLayoutEffect(() => {
        // Only drawn from lg up, where the columns sit side by side.
        const mq = window.matchMedia('(min-width: 1024px)');
        const run = () => (mq.matches ? measure() : setGeo(null));

        run();
        const raf = requestAnimationFrame(run);
        const ro = new ResizeObserver(run);
        if (hostRef.current) ro.observe(hostRef.current);
        mq.addEventListener('change', run);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            mq.removeEventListener('change', run);
        };
    }, [measure, hostRef]);

    if (!geo || !geo.paths.length) return null;

    return (
        <svg
            className="pointer-events-none absolute inset-0 z-30 hidden h-full w-full lg:block"
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            width={geo.w}
            height={geo.h}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="wispGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FFD9A8" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#FF7A2F" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#FF5F1F" stopOpacity="0.35" />
                </linearGradient>

                {/* Static turbulence displaces the stroke into an irregular,
                    wispy edge — the smoke. Deliberately not animated: the
                    filter would re-rasterise every frame over the whole
                    region. Motion comes from the travelling pulses instead. */}
                <filter id="wispWide" x="-25%" y="-40%" width="150%" height="180%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.011 0.026" numOctaves="3" seed="7" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" result="d" />
                    <feGaussianBlur in="d" stdDeviation="5" />
                </filter>

                <filter id="wispMid" x="-20%" y="-30%" width="140%" height="160%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.018 0.04" numOctaves="2" seed="19" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G" result="d" />
                    <feGaussianBlur in="d" stdDeviation="1.8" />
                </filter>

                <filter id="coreGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* One filter application per layer rather than per path — filtering
                each path separately would multiply the cost by six. */}
            <g filter="url(#wispWide)" opacity="0.5" className="wisp-breathe">
                {geo.paths.map((d, i) => (
                    <path key={i} d={d} stroke="url(#wispGrad)" strokeWidth="11" fill="none" strokeLinecap="round" />
                ))}
            </g>

            <g filter="url(#wispMid)" opacity="0.75">
                {geo.paths.map((d, i) => (
                    <path key={i} d={d} stroke="url(#wispGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
                ))}
            </g>

            {geo.paths.map((d, i) => (
                <path key={`c${i}`} d={d} stroke="#FFE8D6" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round" />
            ))}

            {/* Light travelling finger -> card */}
            <g filter="url(#coreGlow)">
                {geo.paths.map((d, i) => (
                    <path
                        key={`p${i}`}
                        className="stream-pulse"
                        d={d}
                        pathLength="100"
                        stroke="#FFF6EC"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        fill="none"
                        style={{ animationDuration: `${3 + (i % 4) * 0.7}s`, animationDelay: `-${i * 0.55}s` }}
                    />
                ))}
            </g>

            {/* Emitter flare at each fingertip in use */}
            <g filter="url(#coreGlow)">
                {[...new Set(FINGER_FOR_CARD)].map((f, i) => {
                    const d = geo.paths[FINGER_FOR_CARD.indexOf(f)];
                    if (!d) return null;
                    const [, x, y] = d.match(/^M([\d.]+) ([\d.]+)/) || [];
                    return (
                        <circle
                            key={f}
                            cx={x}
                            cy={y}
                            r="2.6"
                            fill="#FFF3E4"
                            className="stream-node"
                            style={{ animationDelay: `-${i * 0.6}s` }}
                        />
                    );
                })}
            </g>
        </svg>
    );
};

export default ConnectorStreams;
