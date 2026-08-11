import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/portfolioData';
import SectionHeader from '../UI/SectionHeader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const arrowClasses =
    "absolute top-1/2 z-20 hidden -translate-y-1/2 cursor-pointer border-2 border-ink bg-surface p-2.5 text-ink transition-all duration-200 hover:border-term hover:bg-term hover:text-white md:block";

const Projects = () => {
    const NextArrow = ({ onClick }) => (
        <div className={`${arrowClasses} -right-2 md:-right-5`} onClick={onClick}>
            <ChevronRight size={20} />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div className={`${arrowClasses} -left-2 md:-left-5`} onClick={onClick}>
            <ChevronLeft size={20} />
        </div>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dotsClass: "slick-dots !bottom-[-3rem]",
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } }
        ]
    };

    return (
        <section id="projects" className="relative bg-paper/85 py-24 px-5 backdrop-blur-sm sm:px-6 md:px-10 lg:px-14">
            <SectionHeader
                index="03"
                label="projects"
                title="SELECTED"
                pixelWord="WORK"
                lede="A showcase of my recent work, highlighting my expertise in full-stack development, AI integration, and problem-solving."
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.15 }}
                className="relative pb-16"
            >
                <Slider {...settings} className="projects-slider">
                    {projects.map((project, index) => (
                        <div key={project.id} className="h-full px-3 pb-8 pt-1 outline-none">
                            <div className="group flex h-[520px] flex-col border border-rule bg-surface transition-all duration-300 hover:border-term hover:shadow-[6px_6px_0_0_#FF5F1F]">

                                {/* Cover */}
                                <div className="relative h-56 shrink-0 overflow-hidden border-b border-rule">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover brightness-[0.62] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                                        }}
                                    />
                                    {/* Orange duotone wash, clears on hover */}
                                    <div className="pointer-events-none absolute inset-0 bg-term/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                                    <div className="scanlines pointer-events-none absolute inset-0" />

                                    <span className="font-pixel absolute left-3 top-3 z-20 border border-ink bg-surface px-1.5 py-0.5 text-xs text-ink">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-pixel absolute right-3 top-3 z-20 bg-term px-2 py-0.5 text-[10px] uppercase tracking-widest text-white">
                                        {project.category}
                                    </span>

                                    {/* Hover actions */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 bg-black/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View source code"
                                                className="border-2 border-white p-2.5 text-white transition-colors hover:bg-white hover:text-ink"
                                            >
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Live demo"
                                                className="border-2 border-term bg-term p-2.5 text-white transition-colors hover:bg-transparent hover:text-term"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="flex flex-grow flex-col p-6">
                                    <h3 className="mb-3 text-lg font-bold uppercase leading-tight tracking-tight transition-colors duration-200 group-hover:text-term">
                                        {project.title}
                                    </h3>
                                    <p className="mb-5 line-clamp-3 flex-grow text-sm leading-relaxed text-ink-soft">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto flex flex-wrap gap-1.5">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="font-pixel border border-rule bg-bone px-2 py-0.5 text-[11px] text-ink-soft"
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
        </section>
    );
};

export default Projects;
