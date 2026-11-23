# Portfolio redesign — design

Date: 2026-11-23 · Repo: `mohammedfalahi/Falahi_portfolio` (Vite + React 19 + Tailwind 3, deployed on Vercel)

## Intent

Mohammed is looking for AI engineering roles, **primarily in India** (he is job hunting there now), and also in the UAE. The portfolio's reader is a **recruiter or hiring manager**, who usually spends about 30 seconds on it and needs to come away knowing three things:

1. He is an AI/ML engineer with 2+ years of experience. His work covers agentic AI, RAG, LLM applications, ML forecasting and computer vision.
2. He has built real, non-trivial systems, with evidence for each.
3. Where to get his CV and how to contact him.

The current site mixes several unrelated UI components (animated grid, "less is more" hero, Spline robot, a rotating carousel), which makes it look like a template. It also leaves out his strongest recent work. The redesign should look professional and visually striking, but clearly made by one person, not generated.

## Goals

- Show recruiters within a few seconds who he is, what he builds, his location and availability, and how to get his CV.
- Give the site the section variety of developerFolio (intro animation, dark mode, tech-stack icons, experience cards, projects, achievements, contact) in an original design.
- Add his newest projects and lead each with a concrete result.
- Keep it a static site. Nothing is fetched at runtime, no GitHub token is needed, and deployment on Vercel stays unchanged.

## Non-goals

- A separate page for each project (possible later).
- A CMS, or project data pulled from GitHub automatically.
- Turning the site into a blog.

## Anti-goals (it fails if…)

- It looks like a template or like generic AI output: identical cards with gradient washes, effects everywhere, cream background with a serif and terracotta.
- The animations slow down the first read or keep the CTA from showing. The CV and contact buttons must be visible and clickable before the animations finish.
- It overclaims. Every title, date and number must match his current CVs (Oct 2026 versions in `~/Downloads/Falahi*AI*ML*.pdf`) or the project READMEs.
- It copies developerFolio code. That repo is GPL-3.0, and copying would put this repo under the GPL too. Its ideas are fine to reuse; its code is not.
- It looks broken on a phone. Many recruiters open links from LinkedIn on mobile.

## Constraints

- Stay on the existing stack: Vite, React 19, TypeScript, Tailwind 3, framer-motion (already a dependency). `lucide-react` can stay for icons.
- Keep Formspree for the contact form (`https://formspree.io/f/xjgopddo`).
- Replace `public/Mohammed_Falahi_CV.pdf` with the India CV (`Falahi_AI:ML-Engineer-.pdf`, Bengaluru, +91). Keep the favicon, the portrait images and the project images.
- Respect `prefers-reduced-motion`. When it's set, skip the splash and show the terminal fully, without animation.

## Approaches considered

1. **Rebuild in place on the current stack (chosen).** Same repo and deployment; replace the component mix with one consistent design system. This is the fastest route to a coherent site, and Vercel needs no changes.
2. **Move to Next.js with a case-study page per project.** More depth and better search ranking, but roughly twice the work and a different build. Recruiters rarely click through to detail pages.
3. **Keep the current components and update only the content.** Cheapest, but it doesn't fix the generic look.

The user chose option 1, and reviewed visual directions in the browser. The user rejected "B · Index" (navy/saffron editorial) and chose "A · Evidence trail", then asked for developerFolio-style section variety on top of it. The approved mockup is `.superpowers/brainstorm/*/content/folio-direction-v3.html`.

## Decided design

### Visual system

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#EDF0F3` cool paper | `#0D1422` |
| `--card` | `#FFFFFF` | `#152036` |
| `--ink` | `#121B2E` | `#E8ECF3` |
| `--mute` | `#5A6577` | `#93A0B5` |
| `--rule` | `#D5DBE3` | `#24324A` |
| `--acc` (cobalt, the only accent) | `#2D4BF0` | `#7C93FF` |
| `--ok` (only for "verified" in the terminal) | `#1F8A5B` | `#4CC38A` |
| `--term` (terminal background) | `#0E1626` | `#070C16` |

