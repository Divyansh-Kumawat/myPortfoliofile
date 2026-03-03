import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/portfolioData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Projects = () => {
    const NextArrow = ({ onClick }) => {
        return (
            <div
                className="absolute top-1/2 -right-2 md:-right-5 -translate-y-1/2 z-10 cursor-pointer bg-dark-surface/80 hover:bg-primary/20 p-2 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(102,252,241,0.3)] hidden md:block"
                onClick={onClick}
            >
                <ChevronRight className="text-white group-hover:text-primary transition-colors" size={24} />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div
                className="absolute top-1/2 -left-2 md:-left-5 -translate-y-1/2 z-10 cursor-pointer bg-dark-surface/80 hover:bg-primary/20 p-2 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(102,252,241,0.3)] hidden md:block"
                onClick={onClick}
            >
                <ChevronLeft className="text-white group-hover:text-primary transition-colors" size={24} />
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        cssEase: "ease-in-out",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dotsClass: "slick-dots !bottom-[-3rem]",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    };

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 inline-block relative text-glow"
                    >
                        Featured Projects
                        <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-primary rounded-full shadow-[0_0_10px_#66FCF1]"></span>
                    </motion.h2>
                    <p className="text-light-text/70 mt-4 max-w-2xl mx-auto">
                        A showcase of my recent work, highlighting my expertise in full-stack development, AI integration, and problem-solving.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative pb-16"
                >
                    <Slider {...settings} className="projects-slider">
                        {projects.map((project, index) => (
                            <div key={project.id} className="px-4 h-full outline-none pt-4 pb-8">
                                <div className="glass-card group overflow-hidden flex flex-col h-[520px] hover:shadow-[0_0_30px_rgba(69,162,158,0.2)] transition-all duration-300 transform md:hover:-translate-y-2">
                                    {/* Image Container with Hover Effect */}
                                    <div className="relative h-64 flex-shrink-0 overflow-hidden bg-dark-bg p-4 flex items-center justify-center border-b border-dark-surface">
                                        {/* Fallback pattern if image is missing, otherwise render image */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/90 to-transparent z-10"></div>

                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-contain md:object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 z-0 opacity-80"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"; // default fallback
                                            }}
                                        />

                                        {/* Category Badge */}
                                        <span className="absolute top-4 left-4 z-20 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border border-primary/30 uppercase tracking-wider">
                                            {project.category}
                                        </span>

                                        {/* Overlay Links on Hover */}
                                        <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-[2px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-dark-surface rounded-full text-white hover:text-primary hover:bg-white/10 transition-colors"
                                                    title="View Source Code"
                                                >
                                                    <Github size={24} />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-primary rounded-full text-dark-bg hover:bg-white transition-colors shadow-[0_0_15px_rgba(102,252,241,0.5)]"
                                                    title="Live Demo"
                                                >
                                                    <ExternalLink size={24} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-light-heading mb-3 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-light-text/80 mb-6 flex-grow line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded z-30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
