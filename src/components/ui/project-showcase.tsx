"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"

interface Skill {
    title: string
    summary: string
    description: string
    year: string
    image: string
}

const skills: Skill[] = [
    {
        title: "AI & LLM Engineering",
        summary: "RAG, prompt engineering, API-based AI systems",
        description:
            "Building intelligent systems using Large Language Models, implementing Retrieval-Augmented Generation pipelines, and developing production-ready AI applications with advanced prompt engineering techniques.",
        year: "2024",
        image: "public/skill_images/llm.png",
    },
    {
        title: "Machine Learning & Data Science",
        summary: "Python, Pandas, Scikit-learn, TensorFlow",
        description:
            "Developing end-to-end machine learning solutions, from data preprocessing and feature engineering to model training and deployment. Strong focus on real-world data quality, evaluation, and predictive performance.",
        year: "2023",
        image: "public/skill_images/ml.png",
    },
    {
        title: "Computer Vision",
        summary: "OpenCV, CNNs, YOLO, real-time detection",
        description:
            "Designing computer vision systems for object detection, image classification, and real-time video analysis, including safety and monitoring use cases using deep learning models.",
        year: "2023",
        image: "public/skill_images/computer_vision.png",
    },
    {
        title: "Full-Stack Development",
        summary: "React, Next.js, Flask, REST APIs",
        description:
            "Building scalable full-stack applications with clean architecture, responsive interfaces, and well-structured backend services. Emphasis on maintainability, performance, and API design.",
        year: "2024",
        image: "public/skill_images/full_stack.png",
    },
    {
        title: "AI-Driven UI/UX Design",
        summary: "UX thinking, AI-assisted design, product flow",
        description:
            "Designing user interfaces and product flows with AI assistance, focusing on usability, clarity, and user intent. Translating complex AI capabilities into intuitive, human-centered experiences that users can actually understand and trust.",
        year: "2024",
        image: "public/skill_images/ui.png",
    },
]

export function ProjectShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const [videoPlayed, setVideoPlayed] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const animationRef = useRef<number | null>(null)

    // Track if user has scrolled to prevent video playing on initial page load
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(true)
        }

        window.addEventListener('scroll', handleScroll, { once: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // IntersectionObserver for video reveal at 70% visibility
    useEffect(() => {
        if (!containerRef.current || videoPlayed || !hasScrolled) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !videoPlayed) {
                    // Play video immediately
                    if (videoRef.current) {
                        videoRef.current.play()
                        setVideoPlayed(true)
                    }
                    // Show content after 2 seconds
                    setTimeout(() => {
                        setShowContent(true)
                    }, 2000)
                }
            },
            { threshold: 0.7 }
        )

        observer.observe(containerRef.current)

        return () => {
            observer.disconnect()
        }
    }, [videoPlayed, hasScrolled])

    useEffect(() => {
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const animate = () => {
            setSmoothPosition((prev) => ({
                x: lerp(prev.x, mousePosition.x, 0.15),
                y: lerp(prev.y, mousePosition.y, 0.15),
            }))
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePosition])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index)
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null)
        setIsVisible(false)
    }

    const handleClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full py-20 overflow-hidden min-h-screen flex items-center justify-center">
            {/* Background Video */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover z-0"
                muted
                playsInline
                loop={false}
            >
                <source src="/videos/project_reveal.mp4" type="video/mp4" />
            </video>

            {/* Animated Grid Pattern - appears after video */}
            <AnimatedGridPattern
                numSquares={25}
                maxOpacity={0.1}
                duration={4}
                repeatDelay={1.5}
                className={cn(
                    "z-5 fill-gray-300/40 stroke-gray-300/40 dark:fill-gray-600/40 dark:stroke-gray-600/40",
                    "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                    `transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`,
                )}
            />

            {/* Content - appears after 2 seconds */}
            <div
                className={`relative z-10 transition-opacity duration-1000 mx-auto w-full max-w-5xl px-8 md:px-16 lg:px-20 ${showContent ? "opacity-100" : "opacity-0"
                    }`}
            >
                <h2 className="text-black text-base md:text-lg lg:text-xl font-medium tracking-wide uppercase mb-12" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>What can I do for you</h2>

                <div
                    className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
                    style={{
                        left: containerRef.current?.getBoundingClientRect().left ?? 0,
                        top: containerRef.current?.getBoundingClientRect().top ?? 0,
                        transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0.8,
                        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden">
                        {skills.map((skill, index) => (
                            <img
                                key={skill.title}
                                src={skill.image || "/placeholder.svg"}
                                alt={skill.title}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                                style={{
                                    opacity: hoveredIndex === index ? 1 : 0,
                                    scale: hoveredIndex === index ? 1 : 1.1,
                                    filter: hoveredIndex === index ? "none" : "blur(10px)",
                                }}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                    </div>
                </div>

                <div className="space-y-0">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.title}
                            className="group"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className="relative py-5 border-t border-black/20 transition-all duration-300 ease-out cursor-pointer"
                                onClick={() => handleClick(index)}
                            >
                                <div
                                    className={`
                                        absolute inset-0 -mx-4 px-4 bg-black/10 rounded-lg
                                        transition-all duration-300 ease-out
                                        ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                                    `}
                                />

                                <div className="relative flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="inline-flex items-center gap-2">
                                            <h3 className="text-black font-medium text-base md:text-lg lg:text-xl tracking-tight" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
                                                <span className="relative">
                                                    {skill.title}
                                                    <span
                                                        className={`
                                                            absolute left-0 -bottom-0.5 h-px bg-black
                                                            transition-all duration-300 ease-out
                                                            ${hoveredIndex === index ? "w-full" : "w-0"}
                                                        `}
                                                    />
                                                </span>
                                            </h3>

                                            <ChevronDown
                                                className={`
                                                    w-5 h-5 text-black/60
                                                    transition-all duration-300 ease-out
                                                    ${expandedIndex === index ? "rotate-180" : "rotate-0"}
                                                `}
                                            />
                                        </div>

                                        <p
                                            className={`
                                                text-black/70 text-xs md:text-sm lg:text-base mt-1 leading-relaxed
                                                transition-all duration-300 ease-out
                                                ${hoveredIndex === index ? "text-black/90" : "text-black/70"}
                                            `}
                                            style={{ textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}
                                        >
                                            {skill.summary}
                                        </p>
                                    </div>

                                    <span
                                        className={`
                                            text-[10px] md:text-xs lg:text-sm font-mono text-black/60 tabular-nums
                                            transition-all duration-300 ease-out
                                            ${hoveredIndex === index ? "text-black/80" : ""}
                                        `}
                                    >
                                        {skill.year}
                                    </span>
                                </div>

                                {/* Accordion Description Panel */}
                                <div
                                    className={`
                                        overflow-hidden transition-all duration-500 ease-out
                                        ${expandedIndex === index ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}
                                    `}
                                >
                                    <p
                                        className="text-black/80 text-[10px] md:text-xs lg:text-sm leading-relaxed pl-0"
                                        style={{ textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}
                                    >
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="border-t border-black/20" />
                </div>
            </div>
        </section>
    )
}