- **Type:** Schibsted Grotesk (400–800) for everything. JetBrains Mono only inside the terminal and splash. Both load from Google Fonts. Headlines are tight (letter-spacing about −0.035em, weight 800). Text is in sentence case, with no all-caps eyebrow labels.
- **Layout:** left-aligned, max width about 1120px, consistent section padding. Cards have a 14px radius and a single 1px border. Hover adds a small lift and an accent border. No drop shadows except on the terminal.
- **Dark mode:** a toggle in the nav. It starts from `prefers-color-scheme`, saves the choice to `localStorage` (wrapped in try/catch), and sets `class="dark"` on `<html>`. Tailwind `darkMode: 'class'`.

### Motion

The site has one main animated moment: the splash followed by the terminal. Everything else stays restrained.
- **Splash** (about 2 seconds, once per session via `sessionStorage`): `mohammed.falahi` types out in mono on the terminal colour, then fades away. A click skips it. It is skipped when reduced motion is set.
- **Terminal in the top section:** lines appear one after another, like commands being run. The first is a RAG question that ends in a verified, cited answer. The second is an `oncall investigate` that ends with "root cause hypothesis in 41s". A small replay control sits at the bottom of the terminal. The commands and outputs are drawn from his real projects.
- **Sections:** a single short reveal when a section scrolls into view (opacity plus about 12px, once). No staggered effects on every element.
- **Hover:** cards lift; tech chips lift by 3px.

### Sections (in page order)

1. **Nav:** name on the left; links to About, Skills, Experience, Projects and Contact; a dark mode toggle. On mobile the links collapse into a menu button. The nav stays fixed at the top and gets a background once the page scrolls.
2. **Top section:** the headline "I build AI systems that show their sources." The line under it reads: "AI/ML engineer with 2+ years building agentic systems, RAG and LLM automations. Based in Bengaluru, open to roles across India and the UAE, available immediately." Buttons are **Download CV** (primary) and **Email me**. Below them are GitHub and LinkedIn links. The animated terminal sits on the right (below the text on mobile).
3. **About:** the portrait (`/about-portrait.png`) plus three or four sentences drawn from the new CV summaries. Facts row: 2+ years · B.Tech AI & Data Science (2025) · Bengaluru, open to India & UAE · Languages: English, Malayalam, Hindi, Arabic (basic).
4. **What I work with:** tech chips grouped into Generative AI & agents (LangChain, LangGraph, LlamaIndex, AutoGen, n8n, Gemini, Claude, Llama, Bedrock, Vertex AI), ML (PyTorch, TensorFlow, scikit-learn, XGBoost), Data & retrieval (PostgreSQL/pgvector, MongoDB, Supabase, Pandas), and Backend & cloud (Python, FastAPI, Flask, Docker, AWS, GCP, Azure, Langfuse, Go, React). Icons come from Devicon on jsDelivr (pinned to `devicon@2.16.0`); a chip shows text only when no icon exists. The contents come from the CV's skills list and the stacks used in his projects.
5. **Experience & education:** a vertical timeline of cards, each with a coloured banner and an initial-letter badge, newest first.
   - **Wisermonks** (Dubai, remote), Artificial Intelligence Engineer, Jan–Aug 2026: appointment-booking assistant (n8n, LangChain, Gemini, Chatwoot, Google Calendar, 20-turn memory, bot-loop filters); multi-client content pipeline (8 clients, 240+ posts/month, Telegram approvals).
   - **Boehm Tech LLP** (Kozhikode), AI Engineer (R&D), Jan–Dec 2025: bilingual voice sales assistant (92% intent accuracy across 500+ queries, ~35% fewer hallucinations); LSTM–XGBoost medicine-demand forecasting (30% more accurate than moving-average methods).
   - **Boehm Tech LLP**, AI Specialist (R&D) Intern, Sep–Dec 2024.
   - **Additional experience (freelance)**, a smaller, lighter group under the main timeline:
     - **Drytis Inc.**, AI Engineer (contract, remote), Aug 2026–present: AI applications, API integration, automation workflows.
     - **Careerflow.ai**, AI Benchmark / OSWorld Task Creator, Sep 2026–present: computer-use benchmark tasks for evaluating AI agents.
   - **Education:** B.Tech, AI & Data Science, MES College of Engineering, Kuttippuram, Sep 2021–May 2025.
