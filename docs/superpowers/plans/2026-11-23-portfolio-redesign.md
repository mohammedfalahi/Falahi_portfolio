# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current component-collage portfolio with a single-system, recruiter-focused site ("Evidence trail" + developerFolio-style sections), with content taken from the Oct 2026 India CV.

**Architecture:** One typed content file (`src/data/portfolio.ts`) feeds one component per section under `src/sections/`. Theme and motion helpers sit in `src/lib/`. Design tokens are CSS variables in `src/index.css` and are exposed to Tailwind. The site is fully static and Vite-built, so the Vercel deploy is unchanged.

**Tech Stack:** Vite 7, React 19, TypeScript, Tailwind 3 (`darkMode: ["class"]`), framer-motion 12, lucide-react. Tests use Vitest, @testing-library/react and jsdom, all newly added as dev dependencies.

**Spec:** `docs/superpowers/specs/2026-11-23-portfolio-redesign-design.md`

## Global Constraints

- Tokens copied exactly from the spec table: light `--bg #EDF0F3 --card #FFFFFF --ink #121B2E --mute #5A6577 --rule #D5DBE3 --acc #2D4BF0 --ok #1F8A5B --term #0E1626`; dark `#0D1422 #152036 #E8ECF3 #93A0B5 #24324A #7C93FF #4CC38A #070C16`.
- Fonts: Schibsted Grotesk for everything; JetBrains Mono only inside the terminal and splash. Both from Google Fonts in `index.html`.
- Sentence case throughout. No all-caps eyebrow labels, no `→` added to button text, no numbered markers.
- No code copied from developerFolio (GPL-3.0).
- Personal data limited to: name, Bengaluru, India, `falahi@mohammedfalahi.in`, `+91 95672 45034`, LinkedIn, GitHub. No DOB, nationality or visa status.
- All `localStorage` and `sessionStorage` access goes through try/catch helpers.
- `prefers-reduced-motion: reduce` means no splash, the terminal is shown complete, and there are no reveals.
- Devicon URLs pinned: `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/<slug>/<slug>-original.svg`.
- Formspree endpoint stays `https://formspree.io/f/xjgopddo`.

## Review Focus

1. **Storage blocked** (Safari private mode, or cookies disabled): theme and splash still work and nothing throws. Tested in Task 2.
2. **Recruiter clicks immediately:** the splash must never hold the CTA hostage. It lasts at most 1.6s and is dismissed by any click or key. Tested in Task 3.
3. **Reduced motion:** the full terminal output is visible right away and the splash never mounts. Tested in Task 3.
4. **Contact form fails** (offline, or Formspree returns non-2xx): show an error message that includes the email address. Never show success. Tested in Task 5.
5. **Narrow phones (320px) and a failed Devicon load:** no horizontal scroll, and a chip falls back to text only. The fallback is tested in Task 4; the width is checked in Task 7.

---

### Task 1: Tooling, tokens and content data

**Files:**
- Modify: `package.json` (devDeps `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`; script `"test": "vitest run"`), `vite.config.ts` (`test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', globals: true }`), `tailwind.config.js`, `src/index.css`, `index.html`
- Create: `src/test/setup.ts`, `src/data/portfolio.ts`, `src/data/portfolio.test.ts`
- Replace: `public/Mohammed_Falahi_CV.pdf` ← `~/Downloads/Falahi_AI:ML-Engineer-.pdf`

**Interfaces — Produces:**
```ts
export type Project = { slug: string; title: string; metric?: { value: string; caption: string };
  summary: string; tags: string[]; repo?: string; image?: string; featured: boolean };
export type Role = { org: string; title: string; place: string; start: string; end: string;
  points: string[]; accent: string /* css color */ };
export type SkillGroup = { name: string; items: { label: string; icon?: string /* devicon slug */ }[] };
export type TerminalLine = { kind: 'cmd' | 'dim' | 'ok' | 'out'; text: string; cite?: string[] };
export const profile: { name; headline; lede; location: 'Bengaluru, India'; email; phone; github; linkedin; cv: '/Mohammed_Falahi_CV.pdf'; about: string[]; facts: string[] };
export const terminal: TerminalLine[]; export const skills: SkillGroup[];
export const experience: Role[]; export const freelance: Role[]; export const education: Role; export const projects: Project[];
export const certifications: { name: string; issuer: string }[];
```
Tailwind colours: `bg, card, ink, mute, rule, acc, ok, term` → `var(--x)`. Font families: `sans: ['Schibsted Grotesk', ...]` and `mono: ['JetBrains Mono', ...]`.

