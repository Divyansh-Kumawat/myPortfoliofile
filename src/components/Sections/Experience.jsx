import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { experiences, certifications } from '../../data/portfolioData';
import SectionHeader from '../UI/SectionHeader';

const Experience = () => (
    <section id="experience" className="relative bg-bone/85 py-24 px-5 backdrop-blur-sm sm:px-6 md:px-10 lg:px-14">
        <SectionHeader
            index="04"
            label="journey"
            title="PATH &"
            pixelWord="CREDENTIALS"
            lede="Where I have worked, what I have studied, and the certifications backing it up."
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">

            {/* Timeline */}
            <div className="lg:col-span-2">
                <h3 className="mb-8 flex items-center gap-3 text-xl font-bold uppercase tracking-wide">
                    <Briefcase size={18} strokeWidth={2} className="text-term" /> Experience &amp; Education
                </h3>

                <div className="relative ml-1 space-y-6 border-l-2 border-rule pl-0 md:ml-2">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="relative pl-7 md:pl-10"
                        >
                            {/* Node */}
                            <span
                                className={`absolute -left-[7px] top-6 h-3 w-3 border-2 border-term ${exp.type === 'education' ? 'bg-paper' : 'bg-term'
                                    }`}
                            />

                            <div className="brackets panel panel-glow group relative overflow-hidden p-6 md:p-7">
                                <div className="absolute right-5 top-5 text-ink/[0.06] transition-colors duration-300 group-hover:text-term/20">
                                    {exp.type === 'education'
                                        ? <GraduationCap size={44} strokeWidth={1.25} />
                                        : <Briefcase size={44} strokeWidth={1.25} />}
                                </div>

                                <span className="font-pixel mb-2 block text-sm text-term">{exp.period}</span>
                                <h4 className="mb-1 text-lg font-bold uppercase tracking-tight md:text-xl">{exp.title}</h4>
                                <h5 className="mb-3 text-sm text-ink-soft">{exp.company}</h5>

                                {exp.description && (
                                    <p className="max-w-xl text-sm leading-relaxed text-ink-soft">{exp.description}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div>
                <h3 className="mb-8 flex items-center gap-3 text-xl font-bold uppercase tracking-wide">
                    <Award size={18} strokeWidth={2} className="text-term" /> Certifications
                </h3>

                <div className="grid grid-cols-1 gap-3">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="panel panel-glow flex items-start gap-3 p-5"
                        >
                            <span className="font-pixel mt-0.5 shrink-0 border border-term bg-term-tint px-1.5 text-xs text-term-deep">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <p className="text-sm leading-relaxed text-ink-soft">{cert}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Experience;
