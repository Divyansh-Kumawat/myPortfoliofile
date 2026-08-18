import { motion } from 'framer-motion';
import { skills, technicalSkills } from '../../data/portfolioData';
import SectionHeader from '../UI/SectionHeader';

// skillicons.dev slugs, keyed by the display names used in portfolioData.
const skillIconSlugs = {
    "JavaScript": "js", "Python": "py", "C++": "cpp", "Java": "java", "PHP": "php",
    "HTML": "html", "CSS": "css", "Tailwind CSS": "tailwind", "React.js": "react",
    "Next.js": "next", "Node.js": "nodejs", "Express.js": "express", "MongoDB": "mongodb",
    "MySQL": "mysql", "AWS": "aws", "Microsoft Azure": "azure", "TensorFlow": "tensorflow",
    "Git": "git", "GitHub": "github", "UI/UX Design (Figma)": "figma",
    "Docker": "docker", "Kubernetes": "kubernetes",
};

const categoryDefs = [
    { title: 'languages', items: technicalSkills.languages },
    { title: 'frontend', items: technicalSkills.frontend },
    { title: 'ai_ml', items: technicalSkills.ai_ml },
    { title: 'backend', items: technicalSkills.backend },
    { title: 'database', items: technicalSkills.database },
    { title: 'cloud', items: technicalSkills.cloud },
];

// A running index across every category, so animation phases keep varying
// instead of resetting at each heading.
const categories = categoryDefs.reduce((acc, c) => {
    const prev = acc[acc.length - 1];
    acc.push({ ...c, offset: prev ? prev.offset + prev.items.length : 0 });
    return acc;
}, []);

// Small inline icon, still used by the "other skills" list below.
const getSkillLogo = (skillName) => {
    const slug = skillIconSlugs[skillName];
    if (!slug) return null;
    return (
        <img
            src={`https://skillicons.dev/icons?i=${slug}`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-4 w-4 object-contain transition-transform duration-300 group-hover:scale-125"
        />
    );
};

// Drift and breathe are given co-prime-ish periods and a negative delay, so
// tiles start mid-cycle rather than all snapping from rest together.
const TechTile = ({ name, index }) => {
    const slug = skillIconSlugs[name];
    const floatDur = 5.2 + (index % 5) * 0.63;
    const pulseDur = 3.9 + (index % 4) * 0.71;
    const offset = (index % 7) * 0.8;

    return (
        <span
            title={name}
            className="tech-float group inline-flex items-center justify-center"
            style={{ animationDuration: `${floatDur}s`, animationDelay: `-${offset}s` }}
        >
            {slug ? (
                <img
                    src={`https://skillicons.dev/icons?i=${slug}`}
                    alt={name}
                    loading="lazy"
                    className="tech-pulse h-12 w-12 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_16px_rgba(255,95,31,0.85)] sm:h-14 sm:w-14"
                    style={{ animationDuration: `${pulseDur}s`, animationDelay: `-${offset / 2}s` }}
                />
            ) : (
                // No mark exists for these, so the name carries the tile rather
                // than the skill vanishing from the page.
                <span
                    className="tech-pulse font-pixel grid h-12 w-12 place-items-center border border-term/40 bg-term-tint px-1 text-center text-[9px] uppercase leading-tight text-term transition-colors duration-300 group-hover:border-term sm:h-14 sm:w-14 sm:text-[10px]"
                    style={{ animationDuration: `${pulseDur}s`, animationDelay: `-${offset / 2}s` }}
                >
                    {name}
                </span>
            )}
        </span>
    );
};

const TechCategory = ({ title, items, offset = 0 }) => (
    <div className="mb-8">
        <h4 className="font-pixel prompt mb-4 text-sm uppercase tracking-widest text-term">{title}</h4>
        {/* Generous gaps leave room for the drift without tiles colliding. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {items.map((item, i) => (
                <TechTile key={item} name={item} index={offset + i} />
            ))}
        </div>
    </div>
);

const Skills = () => (
    <section id="skills" className="relative border-t border-white/5 bg-white/[0.018] py-24 px-5 sm:px-6 md:px-10 lg:px-14">
        <SectionHeader
            index="02"
            label="skills"
            title="THE"
            pixelWord="TOOLKIT"
            lede="A comprehensive overview of my technical expertise, categorized by domain."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

            {/* Core competencies, as terminal load bars */}
            <div>
                <h3 className="mb-7 text-xl font-bold uppercase tracking-wide">Core Competencies</h3>
                <div className="space-y-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, delay: index * 0.05 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="group"
                        >
                            <div className="mb-1.5 flex items-baseline justify-between">
                                <span className="font-pixel text-sm uppercase tracking-wide text-ink transition-colors group-hover:text-term">
                                    {skill.name}
                                </span>
                                <span className="font-pixel text-sm text-term">{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full border border-rule bg-black/40 p-[2px]">
                                <motion.div
                                    className="h-full origin-left bg-term"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: skill.level / 100 }}
                                    style={{ originX: 0 }}
                                    transition={{ duration: 1, delay: 0.15 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Technologies & tools */}
            <motion.div
                className="border border-rule bg-surface/70 p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h3 className="mb-7 text-xl font-bold uppercase tracking-wide">Technologies &amp; Tools</h3>
                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                    <div>{categories.slice(0, 3).map((c) => <TechCategory key={c.title} {...c} />)}</div>
                    <div>
                        {categories.slice(3).map((c) => <TechCategory key={c.title} {...c} />)}

                        <div>
                            <h4 className="font-pixel prompt mb-3 text-sm uppercase tracking-widest text-term">other</h4>
                            <ul className="space-y-2.5 text-sm text-ink-soft">
                                {technicalSkills.other.map((item) => (
                                    <li key={item} className="group flex items-center justify-between gap-3">
                                        <span className="flex items-center gap-2.5">
                                            <span className="font-pixel text-term">▸</span>
                                            {item.includes('UI/UX Design') ? 'Figma (UI/UX Design)' : item}
                                        </span>
                                        {getSkillLogo(item)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

export default Skills;
