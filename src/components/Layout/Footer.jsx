import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import Logo from '../UI/Logo';

const socials = [
    { icon: Github, url: personalData.social.github, label: 'GitHub' },
    { icon: Linkedin, url: personalData.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: personalData.social.twitter, label: 'X' },
];

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative z-10 border-t-2 border-ink bg-paper/35 px-5 pb-8 pt-14 backdrop-blur-md sm:px-6 md:px-10 lg:px-14">
            <div className="mb-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

                <div>
                    <div className="mb-3 flex items-center gap-2.5">
                        <Logo size={24} className="text-term" />
                        <span className="font-pixel text-lg uppercase tracking-widest">
                            {personalData.name.split(' ')[0]}
                        </span>
                        <span className="animate-blink text-term">█</span>
                    </div>
                    <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                        Driven by technology, fueled by passion. Building digital experiences that matter.
                    </p>
                </div>

                <div className="flex gap-2.5">
                    {socials.map(({ icon: Icon, url, label }) => (
                        <a
                            key={label}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="border border-rule bg-surface/70 p-3 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-term hover:text-term hover:shadow-[3px_3px_0_0_#FF5F1F]"
                        >
                            <Icon size={17} strokeWidth={1.75} />
                        </a>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-rule pt-7 sm:flex-row sm:items-center">
                <p className="font-pixel text-xs uppercase tracking-wider text-ink-mute">
                    &copy; {new Date().getFullYear()} {personalData.name} {'//'} built with React &amp; Tailwind
                </p>

                <button
                    onClick={scrollToTop}
                    className="font-pixel group flex items-center gap-2 border border-rule px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-term hover:text-term hover:shadow-[3px_3px_0_0_#FF5F1F]"
                    aria-label="Scroll to top"
                >
                    Back to top
                    <ArrowUp size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
