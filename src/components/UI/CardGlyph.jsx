// Schematic thumbnails that sit on the right of each capability card, echoing
// the diagram motif in the reference. Stroke-only and currentColor, so they
// inherit the card's accent and stay weightless next to the copy.
const common = {
    viewBox: '0 0 72 52',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

const glyphs = {
    // Browser wireframe
    frontend: (
        <>
            <rect x="2" y="4" width="40" height="44" rx="2" />
            <path d="M2 12h40" />
            <rect x="6" y="16" width="14" height="10" rx="1" />
            <rect x="24" y="16" width="14" height="10" rx="1" />
            <path d="M6 32h32M6 38h22M6 44h28" />
            <rect x="48" y="10" width="22" height="14" rx="1" />
            <rect x="48" y="30" width="22" height="14" rx="1" />
        </>
    ),
    // Service box wired to endpoints
    backend: (
        <>
            <rect x="24" y="18" width="24" height="16" rx="2" />
            <path d="M8 10h10M8 26h16M8 42h10" />
            <circle cx="6" cy="10" r="2" />
            <circle cx="6" cy="26" r="2" />
            <circle cx="6" cy="42" r="2" />
            <path d="M48 26h12" />
            <circle cx="64" cy="26" r="4" />
            <path d="M18 10c6 0 6 12 6 12M18 42c6 0 6-12 6-12" />
        </>
    ),
    // Stacked server tiers
    cloud: (
        <>
            <rect x="14" y="6" width="44" height="10" rx="2" />
            <rect x="14" y="21" width="44" height="10" rx="2" />
            <rect x="14" y="36" width="44" height="10" rx="2" />
            <circle cx="21" cy="11" r="1.6" />
            <circle cx="21" cy="26" r="1.6" />
            <circle cx="21" cy="41" r="1.6" />
            <path d="M46 11h6M46 26h6M46 41h6" />
        </>
    ),
    // Trend line over bars
    optimization: (
        <>
            <path d="M4 46h64" />
            <path d="M8 40v-8M18 40V26M28 40v-18M38 40V30M48 40V20M58 40V12" strokeWidth="3" opacity="0.35" />
            <path d="M8 34l10-10 10 6 10-10 10-6 10-4" />
            <circle cx="58" cy="10" r="2.5" />
        </>
    ),
    // Small feed-forward network
    ml: (
        <>
            <circle cx="10" cy="14" r="3.4" />
            <circle cx="10" cy="38" r="3.4" />
            <circle cx="36" cy="8" r="3.4" />
            <circle cx="36" cy="26" r="3.4" />
            <circle cx="36" cy="44" r="3.4" />
            <circle cx="62" cy="26" r="3.4" />
            <path d="M13 14l20-5M13 14l20 11M13 38l20 5M13 38l20-11M39 8l20 16M39 26h20M39 44l20-16" opacity="0.65" />
        </>
    ),
    // Point cloud in a frame
    datascience: (
        <>
            <path d="M6 6v40h60" />
            <circle cx="18" cy="34" r="2" />
            <circle cx="26" cy="24" r="2" />
            <circle cx="34" cy="30" r="2" />
            <circle cx="42" cy="16" r="2" />
            <circle cx="50" cy="22" r="2" />
            <circle cx="58" cy="12" r="2" />
            <path d="M14 38L60 10" opacity="0.5" strokeDasharray="3 3" />
        </>
    ),
};

const CardGlyph = ({ name, className = '' }) => (
    <svg {...common} className={className} aria-hidden="true">
        {glyphs[name] ?? null}
    </svg>
);

export default CardGlyph;
