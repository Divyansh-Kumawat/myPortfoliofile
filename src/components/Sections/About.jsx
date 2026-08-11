import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Server, Zap, Layout, Brain, LineChart } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import SectionHeader from '../UI/SectionHeader';
// Imported (not string paths) so Vite fingerprints them into the production build.
import one from '../../assets/one.webp';
import two from '../../assets/two.webp';
import three from '../../assets/three.webp';
import four from '../../assets/four.webp';

const aboutImages = [one, two, three, four];

const attributes = [
    { icon: Layout, title: 'Frontend', desc: 'Crafting beautiful UI/UX with React & Tailwind.' },
    { icon: Server, title: 'Backend', desc: 'Building scalable APIs with Node.js & Express.' },
    { icon: Zap, title: 'Cloud', desc: 'Deploying and scaling with AWS.' },
    { icon: Code, title: 'Optimization', desc: 'Improving performance and SEO.' },
    { icon: Brain, title: 'Machine Learning', desc: 'Working on AI/ML projects.' },
    { icon: LineChart, title: 'Data Science', desc: 'Working on Data Science projects.' },
];

const About = () => {
    const [currentImg, setCurrentImg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % aboutImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className="relative bg-paper/85 py-24 px-5 backdrop-blur-sm sm:px-6 md:px-10 lg:px-14">
            <SectionHeader
                index="01"
                label="about"
                title="WHO'S"
                pixelWord="BEHIND IT"
                lede="A Computer Science student with a strong interest in full-stack web development, cloud technologies, and problem-solving."
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

                {/* Bio, framed as a terminal window */}
                <div className="border border-rule bg-surface">
                    <div className="flex items-center gap-1.5 border-b border-rule bg-bone px-4 py-2.5">
                        <span className="h-2 w-2 rounded-full bg-term" />
                        <span className="h-2 w-2 rounded-full bg-ink/15" />
                        <span className="h-2 w-2 rounded-full bg-ink/15" />
                        <span className="font-pixel ml-2 text-[10px] uppercase tracking-widest text-ink-mute">
                            cat about.md
                        </span>
                    </div>

                    <div className="relative h-44 overflow-hidden border-b border-rule">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImg}
                                src={aboutImages[currentImg]}
                                initial={{ opacity: 0, scale: 1.06 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                className="h-full w-full object-cover"
                                alt=""
                                aria-hidden="true"
                            />
                        </AnimatePresence>
                        <div className="pointer-events-none absolute inset-0 bg-term/20 mix-blend-multiply" />
                        <div className="scanlines pointer-events-none absolute inset-0" />
                    </div>

                    <div className="space-y-4 p-7 text-sm leading-relaxed text-ink-soft">
                        <p>{personalData.bio}</p>
                        <p>
                            I enjoy building user-friendly applications, optimizing performance, and continuously
                            learning new technologies.
                        </p>
                        <p>
                            My goal is to work as a software developer where I can contribute to impactful projects
                            and continuously grow my technical skills.
                        </p>
                    </div>
                </div>

                {/* Capability grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {attributes.map(({ icon: Icon, title, desc }, index) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="brackets panel panel-glow group p-6"
                        >
                            <div className="flex items-start justify-between">
                                <span className="grid h-10 w-10 place-items-center border border-rule bg-term-tint text-term transition-colors duration-300 group-hover:bg-term group-hover:text-white">
                                    <Icon size={18} strokeWidth={1.75} />
                                </span>
                                <span className="font-pixel text-xs text-ink-mute">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="mt-5 text-base font-bold uppercase tracking-wide">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