- [ ] **Step 1: Install the test deps and write `src/data/portfolio.test.ts`**
```ts
test('featured projects are the six from the spec, in order', () =>
  expect(projects.filter(p => p.featured).map(p => p.slug)).toEqual(
    ['agentic-content-pipeline','dev-ai','enterprise-rag-chatbot','myg_assistant','Vidscribe-finalised','agent-sfx']));
test('every repo link points at the user account', () =>
  projects.filter(p => p.repo).forEach(p => expect(p.repo).toMatch(/^https:\/\/github\.com\/mohammedfalahi\//)));
test('signalforge has no repo', () => expect(projects.find(p => p.slug==='signalforge')?.repo).toBeUndefined());
test('figures match the CV', () => {
  const m = Object.fromEntries(projects.filter(p=>p.metric).map(p => [p.slug, p.metric!.value]));
  expect(m).toMatchObject({ 'agentic-content-pipeline':'240+', 'enterprise-rag-chatbot':'0.0%', 'myg_assistant':'92%' });
  expect(JSON.stringify(experience)).toContain('30%');
});
test('experience is newest first', () =>
  expect(experience.map(r=>r.org)).toEqual(['Wisermonks','Boehm Tech LLP','Boehm Tech LLP']));
test('freelance roles are separate', () =>
  expect(freelance.map(r=>r.org)).toEqual(['Drytis Inc.','Careerflow.ai']));
test('india contact details, no excluded personal data', () => {
  expect(profile).toMatchObject({ location:'Bengaluru, India', email:'falahi@mohammedfalahi.in', phone:'+91 95672 45034' });
  expect(JSON.stringify({profile,experience})).not.toMatch(/nationality|date of birth|visa|CGPA/i);
});
```
- [ ] **Step 2: Run `npm test`.** Expected: FAIL, module not found.
- [ ] **Step 3: Write `src/data/portfolio.ts`.** Use the content from the spec's Sections 2–8 verbatim where the spec gives copy. Use the More-projects list from the spec. Terminal lines come from the approved mockup (`rag ask "Which module supports GNSS?"` … `oncall investigate --alert checkout-5xx` … `✓ root cause hypothesis in 41s · calling on-call engineer`).
- [ ] **Step 4: Add tokens, fonts and Tailwind mapping.** In `index.css`, replace the shadcn HSL variables with the spec tokens under `:root` and `.dark`, and set `body { background: var(--bg); color: var(--ink); font-family: theme(fontFamily.sans) }`. In `index.html`, add the title "Mohammed Falahi — AI/ML Engineer", a meta description, `og:title`, `og:description`, `og:image=/about-portrait.png`, `link rel=canonical href=https://mohammedfalahi.in`, and the Google Fonts link. Add an inline script in `<head>` that sets `.dark` from storage or `prefers-color-scheme` before first paint, wrapped in try/catch.
- [ ] **Step 5: Run `npm test`.** Expected: PASS (7).
- [ ] **Step 6: Commit** `feat: content data, design tokens and test setup`

### Task 2: Theme and motion helpers

**Files:** Create `src/lib/storage.ts`, `src/lib/theme.ts`, `src/lib/theme.test.ts`

**Interfaces — Produces:**
`safeGet(store: 'local'|'session', key: string): string | null`, `safeSet(store, key, value): void` (both never throw).
`getInitialTheme(): 'light'|'dark'` (stored value, else `matchMedia('(prefers-color-scheme: dark)')`).
`applyTheme(t: 'light'|'dark'): void` (toggles `document.documentElement.classList` `dark` and saves under key `theme`).
`useTheme(): [theme, toggle: () => void]`.

- [ ] **Step 1: Write the tests.** (a) When the `localStorage` getter throws, `getInitialTheme()` returns the media-query value. (b) When `setItem` throws, `applyTheme('dark')` still adds the `dark` class. (c) A stored `'light'` beats a dark media query.
- [ ] **Step 2: Run `npm test -- theme`.** Expected: FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: safe storage and theme helpers`

### Task 3: Splash, nav and hero terminal

**Files:** Create `src/sections/Splash.tsx`, `src/sections/Nav.tsx`, `src/sections/Hero.tsx`, `src/components/Terminal.tsx`, `src/sections/hero.test.tsx`

**Interfaces:**
- Consumes: `profile`, `terminal`, `useTheme`, `safeGet`/`safeSet`.
- Produces: `<Splash onDone={() => void} />`; `<Terminal lines={TerminalLine[]} />`; `<Nav />`; `<Hero />`.

Behaviour:
- **Splash:** shows only when `safeGet('session','splash-seen')` is null and reduced motion is off. It types `mohammed.falahi`, fades out, and calls `onDone` within **1.6s**. Any `pointerdown` or `keydown` ends it at once. It sets `splash-seen`.
- **Terminal:** reveals lines with framer-motion every 600ms after the splash, and has a "Replay" button. With reduced motion, all lines render immediately.
- **Nav:** fixed at the top, with a background once `scrollY > 8`. Links go to `#about #skills #experience #projects #contact`. On screens under `md`, they move into a menu button. Includes the theme toggle (`aria-label="Switch to dark mode"` / `"…light mode"`).
- **Hero:** headline "I build AI systems that show their sources.", the lede from `profile`, a **Download CV** link (`href=profile.cv`, `download`), **Email me** (`mailto:`), and GitHub and LinkedIn links.

