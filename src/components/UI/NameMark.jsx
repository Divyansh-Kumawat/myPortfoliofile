// Wordmark built from four stacked copies of the same string:
//   · two chromatic-split layers that burst on a glitch cycle
//   · the readable base layer
//   · a gradient band clipped to the glyphs, sweeping left↔right
// Only the base layer is exposed to assistive tech; the rest are decorative.
const NameMark = ({ name, className = '' }) => (
    <span className={`name-mark ${className}`}>
        <span className="name-mark__layer name-mark__glitch-a" aria-hidden="true">{name}</span>
        <span className="name-mark__layer name-mark__glitch-b" aria-hidden="true">{name}</span>
        <span className="name-mark__base">{name}</span>
        <span className="name-mark__layer name-mark__sweep" aria-hidden="true">{name}</span>
    </span>
);

export default NameMark;
