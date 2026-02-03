import { motion } from 'framer-motion'
import { Linkedin, Github, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Counter } from '@/components/ui/counter'
import { AboutRobot } from '@/components/ui/about-robot'

interface AboutMeProps {
    title?: string
    description?: string
    stats?: {
        years: number
        projects: number
    }
    contact?: {
        phone: string
        email: string
    }
    socialLinks?: {
        linkedin: string
        github: string
    }
    cvDownloadLink?: string
    className?: string
}

export const AboutMe = ({
    title = 'ABOUT ME',
    description = "Hi, I'm Mohammed Falahi — an AI engineer focused on building intelligent systems, practical machine learning solutions, and clean, scalable software.",
    stats = {
        years: 2,
        projects: 10
    },
    contact = {
        phone: '+971 52 355 4486',
        email: 'sanufalahi5034@gmail.com',
    },
    socialLinks = {
        linkedin: 'https://www.linkedin.com/in/mohammed-falahi',
        github: 'https://github.com/mohammedfalahi',
    },
    cvDownloadLink = '#',
    className,
}: AboutMeProps) => {
    return (
        <section
            className={cn(
                'relative w-full bg-transparent py-32',
                className
            )}
        >
            {/* Gradient Bridge - Removed to show animated grid */}
            {/* <div className="absolute -top-32 inset-x-0 h-96 bg-gradient-to-b from-transparent via-white/95 to-white dark:via-neutral-950/95 dark:to-neutral-950 z-10" /> */}


            <div className="relative z-20 mx-auto w-full max-w-7xl px-10 md:px-16 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        {/* Title */}
                        <div className="flex items-center gap-4">
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white">
                                {title}
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed">
                            {description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <div className="flex items-center">
                                    <Counter end={stats.years} fontSize={64} className="text-yellow-400" />
                                    <span className="text-5xl font-bold text-yellow-400 ml-1">+</span>
                                </div>
                                <div className="text-base md:text-lg font-medium">
                                    Years of Experience
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <Counter end={stats.projects} fontSize={64} className="text-yellow-400" />
                                    <span className="text-5xl font-bold text-yellow-400 ml-1">+</span>
                                </div>
                                <div className="text-base md:text-lg font-medium">
                                    Completed Projects
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-5">
                            <div>
                                <div className="text-base font-semibold">Call Today :</div>
                                <div className="text-lg md:text-xl text-neutral-700 dark:text-neutral-400">
                                    {contact.phone}
                                </div>
                            </div>

                            <div>
                                <div className="text-base font-semibold">Email :</div>
                                <div className="text-lg md:text-xl text-neutral-700 dark:text-neutral-400">
                                    {contact.email}
                                </div>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-6 pt-4">
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center border-2 border-neutral-900 dark:border-white rounded-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all"
                            >
                                <Linkedin className="w-7 h-7" />
                            </a>

                            <a
                                href={socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center border-2 border-neutral-900 dark:border-white rounded-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all"
                            >
                                <Github className="w-7 h-7" />
                            </a>
                        </div>

                        {/* Download CV */}
                        <a
                            href={cvDownloadLink}
                            download
                            className="inline-flex items-center gap-3 px-10 py-5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-semibold text-xl"
                        >
                            <Download className="w-6 h-6" />
                            DOWNLOAD CV
                        </a>
                    </motion.div>

                    {/* RIGHT CONTENT – ROBOT */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex justify-center lg:justify-end overflow-visible lg:mt-20"
                    >
                        <div className="w-[160%] lg:w-[180%] h-[520px] md:h-[620px] overflow-visible">
                            <AboutRobot />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