- [ ] **Step 1: Write the tests.** (a) With reduced motion mocked on, Splash renders nothing and every terminal line text is in the document. (b) With reduced motion off, after `fireEvent.keyDown(window)` the `onDone` mock is called once. (c) With `sessionStorage` throwing, Splash still calls `onDone` within the 1.6s timer (`vi.advanceTimersByTime(1600)`). (d) The Download CV link has `href="/Mohammed_Falahi_CV.pdf"` and a `download` attribute.
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement.** Use the mockup `folio-direction-v3.html` as the visual reference.
- [ ] **Step 4: Run.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: splash, nav and hero terminal`

### Task 4: About, skills and experience

**Files:** Create `src/sections/About.tsx`, `src/sections/Skills.tsx`, `src/sections/Experience.tsx`, `src/components/Reveal.tsx`, `src/sections/middle.test.tsx`

**Interfaces — Produces:** `<Reveal>` (a single fade with a 12px rise when the section enters the viewport, run once; with reduced motion it renders children only).

Experience is a vertical timeline in the order of `experience`. Below it is an "Additional experience (freelance)" group of compact cards from `freelance`, then the education card. Each card has a banner in `role.accent` and an initial-letter badge.

- [ ] **Step 1: Write the tests.** (a) Experience renders Wisermonks, then Boehm ×2, then the heading "Additional experience (freelance)" followed by Drytis Inc. and Careerflow.ai, and "MES College of Engineering" last. (b) A Skills chip whose `<img>` fires `error` hides the image and keeps the label text. (c) About renders `profile.facts`.
- [ ] **Step 2: Run.** Expected: FAIL. **Step 3: Implement.** **Step 4: Run.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: about, skills and experience sections`

### Task 5: Projects, certifications, contact and footer

**Files:** Create `src/sections/Projects.tsx`, `src/sections/Certifications.tsx`, `src/sections/Contact.tsx`, `src/sections/Footer.tsx`, `src/sections/end.test.tsx`

Behaviour:
- **Projects:** featured cards in a 3/2/1-column grid. Each shows the metric value large, its caption, the title, the summary, tags, and "View code on GitHub" (when `repo` is set). "More projects" is a compact list, with the image where `image` is set.
- **Contact:** fields for name, email and message, which POST JSON to Formspree. The states are `idle | sending | sent | error`. The error text is "Message not sent. Email me directly at falahi@mohammedfalahi.in."
- **Footer:** shows © year and the links. A back-to-top button appears when `scrollY > 600`.

- [ ] **Step 1: Write the tests.** (a) When `fetch` rejects, the error text appears and "Message sent" doesn't. (b) When `fetch` resolves `{ok:false}`, the same error appears. (c) When `fetch` resolves `{ok:true}`, "Message sent" appears and the fields clear. (d) The SignalForge entry has no link inside it. (e) Certifications lists "Oracle Certified Foundations Associate: Agentic AI" first.
- [ ] **Step 2: Run.** Expected: FAIL. **Step 3: Implement.** **Step 4: Run.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: projects, certifications, contact and footer`

### Task 6: Assemble and remove the old site

**Files:** Rewrite `src/App.tsx`. Delete `src/App.css`, `src/components/ui/*` and `src/assets/react.svg`, plus any of `src/lib/utils.ts` that is unused. Delete `public/portrait-placeholder.png`, `public/blog_images/`, `public/skill_images/` and `public/videos/` if nothing references them. In `package.json`, remove `@splinetool/react-spline`, `@splinetool/runtime`, `gsap`, `react-icons`, `@radix-ui/*`, `class-variance-authority` and `tailwindcss-animate` where nothing imports them (also drop that plugin from `tailwind.config.js`).

- [ ] **Step 1: Write `App.tsx`.** Order: Splash → Nav → Hero → About → Skills → Experience → Projects → Certifications → Contact → Footer. Section ids must match the nav anchors.
- [ ] **Step 2: Run `grep -rE "components/ui|splinetool|gsap|react-icons|radix" src`.** Expected: no output. Then `npm uninstall` the unused packages.
- [ ] **Step 3: Run `npm test && npm run lint && npm run build`.** Expected: all pass, and the build writes `dist/`.
- [ ] **Step 4: Commit** `refactor: assemble new site and remove unused components and deps`

### Task 7: Visual verification

- [ ] **Step 1:** Run `npm run dev` through the preview tool. Screenshot the light and dark themes at desktop width (1280) and on mobile (375 and 320).
- [ ] **Step 2:** At 320px, check `document.documentElement.scrollWidth <= innerWidth`. Expected: true.
- [ ] **Step 3:** Critique the screenshots against the spec's anti-goals (generic look, hidden CTA, overclaiming copy) and fix any problems found.
- [ ] **Step 4: Commit** any fixes: `fix: visual polish from review`
