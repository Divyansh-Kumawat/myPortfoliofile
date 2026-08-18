import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Zap, Layout, Brain, LineChart } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import SectionHeader from '../UI/SectionHeader';
import PhotoReveal from '../UI/PhotoReveal';
import CardGlyph from '../UI/CardGlyph';
import ConnectorStreams from '../UI/ConnectorStreams';
// Imported (not string paths) so Vite fingerprints them into the production
// build. Both are 1091x976 and identically framed, which is what lets the
// cursor lens swap one for the other without the subject shifting.
import myPhoto from '../../assets/my photo.png';
import myPhotoNoGlasses from '../../assets/my photo 2.png';

const attributes = [
    { icon: Layout, glyph: 'frontend', title: 'Frontend', desc: 'Crafting beautiful UI/UX with React & Tailwind.', activity: 82 },
    { icon: Server, glyph: 'backend', title: 'Backend', desc: 'Building scalable APIs with Node.js & Express.', activity: 76 },
    { icon: Zap, glyph: 'cloud', title: 'Cloud', desc: 'Deploying and scaling with AWS.', activity: 64 },
    { icon: Code, glyph: 'optimization', title: 'Optimization', desc: 'Improving performance and SEO.', activity: 70 },
    { icon: Brain, glyph: 'ml', title: 'ML', desc: 'Working on AI/ML projects.', activity: 68 },
    { icon: LineChart, glyph: 'datascience', title: 'Data Science', desc: 'Working on Data Science projects.', activity: 58 },
];

const About = () => {
    const hostRef = useRef(null);
    const photoRef = useRef(null);
    const cardRefs = useRef([]);

    return (
        <section id="about" className="relative border-t border-white/5 py-24 px-5 sm:px-6 md:px-10 lg:px-14">
            <SectionHeader
                index="01"
                label="about"
                title="WHO'S"
                pixelWord="BEHIND IT"
                lede="A Computer Science student with a strong interest in full-stack web development, cloud technologies, and problem-solving."
            />

            <div ref={hostRef} className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

                {/* Measures the photo and every card, then draws finger -> card
                    wisps over the top. Renders nothing below lg. */}
                <ConnectorStreams hostRef={hostRef} photoRef={photoRef} cardRefs={cardRefs} />

                {/* Portrait, framed as a terminal window */}
                <div className="relative z-0 flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-surface/70">
                    <div className="flex items-center gap-1.5 border-b border-rule bg-white/[0.04] px-4 py-2.5">
                        <span className="h-2 w-2 rounded-full bg-term" />
                        <span className="h-2 w-2 rounded-full bg-ink/15" />
                        <span className="h-2 w-2 rounded-full bg-ink/15" />
                        <span className="font-pixel ml-2 text-[10px] uppercase tracking-widest text-ink-mute">
                            open divyansh.png
                        </span>
                        <span className="font-pixel ml-auto text-[10px] uppercase tracking-widest text-term/70">
                            hover to unmask
                        </span>
                    </div>

                    {/* flex-1 lets the photo absorb the column height the capability
                        grid sets. object-contain avoids cropping the composition —
                        the letterboxing is invisible against the black backdrop. */}
                    <div className="relative flex min-h-[380px] flex-1 overflow-hidden border-b border-rule bg-black">
                        <PhotoReveal
                            ref={photoRef}
                            base={myPhoto}
                            reveal={myPhotoNoGlasses}
                            alt={personalData.name}
                            className="flex-1"
                        />
                        <div className="scanlines pointer-events-none absolute inset-0" />
                    </div>

                    <div className="px-5 py-4">
                        <p className="text-xs leading-relaxed text-ink-soft">{personalData.shortBio}</p>
                    </div>
                </div>

                {/* Capability grid — items-start so the staggered offsets below
                    actually shift cards instead of stretching the row. */}
                <div className="relative z-10 grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
                    {attributes.map(({ icon: Icon, glyph, title, desc, activity }, index) => (
                        <motion.div
                            key={title}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            // Right column rides lower, echoing the reference's stagger.
                            className={index % 2 === 1 ? 'lg:mt-10' : ''}
                        >
                            {/* Float lives on its own element: framer owns the entrance
                                transform and the card owns the hover transform, so
                                three separate transforms never fight. */}
                            <div
                                className="card-float"
                                style={{
                                    animationDuration: `${6.5 + (index % 3) * 1.1}s`,
                                    animationDelay: `-${index * 0.9}s`,
                                }}
                            >
                                <div className="group relative flex flex-col overflow-hidden rounded-xl border border-rule bg-surface/80 p-5 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-term/60 hover:shadow-[0_20px_45px_-22px_rgba(255,95,31,0.6)]">
                                    <div className="flex items-start justify-between gap-3">
                                        {/* Hexagonal icon plate */}
                                        <span className="hex-frame grid h-11 w-11 shrink-0 place-items-center bg-term/70 transition-colors duration-500 group-hover:bg-term">
                                            <span className="hex-inner grid h-[calc(100%-2px)] w-[calc(100%-2px)] place-items-center bg-[#140803] text-term transition-colors duration-500 group-hover:text-term-deep">
                                                <Icon size={17} strokeWidth={1.75} />
                                            </span>
                                        </span>
                                        <span className="font-pixel text-[10px] text-ink-mute">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-end justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
                                            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{desc}</p>
                                        </div>
                                        <CardGlyph
                                            name={glyph}
                                            className="h-12 w-16 shrink-0 text-term/40 transition-colors duration-500 group-hover:text-term/80"
                                        />
                                    </div>

                                    {/* Telemetry strip */}
                                    <div className="mt-4 border-t border-rule pt-3">
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="font-pixel text-[9px] uppercase tracking-widest text-ink-mute">
                                                deployment
                                            </span>
                                            <span className="font-pixel text-[9px] uppercase tracking-widest text-ink-mute">
                                                project activity
                                            </span>
                                        </div>
                                        <div className="h-[3px] w-full overflow-hidden bg-white/10">
                                            <motion.div
                                                className="h-full bg-term/70 transition-colors duration-500 group-hover:bg-term"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${activity}%` }}
                                                transition={{ duration: 1, delay: 0.2 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
