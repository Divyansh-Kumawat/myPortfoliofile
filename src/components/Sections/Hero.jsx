import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import myPhoto from '../../assets/myphoto2.png';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % personalData.slideImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentSlide}
                        src={personalData.slideImages[currentSlide]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }} // Increased opacity for better visibility
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full object-cover object-center"
                        alt="Hero Background"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-dark-bg/70 to-dark-bg"></div>
            </div>

            {/* Decorative Blur Orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#45A29E]/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary font-mono text-lg md:text-xl mb-4 block">
                            👋 Hi, I’m
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-light-heading via-primary to-light-heading leading-tight mb-4 animate-glow">
                            {personalData.name}
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-medium text-light-text mb-6">
                            {personalData.tagline}
                        </h2>
                        <p className="text-lg text-light-text/80 max-w-2xl mb-10 leading-relaxed">
                            I build modern, scalable web applications and love solving real-world problems using technology.
                            <br />🔹 MERN Stack | 🔹 AWS | 🔹 AI/ML | 🔹 Data Science
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <a href="#projects" className="btn-primary group">
                                View Projects
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline group">
                                <Download className="mr-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                Download Resume
                            </a>
                            <a href="#contact" className="ml-2 text-primary hover:text-white transition-colors p-3 rounded-full bg-dark-surface hover:bg-primary shadow-lg border border-primary/30">
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>

                        <div className="mt-12 flex gap-6">
                            {[
                                { icon: Github, url: personalData.social.github },
                                { icon: Linkedin, url: personalData.social.linkedin },
                                { icon: Twitter, url: personalData.social.twitter },
                            ].map((Social, index) => (
                                <a
                                    key={index}
                                    href={Social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-light-text hover:text-primary transition-all duration-300 hover:-translate-y-2"
                                >
                                    <Social.icon size={26} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side Photo */}
                <div className="w-full lg:w-1/2 mt-16 md:mt-0 flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Decorative background behind image */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl transform scale-110 animate-pulse"></div>
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-blue-500/10 rounded-full blur-xl animate-spin-slow"></div>

                        {/* The actual image container */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 rounded-3xl overflow-hidden glass-card border-2 border-primary/30 shadow-[0_0_40px_rgba(102,252,241,0.3)] w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]"
                        >
                            <img
                                src={myPhoto}
                                alt={personalData.name}
                                className="w-full h-full object-cover object-top"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"; // fallback
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="text-xs uppercase tracking-widest text-primary/70">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
