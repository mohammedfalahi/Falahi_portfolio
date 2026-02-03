"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpRight, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function LetsWorkTogether() {
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setIsClicked(true)

        setTimeout(() => {
            setShowSuccess(true)
        }, 500)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // TODO: Replace with your actual Formspree endpoint
            const response = await fetch('https://formspree.io/f/xjgopddo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitSuccess(true)
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                })
            } else {
                console.error('Form submission failed')
            }
        } catch (error) {
            console.error('Submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }




    return (
        <section className="flex min-h-screen items-center justify-center px-6">
            <div className="grid grid-cols-1 items-center justify-items-center w-full">
                {/* Contact Card - Stacked on top */}
                <div
                    className="col-start-1 row-start-1 w-full flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] p-4 z-20"
                    style={{
                        opacity: showSuccess ? 1 : 0,
                        transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                        pointerEvents: showSuccess ? "auto" : "none",
                        visibility: showSuccess ? "visible" : "hidden", // Use visibility to prevent focus stealing when hidden
                        position: showSuccess ? "relative" : "absolute", // Switch positioning to allow height growth
                    }}
                >
                    <ContactCard
                        title="Get in touch"
                        description="I’m currently exploring full-time opportunities in AI and software engineering. If you’re looking for someone who builds practical, production-ready systems, let’s connect."
                        contactInfo={[
                            {
                                icon: MailIcon,
                                label: 'Email',
                                value: 'sanufalahi5034@gmail.com',
                            },
                            {
                                icon: MapPinIcon,
                                label: 'Location',
                                value: 'Dubai, UAE',
                            },
                            {
                                icon: PhoneIcon,
                                label: 'Phone',
                                value: '+971523554486',
                            }
                        ]}
                        className="max-w-7xl w-full"
                    >
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            {submitSuccess ? (
                                <div className="text-center py-12 space-y-4">
                                    <div className="text-6xl"></div>
                                    <h3 className="text-3xl font-bold">Thank You!</h3>
                                    <p className="text-lg text-muted-foreground">
                                        Your message has been sent successfully. I'll get back to you soon!
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={() => setSubmitSuccess(false)}
                                        className="mt-4"
                                    >
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Phone</Label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            placeholder="+1 234 567 8900"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Message</Label>
                                        <Textarea
                                            name="message"
                                            placeholder="Tell me about your project..."
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Submit'}
                                    </Button>
                                </>
                            )}
                        </form>
                    </ContactCard>
                </div>

                {/* Intro Content - Stacked below */}
                <div
                    className="col-start-1 row-start-1 flex flex-col items-center gap-12 transition-all duration-500"
                    style={{
                        opacity: isClicked ? 0 : 1,
                        transform: isClicked ? "translateY(-20px)" : "translateY(0)",
                        pointerEvents: isClicked ? "none" : "auto",
                        visibility: isClicked ? "hidden" : "visible",
                    }}
                >
                    <div className="flex items-center gap-4">
                        <span className="relative flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                        </span>
                        <span className="text-base font-medium tracking-widest uppercase text-muted-foreground md:text-lg">
                            Open To Work
                        </span>
                    </div>

                    <div
                        className="group relative cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>)}
                    >
                        <div className="flex flex-col items-center gap-6">
                            <h2 className="relative text-center text-6xl font-light tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <span className="block overflow-hidden">
                                    <span
                                        className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        style={{
                                            transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                                        }}
                                    >
                                        Let's work
                                    </span>
                                </span>
                                <span className="block overflow-hidden">
                                    <span
                                        className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                                        style={{
                                            transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                                        }}
                                    >
                                        <span className="text-muted-foreground/60">together</span>
                                    </span>
                                </span>
                            </h2>

                            <div className="relative mt-8 flex size-20 items-center justify-center sm:size-28">
                                <div
                                    className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                                    style={{
                                        borderColor: isClicked ? "var(--foreground)" : isHovered ? "var(--foreground)" : "var(--border)",
                                        backgroundColor: isClicked ? "transparent" : isHovered ? "var(--foreground)" : "transparent",
                                        transform: isClicked ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                                        opacity: isClicked ? 0 : 1,
                                        transitionDuration: isClicked ? "700ms" : "500ms",
                                    }}
                                />
                                <ArrowUpRight
                                    className="size-8 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-10"
                                    style={{
                                        transform: isClicked
                                            ? "translate(100px, -100px) scale(0.5)"
                                            : isHovered
                                                ? "translate(2px, -2px)"
                                                : "translate(0, 0)",
                                        opacity: isClicked ? 0 : 1,
                                        color: isHovered && !isClicked ? "var(--background)" : "var(--foreground)",
                                        transitionDuration: isClicked ? "600ms" : "500ms",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
                            <div
                                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                                style={{
                                    transform: isClicked ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                    opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                                }}
                            />
                        </div>
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
                            <div
                                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                                style={{
                                    transform: isClicked ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                    opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-6 text-center">
                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            Actively seeking opportunities in AI and software engineering. Open to discussing roles where I can contribute, learn, and deliver real impact.                        </p>
                        <span className="text-base tracking-widest uppercase text-muted-foreground/60 md:text-lg">sanufalahi5034@gmail.com</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
