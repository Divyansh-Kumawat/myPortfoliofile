import { motion } from 'framer-motion';

// Shared section masthead in terminal dress: a `> path` prompt, an oversized
// title with the accent word in the pixel face, and a loading-bar rule.
const SectionHeader = ({ index, label, title, pixelWord, lede }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="mb-12 md:mb-16"
    >
        <div className="flex items-center gap-3">
            <span className="font-pixel border border-term bg-term-tint px-2 py-0.5 text-xs text-term-deep">
                {index}
            </span>
            <span className="section-label prompt text-sm">{label}</span>
        </div>

        <h2
            className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-[3.4rem]"
            style={{ lineHeight: 0.9 }}
        >
            {title}{' '}
            {pixelWord && (
                <span className="font-pixel inline-block align-baseline text-[1.15em] font-normal leading-none text-term">
                    {pixelWord}
                </span>
            )}
        </h2>

        {lede && <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft">{lede}</p>}

        <div className="mt-8 h-0.5 w-full origin-left bg-rule">
            <motion.div
                className="h-full w-1/3 bg-term"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
            />
        </div>
    </motion.div>
);

export default SectionHeader;
