// Infinite scrolling ticker. The item list is rendered twice so the -50%
// translate in the `marquee` keyframe loops seamlessly.
const Marquee = ({ items, className = '' }) => (
    <div className={`relative flex overflow-hidden border-y-2 border-ink bg-term py-3 ${className}`}>
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="flex shrink-0 items-center gap-8">
                    <span className="font-pixel whitespace-nowrap text-lg uppercase tracking-widest text-white">
                        {item}
                    </span>
                    <span className="font-pixel text-white/60">{'//'}</span>
                </span>
            ))}
        </div>
    </div>
);

export default Marquee;
