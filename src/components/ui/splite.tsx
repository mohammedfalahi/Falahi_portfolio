'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <>
            <div className={className} style={{ border: 'none', outline: 'none' }}>
                <Suspense fallback={<div className="w-full h-full" />}>
                    <Spline scene={scene} style={{ border: 'none', outline: 'none' }} />
                </Suspense>
            </div>
            <style>{`
                canvas {
                    border: none !important;
                    outline: none !important;
                }
            `}</style>
        </>
    )
}
