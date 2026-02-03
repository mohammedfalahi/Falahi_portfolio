'use client'

import { useState, useEffect, useRef } from 'react'
import { SplineScene } from '@/components/ui/splite'
import { cn } from '@/lib/utils'

interface AboutRobotProps {
    scene?: string
    className?: string
}

export function AboutRobot({
    scene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
    className
}: AboutRobotProps) {
    const [shouldLoad, setShouldLoad] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Load when 15% of the element is visible
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                        setShouldLoad(true)
                        // Once loaded, stop observing
                        observer.disconnect()
                    }
                })
            },
            {
                threshold: 0.15, // Trigger when 15% is visible
                rootMargin: '0px'
            }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className={cn("w-full h-full overflow-visible", className)}>
            {shouldLoad && (
                <SplineScene
                    scene={scene}
                    className="w-full h-full"
                />
            )}
        </div>
    )
}