6. **Selected projects:** six featured cards in a three-column grid (one column on mobile). Each has a large result figure with a caption, the title, one plain sentence, stack tags and a GitHub link.
   - **Agentic Content Production Pipeline** (`agentic-content-pipeline`): **240+** posts/month for 8 clients, in production
   - **CallOps** (`dev-ai`): grounded incident diagnosis; pgvector + full-text search, approval gate on mutating commands, Langfuse tracing
   - **Enterprise RAG Chatbot** (`enterprise-rag-chatbot`): **0.0%** permission leakage across 166 tests
   - **MyG Sales Assistant** (`myg_assistant`): **92%** intent accuracy, ~35% fewer hallucinations
   - **VidScribe** (`Vidscribe-finalised`): a **1-hour** lecture turned into slides in under 5 minutes
   - **Agent SFX** (`agent-sfx`, Go, open source): sound feedback for Claude Code and Gemini CLI
   - **More projects:** a compact list below: System Arch AI (Bedrock), Job Buddy, grounded product assistant (Cavli A1/A2), Competitor Intelligence Engine, Payroll, VidyaConnect, WorkflowAI, Seva Kraant, Traffic Sign Detection. SignalForge (ML lifecycle & revenue intelligence, Wisermonks period) is listed without a repo link.
7. **Certifications:** Oracle Certified Foundations Associate: Agentic AI (shown first), One Million Prompters (Dubai Future Foundation), AWS Cloud Practitioner Essentials, Big Data Analytics (Great Learning), Accessing Hadoop Data Using Hive (IBM), Google Analytics.
8. **Contact:** "Get in touch", email `falahi@mohammedfalahi.in`, LinkedIn `linkedin.com/in/mohammedfalahi`, location Bengaluru, India, phone +91 95672 45034, and the Formspree form with sending, success and error states.
9. **Footer:** name, year, links, and a back-to-top button that appears after scrolling.

### Content and data

- All content lives in one typed file, `src/data/portfolio.ts`, the way developerFolio's `portfolio.js` does, so future updates mean editing a single file.
- Update `index.html` with the title "Mohammed Falahi — AI/ML Engineer", a meta description, and Open Graph tags that use the portrait. The canonical URL is `https://mohammedfalahi.in`.

## Left to the builder

- How to split components (suggestion: one file per section under `src/sections/`, plus small shared primitives).
- Removing the components and dependencies that are no longer used (`@splinetool/*`, `gsap` if unused, the old `ui/*` components). Delete them only once nothing imports them.
- Exact Devicon slugs, and which chips show text only.
- The mobile menu's exact behaviour.

## Calls I made (for the user to check)

- **Source of truth is the Oct 2026 CVs.** The old CV in `public/` is out of date (it still lists the internship as the only role).
- **Personal details stay off the site:** nationality, date of birth and visa status.
- **On-call Voice is renamed CallOps**, as on the CVs. Its "<60s" figure comes from the README, not the CV, so it isn't used.
- **The six featured projects** lead with figures that appear on the CVs or in the READMEs.
- **The Cavli assistant moves to "more projects"**, since it was an assessment rather than shipped work.

## Resolved with the user

- The forecasting figure is **30%**.
- **India focus:** use the India CV as the download, Bengaluru as the location and the +91 phone number. The UAE is still mentioned as open.
- **SignalForge** is listed without a link.
- The **Blog** section is dropped.
