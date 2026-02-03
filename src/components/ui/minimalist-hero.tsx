import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
    logoText: string;
    navLinks: { label: string; href: string }[];
    heading: string;
    description: string;
    readMoreLink: string;
    imageSrc: string;
    imageAlt: string;
    overlayText: {
        part1: string;
        part2: string;
    };
    socialLinks: { icon: LucideIcon; href: string }[];
    locationText: string;
    className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        className="text-sm md:text-base lg:text-lg font-medium tracking-wider transition-colors hover:text-foreground/80"
    >
        {children}
    </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full text-foreground/60 transition-all hover:text-foreground hover:scale-110"
    >
        <Icon className="h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9" />
    </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
    logoText,
    navLinks,
    heading,
    description,
    readMoreLink,
    imageSrc,
    imageAlt,
    overlayText,
    socialLinks,
    locationText,
    className,
}: MinimalistHeroProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-transparent px-8 py-4 font-sans md:px-16 md:py-8 lg:px-24 lg:py-10',
                className
            )}
        >
            {/* Header */}
            <header className="z-30 flex w-full items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-base md:text-2xl lg:text-3xl font-bold tracking-widest"> {logoText}</h1>

                </motion.div>
                <div className="hidden items-center space-x-8 md:flex">
                    {navLinks.map((link) => (
                        <NavLink key={link.label} href={link.href}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col space-y-1.5 md:hidden z-50"
                    aria-label="Open menu"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="block h-0.5 w-6 bg-foreground"></span>
                    <span className="block h-0.5 w-6 bg-foreground"></span>
                    <span className="block h-0.5 w-5 bg-foreground"></span>
                </motion.button>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center md:hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 text-4xl font-light"
                            aria-label="Close menu"
                        >
                            ×
                        </button>

                        {/* Menu links */}
                        <nav className="flex flex-col items-center space-y-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-medium tracking-wider transition-colors hover:text-foreground/80"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="relative grid w-full flex-grow grid-cols-1 items-center md:grid-cols-3">
                {/* Left Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="z-20 order-2 md:order-1 text-center md:text-left"
                >
                    <h2 className="max-w-lg text-lg md:text-2xl lg:text-3xl font-bold leading-tight mb-3">
                        {heading}
                    </h2>
                    <p className="max-w-lg text-sm md:text-xl lg:text-1xl leading-relaxed">
                        {description}
                    </p>
                    <a
                        href={readMoreLink}
                        className="mt-4 inline-flex items-center gap-2 text-sm md:text-lg font-medium text-foreground underline decoration-from-font"
                    >
                        Read More
                    </a>
                </motion.div>

                {/* Center Image with Circle */}
                <div className="relative order-1 md:order-2 flex justify-center items-center overflow-hidden md:overflow-visible">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="
                            relative z-0
                            size-[280px]
                            md:size-[520px]
                            lg:size-[640px]
                            aspect-square
                            rounded-full
                            bg-yellow-400/90
                            overflow-hidden
                            flex items-center md:items-end justify-center
                            shrink-0
                        "
                    >
                        <motion.img
                            src={imageSrc}
                            alt={imageAlt}
                            className="
                                w-48 md:w-80 lg:w-96
                                h-auto
                                scale-110 md:scale-150
                                object-cover
                                object-top
                            "
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        />
                    </motion.div>
                </div>

                {/* Right Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
                >
                    <span className="text-6xl md:text-9xl lg:text-[10rem] font-extrabold leading-[0.9] tracking-tighter -translate-x-2 md:-translate-x-8 inline-block">
                        {overlayText.part1}
                        <br />
                        {overlayText.part2}
                    </span>
                </motion.div>
            </div>

            {/* Footer Elements */}
            <footer className="z-30 flex w-full items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="flex items-center space-x-4 md:space-x-8"
                >
                    {socialLinks.map((link, index) => (
                        <SocialIcon key={index} href={link.href} icon={link.icon} />
                    ))}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="text-sm md:text-lg font-medium tracking-wide"
                >
                    {locationText}
                </motion.div>
            </footer>
        </div>
    );
};
