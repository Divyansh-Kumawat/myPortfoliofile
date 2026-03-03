import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-dark-bg border-t border-dark-surface pt-16 pb-8 relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">

                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <a href="#home" className="text-2xl font-bold font-mono text-primary inline-flex items-center gap-2 mb-2">
                            <span className="text-light-heading bg-dark-surface px-2 py-1 rounded">{'<'}</span>
                            {personalData.name.split(' ')[0]}
                            <span className="text-light-heading bg-dark-surface px-2 py-1 rounded">{'>'}</span>
                        </a>
                        <p className="text-light-text/70 text-sm max-w-xs md:mx-0 mx-auto">
                            Driven by technology, fueled by passion. Building digital experiences that matter.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a href={personalData.social.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-dark-surface rounded-full text-light-text hover:text-primary hover:bg-primary/10 transition-colors">
                            <Github size={20} />
                        </a>
                        <a href={personalData.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-dark-surface rounded-full text-light-text hover:text-primary hover:bg-primary/10 transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href={personalData.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-dark-surface rounded-full text-light-text hover:text-primary hover:bg-primary/10 transition-colors">
                            <Twitter size={20} />
                        </a>
                    </div>

                </div>

                <div className="border-t border-dark-surface pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-light-text/60 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} {personalData.name}. All rights reserved. Built with <span className="text-red-500">❤️</span> using React & Tailwind CSS.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="p-3 bg-primary/10 border border-primary/30 rounded-full text-primary hover:bg-primary hover:text-dark-bg transition-colors shadow-[0_0_10px_rgba(102,252,241,0.2)]"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
