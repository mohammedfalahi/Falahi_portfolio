export type Project = {
  slug: string
  title: string
  metric?: { value: string; caption: string }
  summary: string
  tags: string[]
  repo?: string
  featured: boolean
}
export type Role = {
  org: string
  title: string
  place: string
  start: string
  end: string
  points: string[]
}
export type SkillGroup = { name: string; items: string[] }

const gh = (slug: string) => `https://github.com/mohammedfalahi/${slug}`

export const profile = {
  name: 'Mohammed Falahi',
  intro: 'AI/ML engineer. I build agents, RAG systems and automations that show where their answers come from.',
  meta: 'Bengaluru, India. Open to roles across India and the UAE. Available now.',
  /** Typeset into the hero portrait. Every phrase is from the CV. */
  portraitText:
    'AI/ML engineer with 2+ years of experience building intelligent applications across machine learning, deep learning, Generative AI and business automation. RAG, LLM APIs, AI agents, LangChain, LangGraph, AutoGen, LlamaIndex, n8n, Gemini, Claude, LLaMA, AWS Bedrock, PostgreSQL/pgvector, MongoDB, Supabase, FastAPI, Flask, Docker, Langfuse. 92% intent-recognition accuracy across 500+ queries. 35% reduction in hallucinations. 240+ posts/month for 8 clients. 30% more accurate forecasting. ',
  location: 'Bengaluru, India' as const,
  email: 'falahi@mohammedfalahi.in',
  phone: '+91 95672 45034',
  github: 'https://github.com/mohammedfalahi',
  linkedin: 'https://linkedin.com/in/mohammedfalahi',
  cv: '/Mohammed_Falahi_CV.pdf' as const,
}

export const skills: SkillGroup[] = [
  {
    name: 'Generative AI & agents',
    items: ['LangChain', 'LangGraph', 'LlamaIndex', 'AutoGen', 'n8n', 'Gemini', 'Claude', 'Llama', 'Bedrock', 'Vertex AI'],
  },
  {
    name: 'Machine learning',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost'],
  },
  {
    name: 'Data & retrieval',
    items: ['PostgreSQL + pgvector', 'MongoDB', 'Supabase', 'Pandas'],
  },
  {
    name: 'Backend & cloud',
    items: ['Python', 'FastAPI', 'Flask', 'Docker', 'AWS', 'GCP', 'Azure', 'Langfuse', 'Go', 'React'],
  },
]

export const experience: Role[] = [
  {
    org: 'Wisermonks',
    title: 'Artificial Intelligence Engineer',
    place: 'Dubai, UAE (remote)',
    start: 'Jan 2026',
    end: 'Aug 2026',
    points: [
      'Designed and deployed agentic AI applications and LLM automation workflows for UAE business operations.',
      'Built an appointment-booking assistant with n8n, LangChain, Gemini, Chatwoot and Google Calendar, with a persistent 20-turn memory and message filters that prevent bot loops.',
      'Architected a multi-client content pipeline for 8 clients, designed for 240+ posts/month, with brand PDFs, Supabase and Telegram approval and revision workflows.',
    ],
  },
  {
    org: 'Boehm Tech LLP',
    title: 'AI Engineer (R&D)',
    place: 'Kozhikode, India',
    start: 'Jan 2025',
    end: 'Dec 2025',
    points: [
      'Built a bilingual, voice-enabled sales assistant with RAG, LangChain, Gemini and MongoDB: 92% intent-recognition accuracy across 500+ unique queries and about 35% fewer hallucinations through grounded retrieval.',
      'Engineered an LSTM–XGBoost medicine-demand forecasting pipeline that was 30% more accurate than moving-average methods.',
    ],
  },
  {
    org: 'Boehm Tech LLP',
    title: 'AI Specialist (R&D) Intern',
    place: 'Kozhikode, India',
    start: 'Sep 2024',
    end: 'Dec 2024',
    points: [
      'Supported applied AI experimentation, data preparation, model development and evaluation, then progressed into an employee AI Engineer role.',
    ],
  },
]

export const freelance: Role[] = [
  {
    org: 'Drytis Inc.',
    title: 'AI Engineer (contract)',
    place: 'Remote',
    start: 'Aug 2026',
    end: 'Present',
    points: ['Client-focused AI applications, API integration and automation workflows.'],
  },
  {
    org: 'Careerflow.ai',
    title: 'AI Benchmark / OSWorld Task Creator',
    place: 'Remote',
    start: 'Sep 2026',
    end: 'Present',
    points: ['Computer-use benchmark tasks, with supporting assets and reproducible environments, for evaluating AI agents.'],
  },
]

export const education: Role = {
  org: 'MES College of Engineering',
  title: 'B.Tech, Artificial Intelligence & Data Science',
  place: 'Kuttippuram, Kerala, India',
  start: 'Sep 2021',
  end: 'May 2025',
  points: ['Coursework: Machine Learning, Deep Learning, Data Science, Algorithms, Artificial Intelligence.'],
}

