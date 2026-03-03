import { motion } from 'framer-motion';
import { skills, technicalSkills } from '../../data/portfolioData';

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Helper to map skill names to specific icon URLs or emojis
    const getSkillLogo = (skillName) => {
        const skillIconsParams = {
            "JavaScript": "js",
            "Python": "py",
            "C++": "cpp",
            "Java": "java",
            "PHP": "php",
            "HTML": "html",
            "CSS": "css",
            "Tailwind CSS": "tailwind",
            "React.js": "react",
            "Next.js": "next",
            "Node.js": "nodejs",
            "Express.js": "express",
            "MongoDB": "mongodb",
            "MySQL": "mysql",
            "AWS": "aws",
            "Microsoft Azure": "azure",
            "TensorFlow": "tensorflow",
            "Git": "git",
            "GitHub": "github",
            "UI/UX Design (Figma)": "figma",
            "Docker": "docker",
            "Kubernetes": "kubernetes"
        };

        if (skillIconsParams[skillName]) {
            return (
                <img
                    src={`https://skillicons.dev/icons?i=${skillIconsParams[skillName]}`}
                    alt={skillName}
                    className="h-5 w-5 object-contain"
                />
            );
        }

        const customIcons = {
            "Machine Learning": "https://img.icons8.com/nolan/64/brain.png",
            "Data Science": "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-data-science-data-analytics-flaticons-lineal-color-flat-icons.png",
            "GenAI": "https://img.icons8.com/nolan/64/artificial-intelligence.png",
            "API Integration": "https://img.icons8.com/nolan/64/api-settings.png",
            "SEO Optimization": "https://img.icons8.com/nolan/64/domain.png",
            "Problem Solving": "https://img.icons8.com/nolan/64/light-on.png"
        };

        if (customIcons[skillName]) {
            return (
                <img
                    src={customIcons[skillName]}
                    alt={skillName}
                    className="h-5 w-auto object-contain"
                />
            );
        }

        if (skillName === "LangChain") return <span className="text-lg leading-none">🦜🔗</span>;
        if (skillName === "NLP") return <span className="text-lg leading-none">💬</span>;
        if (skillName === "Team Collaboration") return <span className="text-lg leading-none">👥</span>;

        return null;
    };

    const renderTechCategory = (title, items) => (
        <div className="mb-8">
            <h4 className="text-primary text-xl font-bold mb-4">{title}</h4>
            <div className="flex flex-wrap gap-2.5">
                {items.map((item, idx) => (
                    <motion.span
                        key={idx}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.1 }}
                        className="px-3 py-1.5 text-sm bg-[#0a192f] border border-[#1e2d4a] rounded-full text-light-text hover:text-primary hover:border-primary transition-colors cursor-default flex items-center gap-2 shadow-sm whitespace-nowrap"
                    >
                        {getSkillLogo(item)}
                        {item}
                    </motion.span>
                ))}
            </div>
        </div>
    );

    return (
        <section id="skills" className="py-24 bg-dark-bg/50 relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 inline-block relative"
                    >
                        Technical Skills
                        <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
                    </motion.h2>
                    <p className="text-light-text/70 mt-4 max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise, categorized by domain.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Progress Bars */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold mb-8 text-light-heading">Core Competencies</h3>
                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium text-light-text">{skill.name}</span>
                                        <span className="text-primary">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-dark-surface rounded-full h-2.5 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-[#45A29E] to-primary h-2.5 rounded-full shadow-[0_0_10px_rgba(102,252,241,0.5)]"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            viewport={{ once: true }}
                                        ></motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Categorized Skills */}
                    <motion.div
                        className="w-full lg:w-1/2 glass-card p-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold mb-8 text-light-heading">Technologies & Tools</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <div>
                                {renderTechCategory("Languages", technicalSkills.languages)}
                                {renderTechCategory("Frontend", technicalSkills.frontend)}
                                {renderTechCategory("AI & ML", technicalSkills.ai_ml)}
                            </div>
                            <div>
                                {renderTechCategory("Backend", technicalSkills.backend)}
                                {renderTechCategory("Database", technicalSkills.database)}
                                {renderTechCategory("Cloud & DevOps", technicalSkills.cloud)}

                                <div className="mt-8">
                                    <h4 className="text-primary text-xl font-bold mb-6">Other Skills</h4>
                                    <ul className="grid grid-cols-1 gap-y-6 text-base text-light-text/90">
                                        {technicalSkills.other.map((item, idx) => (
                                            <motion.li
                                                key={idx}
                                                animate={{ y: [0, -2, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                                                className="flex items-center justify-between col-span-1"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-[#45A29E] mb-0.5 shadow-[0_0_8px_rgba(69,162,158,0.8)]"></div>
                                                    {item.includes('UI/UX Design') ? 'Figma (UI/UX Design)' : item}
                                                </span>
                                                {getSkillLogo(item)}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
