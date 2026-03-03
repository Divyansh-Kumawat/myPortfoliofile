import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { experiences, certifications } from '../../data/portfolioData';

const Experience = () => {
    return (
        <section id="experience" className="py-24 relative overflow-hidden bg-dark-bg">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 inline-block relative text-glow"
                    >
                        Journey & Credentials
                        <span className="absolute -bottom-2 right-1/4 w-1/2 h-1 bg-primary rounded-full shadow-[0_0_10px_#66FCF1]"></span>
                    </motion.h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Timeline Section */}
                    <div className="w-full lg:w-2/3">
                        <h3 className="text-2xl font-bold mb-10 text-light-heading flex items-center gap-3">
                            <Briefcase className="text-primary" /> Experience & Education
                        </h3>

                        <div className="relative border-l-2 border-dark-surface ml-4 md:ml-6 space-y-12">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    className="relative pl-8 md:pl-12"
                                >
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-dark-bg ${exp.type === 'education' ? 'bg-[#45A29E]' : 'bg-primary'} shadow-[0_0_10px_rgba(102,252,241,0.8)]`} />

                                    <div className="glass-card p-6 md:p-8 hover:-translate-y-1 transition-transform relative group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            {exp.type === 'education' ? <GraduationCap size={48} /> : <Briefcase size={48} />}
                                        </div>

                                        <span className="text-primary text-sm font-mono font-semibold block mb-2">{exp.period}</span>
                                        <h4 className="text-xl md:text-2xl font-bold text-light-heading mb-1">{exp.title}</h4>
                                        <h5 className="text-light-text/80 text-lg mb-4">{exp.company}</h5>

                                        {exp.description && (
                                            <p className="text-light-text/70 leading-relaxed text-sm">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Section */}
                    <div className="w-full lg:w-1/3">
                        <h3 className="text-2xl font-bold mb-10 text-light-heading flex items-center gap-3">
                            <Award className="text-primary" /> Certifications
                        </h3>

                        <div className="space-y-6">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-6 border-l-4 border-l-primary flex items-start gap-4 hover:shadow-[0_0_20px_rgba(102,252,241,0.15)] transition-all"
                                >
                                    <Award className="text-primary mt-1 shrink-0" />
                                    <p className="text-light-heading font-medium leading-relaxed">{cert}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