export const projects: Project[] = [
  {
    slug: 'agentic-content-pipeline',
    title: 'Agentic Content Production Pipeline',
    metric: { value: '240+', caption: 'posts/month, designed for 8 clients' },
    summary:
      'Five phases from onboarding and brand intelligence to calendars, Telegram approvals and multi-format content.',
    tags: ['n8n', 'Supabase', 'Gemini', 'Firecrawl', 'Telegram'],
    repo: gh('agentic-content-pipeline'),
    featured: true,
  },
  {
    slug: 'dev-ai',
    title: 'CallOps',
    summary:
      'Grounded incident diagnosis: pgvector and full-text search, an approval gate on mutating commands, and Langfuse tracing.',
    tags: ['FastAPI', 'PostgreSQL', 'pgvector', 'Vertex AI', 'Langfuse'],
    repo: gh('dev-ai'),
    featured: true,
  },
  {
    slug: 'enterprise-rag-chatbot',
    title: 'Enterprise RAG Chatbot',
    metric: { value: '0.0%', caption: 'permission leakage across 166 tests' },
    summary: 'Multi-tenant knowledge assistant with access control enforced in the database, hybrid search and reranking.',
    tags: ['FastAPI', 'pgvector', 'Next.js'],
    repo: gh('enterprise-rag-chatbot'),
    featured: true,
  },
  {
    slug: 'myg_assistant',
    title: 'MyG Sales Assistant',
    metric: { value: '92%', caption: 'intent accuracy, ~35% fewer hallucinations' },
    summary: 'A bilingual, voice-enabled sales assistant grounded in product retrieval.',
    tags: ['RAG', 'LangChain', 'Gemini', 'MongoDB'],
    repo: gh('myg_assistant'),
    featured: true,
  },
  {
    slug: 'Vidscribe-finalised',
    title: 'VidScribe',
    metric: { value: '1-hour', caption: 'lecture turned into slides in under 5 minutes' },
    summary: 'Turns a video into a PowerPoint deck and PDF summary using speech recognition, NLP and frame extraction.',
    tags: ['Speech recognition', 'NLP', 'Computer vision'],
    repo: gh('Vidscribe-finalised'),
    featured: true,
  },
  {
    slug: 'agent-sfx',
    title: 'Agent SFX',
    summary: 'Open-source sound feedback for Claude Code and Gemini CLI, written in Go.',
    tags: ['Go', 'Claude Code', 'Gemini CLI', 'Open source'],
    repo: gh('agent-sfx'),
    featured: true,
  },
  {
    slug: 'system-arch-ai',
    title: 'System Arch AI',
    summary: 'Turns natural-language requirements into executable LangChain workflows, deployed on AWS with Amazon Bedrock.',
    tags: ['Streamlit', 'LangChain', 'Bedrock'],
    repo: gh('system_arch_ai'),
    featured: false,
  },
  {
    slug: 'job-buddy',
    title: 'Job Buddy',
    summary: 'A job-matching pipeline with weighted skill scoring and daily Telegram reports.',
    tags: ['Python', 'Telegram'],
    repo: gh('job-buddy'),
    featured: false,
  },
  {
    slug: 'a1-website-assistant',
    title: 'Grounded product assistant (Cavli A1/A2)',
    summary: "Customer-facing assistant for cellular IoT modules that answers only from approved documents and removes any claim its sources don't support.",
    tags: ['RAG', 'BM25', 'Evaluation'],
    repo: gh('a1-website-assistant'),
    featured: false,
  },
  {
    slug: 'ai-competitor-intelligence-engine',
    title: 'Competitor Intelligence Engine',
    summary: 'Automated competitor intelligence that gathers and summarises rival activity using n8n, Gemini, Apify and Firecrawl.',
    tags: ['n8n', 'Gemini', 'Firecrawl'],
    repo: gh('ai-competitor-intelligence-engine'),
    featured: false,
  },
  {
    slug: 'signalforge',
    title: 'SignalForge',
    summary: 'ML lifecycle and revenue intelligence, built during the Wisermonks period.',
    tags: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Docker', 'FastAPI'],
    featured: false,
  },
  {
    slug: 'payroll',
    title: 'Payroll',
    summary: 'Workforce analytics with LLaMA/Groq performance summaries and LLM-as-Judge evaluation.',
    tags: ['FastAPI', 'MongoDB', 'React', 'Electron'],
    featured: false,
  },
  {
    slug: 'vidyaconnect',
    title: 'VidyaConnect',
    summary: 'An agentic attendance-notification system using phone calls, SMS, planning, reflection and intelligent retry handling.',
    tags: ['Agents', 'Planning'],
    featured: false,
  },
  {
    slug: 'workflowai',
    title: 'WorkflowAI',
    summary: 'Turns plain-English business requirements into executable Python workflows using a multi-agent architecture with validation and a live execution dashboard.',
    tags: ['Multi-agent', 'Python'],
    featured: false,
  },
  {
    slug: 'seva-kraant',
    title: 'Seva Kraant',
    summary: 'BERT-based semantic skill matching for workforce assignment.',
    tags: ['BERT', 'NLP'],
    repo: gh('AI-FOR-PERSONALIZED-TASK-ASSIGNMENTS-IN-CIVIL-ENGINEERING'),
    featured: false,
  },
  {
    slug: 'traffic-sign-detection',
    title: 'Traffic Sign Detection',
    summary: 'CNN-based traffic sign recognition with data augmentation and real-time inference on live video.',
    tags: ['TensorFlow', 'OpenCV', 'CNN'],
    repo: gh('TRAFFIC-SIGN-BOARD-DETECTION'),
    featured: false,
  },
]

export const certifications: { name: string; issuer: string }[] = [
  { name: 'Oracle Certified Foundations Associate: Agentic AI', issuer: 'Oracle' },
  { name: 'One Million Prompters', issuer: 'Dubai Future Foundation' },
  { name: 'AWS Cloud Practitioner Essentials', issuer: 'AWS' },
  { name: 'Big Data Analytics', issuer: 'Great Learning' },
  { name: 'Accessing Hadoop Data Using Hive', issuer: 'IBM' },
  { name: 'Google Analytics', issuer: 'Google' },
]
