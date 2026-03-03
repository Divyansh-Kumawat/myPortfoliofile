import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalData } from '../../data/portfolioData';
import { Code, Server, Zap, Layout, Brain, LineChart } from 'lucide-react';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const aboutImages = [
        "/src/assets/one.webp",
        "/src/assets/two.webp",
        "/src/assets/three.webp",
        "/src/assets/four.webp"
    ];

    const [currentImg, setCurrentImg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % aboutImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const attributes = [
        { icon: <Layout className="text-primary w-6 h-6" />, title: "Frontend", desc: "Crafting beautiful UI/UX with React & Tailwind." },
        { icon: <Server className="text-primary w-6 h-6" />, title: "Backend", desc: "Building scalable APIs with Node.js & Express." },
        { icon: <Zap className="text-primary w-6 h-6" />, title: "Cloud", desc: "Deploying and scaling with AWS." },
        { icon: <Code className="text-primary w-6 h-6" />, title: "Optimization", desc: "Improving performance and SEO." },
        { icon: <Brain className="text-primary w-6 h-6" />, title: "Machine Learning", desc: "Working on AI/ML projects." },
        { icon: <LineChart className="text-primary w-6 h-6" />, title: "Data Science", desc: "Working on Data Science projects." },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="flex flex-col lg:flex-row gap-16 items-center"
                >
                    {/* Left side text with Background Slideshow */}
                    <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden min-h-[500px] flex items-center shadow-[0_0_30px_rgba(102,252,241,0.15)]">

                        {/* Background Slideshow */}
                        <div className="absolute inset-0 z-0">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImg}
                                    src={aboutImages[currentImg]}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 0.4, scale: 1 }} // Low opacity to keep text readable
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2 }}
                                    className="w-full h-full object-cover object-center"
                                    alt="About Me Background"
                                />
                            </AnimatePresence>
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/70 to-dark-bg/40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 md:p-12 w-full">
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4 text-light-heading">
                                <span className="w-12 h-1 bg-primary"></span>
                                About Me
                            </motion.h2>

                            <motion.div variants={itemVariants} className="space-y-6 text-lg text-white/90 leading-relaxed font-medium">
                                <p>
                                    {personalData.bio}
                                </p>
                                <p>
                                    I am a Computer Science student with a strong interest in full-stack web development, cloud technologies, and problem-solving.
                                    I enjoy building user-friendly applications, optimizing performance, and continuously learning new technologies.
                                </p>
                                <p>
                                    My goal is to work as a software developer where I can contribute to impactful projects and continuously grow my technical skills.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right side attributes grid */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {attributes.map((attr, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="glass-card p-6 border-l-4 border-l-primary hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-dark-bg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(102,252,241,0.2)]">
                                        {attr.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-light-heading">{attr.title}</h3>
                                    <p className="text-light-text/70">{attr.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative gradient lines */}
            <div className="absolute top-1/2 right-0 w-1/3 h-[1px] bg-gradient-to-l from-primary to-transparent opacity-30"></div>
            <div className="absolute top-1/4 left-0 w-1/4 h-[1px] bg-gradient-to-r from-primary to-transparent opacity-30"></div>
        </section>
    );
};

export default About;
