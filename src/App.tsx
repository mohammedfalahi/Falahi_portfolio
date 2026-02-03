import { HeroSection } from '@/components/ui/hero-section'
import { MinimalistHero } from '@/components/ui/minimalist-hero'
import { AboutMe } from '@/components/ui/about-me'
import { ProjectShowcase } from '@/components/ui/project-showcase'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import { Blog7 } from '@/components/ui/blog7'
import { LetsWorkTogether } from '@/components/ui/lets-work-section'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { Linkedin, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

function App() {
  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'BLOG', href: '#blog' },
    { label: 'CONTACT', href: '#contact' },
  ]

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammed-falahi' },
    { icon: Github, href: 'https://github.com/mohammedfalahi' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with BackgroundPaths */}
      <section id="hero" className="relative">
        <HeroSection>
          <AnimatedGridPattern
            numSquares={25}
            maxOpacity={0.1}
            duration={4}
            repeatDelay={1.5}
            className={cn(
              "z-0 fill-gray-300/40 stroke-gray-300/40 dark:fill-gray-600/40 dark:stroke-gray-600/40",
              "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
            )}
          />
          <MinimalistHero
            logoText="MOHAMMED FALAHI"
            navLinks={navLinks}
            heading="AI Based Software Engineer"
            description="I build intelligent systems, clean interfaces, and scalable products that solve real problems."
            readMoreLink="#about"
            imageSrc="/portrait-placeholder.png"
            imageAlt="Professional portrait"
            overlayText={{
              part1: 'less is',
              part2: 'more.',
            }}
            socialLinks={socialLinks}
            locationText="Dubai, UAE"
          />
        </HeroSection>
      </section>

      {/* About Section */}
      <section id="about" className="relative">
        <HeroSection>
          <AnimatedGridPattern
            numSquares={25}
            maxOpacity={0.1}
            duration={4}
            repeatDelay={1.5}
            className={cn(
              "z-0 fill-gray-300/40 stroke-gray-300/40 dark:fill-gray-600/40 dark:stroke-gray-600/40",
              "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
            )}
          />
          <AboutMe cvDownloadLink="/Mohammed_Falahi_CV.pdf" />
        </HeroSection>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <ProjectShowcase />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 py-32">
        <AnimatedGridPattern
          numSquares={35}
          maxOpacity={0.12}
          duration={3}
          repeatDelay={1}
          className={cn(
            "z-0 fill-neutral-300/40 stroke-neutral-300/40 dark:fill-neutral-700/40 dark:stroke-neutral-700/40",
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          )}
        />
        <div className="w-full max-w-7xl px-8 mb-20 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black dark:text-white">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Explore a curated selection of my recent work, showcasing innovative solutions and creative design across various domains.
          </p>
        </div>

        <div className="w-full flex items-center justify-center px-4 md:px-8 lg:px-12">
          <CircularTestimonials
            testimonials={[
              {
                quote:
                  "Bilingual AI sales assistant for gadget retail built using RAG, LangChain, and Gemini LLMs. Implemented intent detection, entity extraction, fallback logic, and knowledge-grounded retrieval to reduce hallucinations and improve response accuracy. Voice interfaces with MongoDB and REST APIs.",
                name: "MyG Sales Assistant",
                designation: "AI & LLM Engineering · Boehm Tech LLP",
                src: "/project_images/myg.png",
              },
              {
                quote:
                  "AI-powered video-to-presentation system that converts raw video content into structured PowerPoint decks and PDF summaries. Implemented speech-to-text, NLP-based summarization, and computer vision extraction within a scalable pipeline for academic and training content reuse.",
                name: "vidScribe",
                designation: "Applied AI · NLP & Computer Vision",
                src: "/project_images/vidscribe.png",
              },
              {
                quote:
                  "AI-driven workforce management and productivity analytics platform built using FastAPI, MongoDB, React, and Electron. Processed raw activity logs into daily and monthly intelligence dashboards and integrated LLaMA-3 and Groq LLMs for automated performance summaries.",
                name: "Payroll",
                designation: "Full-Stack AI Systems",
                src: "/project_images/payroll.png",
              },
              {
                quote:
                  "Agentic AI communication system that autonomously initiates phone calls and SMS notifications to parents for attendance and academic alerts. Implemented decision-driven agents for channel selection, context-aware message generation, retry handling, and workflow automation using LLMs.",
                name: "VidyaConnect",
                designation: "Agentic AI Systems",
                src: "/project_images/vidhyaconnect.png",
              },
              {
                quote:
                  "Machine learning–based workforce task assignment system using BERT for skill matching and semantic similarity. Built NLP pipelines for decision automation and backend services using Python and Flask to support intelligent workforce allocation.",
                name: "Seva Kraant",
                designation: "Machine Learning & NLP",
                src: "/project_images/seva.png",
              },
            ]}
            autoplay={true}
            colors={{
              name: "#0a0a0a",
              designation: "#6b7280",
              testimony: "#374151",
              arrowBackground: "#000000",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#3b82f6",
            }}
            fontSizes={{
              name: "32px",
              designation: "18px",
              quote: "18px",
            }}
          />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.12}
          duration={3.5}
          repeatDelay={1.2}
          className={cn(
            "z-0 fill-gray-300/40 stroke-gray-300/40 dark:fill-gray-600/40 dark:stroke-gray-600/40",
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          )}
        />
        <Blog7
          tagline="Latest Insights"
          heading="Blog Posts"
          description="Explore my thoughts on web development, design trends, and technology. Stay updated with tutorials, tips, and industry insights."
          posts={[
            {
              id: "post-1",
              title: "What's Next in AI: 7 Trends to Watch in 2026",
              summary:
                "Discover the seven pivotal AI trends shaping 2026, from AI-augmented workforces to hyper-personalized skill development and how they impact daily life.",
              label: "Future Trends",
              author: "Microsoft Source",
              published: "3 Feb 2026",
              url: "https://news.microsoft.com/source/features/ai/whats-next-in-ai-7-trends-to-watch-in-2026/",
              image: "/blog_images/ai_trend.png",
            },
            {
              id: "post-2",
              title: "Genie 3: A New Frontier for World Models",
              summary:
                "Explore Genie 3, Google DeepMind's latest breakthrough. Learn how this new world model simulates interactive environments and advances generative AI.",
              label: "Research",
              author: "Google DeepMind",
              published: "3 Feb 2026",
              url: "https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/",
              image: "/blog_images/genie_ai.png",
            },
            {
              id: "post-3",
              title: "Introducing the Codex App",
              summary:
                "OpenAI brings the power of coding to mobile. See how the new Codex App allows developers to build simple games and applications directly from their phones.",
              label: "Product Launch",
              author: "OpenAI",
              published: "3 Feb 2026",
              url: "https://openai.com/index/introducing-the-codex-app/",
              image: "/blog_images/open_ai.png",
            },
          ]}
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <AnimatedGridPattern
          numSquares={25}
          maxOpacity={0.1}
          duration={4}
          repeatDelay={1.5}
          className={cn(
            "z-0 fill-gray-300/40 stroke-gray-300/40 dark:fill-gray-600/40 dark:stroke-gray-600/40",
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          )}
        />
        <LetsWorkTogether />
      </section>
    </div>
  )
}

export default App
