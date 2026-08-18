import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../UI/Logo';
import NameMark from '../UI/NameMark';
import { personalData } from '../../data/portfolioData';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#experience' },
    { name: 'Insights', href: '#insights' },
    { name: 'Talk', href: '#contact' },
];

// Steps back down at md, where the desktop links appear and compete for width.
const lockupSize =
    'text-[20px] tracking-[0.06em] sm:text-[26px] sm:tracking-[0.08em] md:text-[20px] md:tracking-[0.06em] lg:text-[38px] lg:tracking-[0.12em] xl:text-[48px] xl:tracking-[0.14em]';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            setIsScrolled(window.scrollY > 50);
            setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll while the fullscreen menu is open.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'border-b border-rule bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
                    }`}
            >
                <div className="flex items-center justify-between px-5 py-5 sm:px-6 md:px-10 lg:px-14">
                    <a
                        href="#home"
                        onClick={(e) => handleScrollTo(e, '#home')}
                        className={`font-pixel flex items-center gap-[0.32em] uppercase text-ink transition-colors duration-200 hover:text-term ${lockupSize}`}
                        aria-label="Back to top"
                    >
                        {/* 0.5em == basis33's cap height, so the marks always match
                            the letterforms exactly at every breakpoint. */}
                        <Logo className="h-[0.5em] w-[0.5em] shrink-0" />
                        <NameMark name={personalData.name.toUpperCase()} />
                        <Logo className="h-[0.5em] w-[0.5em] shrink-0" />
                    </a>

                    <div className="hidden items-center gap-4 md:flex lg:gap-7">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className="font-pixel group relative text-xs uppercase tracking-widest text-ink-soft transition-colors duration-200 hover:text-term lg:text-sm"
                            >
                                <span className="text-term opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    /
                                </span>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => setMenuOpen(true)}
                        className="p-2 text-ink transition-colors hover:text-term md:hidden"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Scroll progress */}
                <div
                    className="h-0.5 origin-left bg-term transition-transform duration-150"
                    style={{ transform: `scaleX(${progress / 100})` }}
                />
            </nav>

            {/* Fullscreen mobile menu */}
            <div
                className={`fixed inset-0 z-50 flex flex-col bg-paper transition-all duration-500 ease-out-expo md:hidden ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                    }`}
            >
                <div className="scanlines pointer-events-none absolute inset-0" />

                <div className="relative flex items-center justify-between border-b border-rule px-6 py-5">
                    <div className={`font-pixel flex items-center gap-[0.32em] uppercase ${lockupSize}`}>
                        <Logo className="h-[0.5em] w-[0.5em] shrink-0" />
                        <NameMark name={personalData.name.toUpperCase()} />
                        <Logo className="h-[0.5em] w-[0.5em] shrink-0" />
                    </div>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-2 text-ink transition-colors hover:text-term"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="relative flex flex-1 flex-col items-center justify-center gap-7">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScrollTo(e, link.href)}
                            style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms' }}
                            className={`font-pixel text-2xl uppercase tracking-widest transition-all duration-500 ease-out-expo hover:text-term ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                }`}
                        >
                            <span className="text-term">/</span>{link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Navbar;
