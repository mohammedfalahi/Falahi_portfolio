export type Source = { label: string; quote: string }
export type AskEntry = { id: string; match: RegExp; answer: string; sources: Source[] }

const SKILLS_GENAI =
  'LLM APIs, Gemini, Claude, LLaMA, AWS Bedrock, prompt engineering, chatbots, AI agents, LangChain, LangGraph, AutoGen, LlamaIndex, n8n, tool calling, memory, human-in-the-loop workflows.'
const SKILLS_RETRIEVAL =
  'Retrieval-Augmented Generation (RAG), vector databases, embeddings, semantic search, reranking, PostgreSQL/pgvector, MongoDB, MySQL, Supabase.'

export const suggestions: string[] = [
  'Has he shipped AI to production?',
  'How does he reduce hallucinations?',
  'What does he build with?',
  'How many years of experience?',
  'Can he start in Bengaluru?',
]

export const entries: AskEntry[] = [
  {
    id: 'production',
    match: /production|shipp?ed|ship|deploy|live|real users/i,
    answer:
      'Yes. He personally deployed and maintains a production GenAI content pipeline, from onboarding and brand intelligence to approval and multi-format content[1]. At Wisermonks he also built an appointment assistant with a persistent 20-turn context window and filters that prevent bot loops[2].',
    sources: [
      {
        label: 'CV, Agentic Content Production Pipeline',
        quote:
          'Personally deployed and maintained a production GenAI application spanning onboarding, brand intelligence, calendar generation, approval, and multi-format content production.',
      },
      {
        label: 'CV, Wisermonks',
        quote:
          'Built an appointment assistant with Chatwoot and Google Calendar tool calling, a persistent 20-turn context window, booking/rescheduling/cancellation, and message filters to prevent bot loops.',
      },
    ],
  },
  {
    id: 'hallucinations',
    match: /hallucinat|ground|accura|trust|reliab/i,
    answer:
      'By grounding answers in retrieved data and checking them. His bilingual sales assistant cut hallucinations by about 35% through grounded retrieval and product matching[1]. CallOps cites its evidence and validates commands deterministically, keeping read-only and mutating actions apart[2].',
    sources: [
      {
        label: 'CV, Boehm Tech LLP',
        quote:
          'Achieved 92% intent-recognition accuracy across 500+ unique queries, with an approximately 35% reduction in hallucinations through grounded retrieval and product matching.',
      },
      {
        label: 'CV, CallOps',
        quote:
          'Used Vertex AI embedding and reranking models, evidence citations, and deterministic command validation to ground incident recommendations and separate read-only from mutating actions.',
      },
    ],
  },
  {
    id: 'stack',
    match: /build with|stack|tools|language|framework|tech|python|langchain/i,
    answer:
      'Python first, with LangChain, LangGraph, AutoGen, LlamaIndex and n8n on Gemini, Claude, LLaMA and AWS Bedrock[1]. For retrieval he uses PostgreSQL with pgvector, MongoDB and Supabase[2], and he deploys with FastAPI, Flask and Docker on AWS and Google Cloud[3].',
    sources: [
      { label: 'CV, Technical skills', quote: SKILLS_GENAI },
      { label: 'CV, Technical skills', quote: SKILLS_RETRIEVAL },
      {
        label: 'CV, Technical skills',
        quote:
          'REST APIs, third-party API integration, FastAPI, Flask, Docker, Docker Compose; AWS (EC2, S3, Bedrock), Google Cloud/Vertex AI.',
      },
    ],
  },
  {
    id: 'experience',
    match: /years|experience|senior|how long|career/i,
    answer:
      '2+ years of AI/ML work, including an R&D internship[1]. He was an AI Engineer (R&D) at Boehm Tech LLP through 2025, then an Artificial Intelligence Engineer at Wisermonks from January to August 2026[2].',
    sources: [
      {
        label: 'CV, Summary',
        quote:
          'AI/ML engineer with 2+ years of experience, including an R&D internship, building intelligent applications across machine learning, deep learning, Generative AI, and business automation.',
      },
      {
        label: 'CV, Experience',
        quote: 'Wisermonks (formerly AFSA) Jan 2026 – Aug 2026, Artificial Intelligence Engineer, Dubai, UAE (Remote)',
      },
    ],
  },
  {
    id: 'rag',
    match: /\brag\b|retriev|vector|search|embedding/i,
    answer:
      'Yes. CallOps is a Python and FastAPI RAG system on PostgreSQL 16 with pgvector, HNSW indexing and full-text search[1], and his toolkit covers embeddings, semantic search and reranking[2].',
    sources: [
      {
        label: 'CV, CallOps',
        quote:
          'Built a Python/FastAPI RAG system with PostgreSQL 16, pgvector, HNSW vector indexing, GIN-indexed full-text search, and structure-aware Markdown chunking.',
      },
      { label: 'CV, Technical skills', quote: SKILLS_RETRIEVAL },
    ],
  },
  {
    id: 'agents',
    match: /agent|agentic|automation|n8n|workflow/i,
    answer:
      'At Wisermonks he designed and deployed agentic AI applications and LLM automation workflows for UAE businesses[1], including a content pipeline for 8 clients with Telegram approval and revision workflows[2].',
    sources: [
      {
        label: 'CV, Wisermonks',
        quote:
          'Designed and deployed agentic AI applications and LLM automation workflows for UAE business operations, integrating Python, LangChain, Gemini, n8n, and external APIs.',
      },
      {
        label: 'CV, Wisermonks',
        quote:
          'Architected a multi-client content-production pipeline for 8 clients, designed for 240+ posts/month; integrated brand PDFs, website data, Supabase, content calendars, and Telegram approval/revision workflows.',
      },
    ],
  },
  {
    id: 'ml',
    match: /machine learning|\bml\b|forecast|deep learning|lstm|xgboost|model/i,
    answer:
      'He engineered an LSTM–XGBoost medicine-demand forecasting pipeline that was 30% more accurate than moving-average methods[1], and works with TensorFlow, PyTorch and scikit-learn[2].',
    sources: [
      {
        label: 'CV, Boehm Tech LLP',
        quote:
          'Engineered an LSTM–XGBoost medicine-demand forecasting pipeline with lag features, rolling statistics, trend extraction, and cyclical encoding; improved forecasting accuracy by 30% over moving-average methods.',
      },
      {
        label: 'CV, Technical skills',
        quote:
          'TensorFlow, PyTorch, scikit-learn, XGBoost, LSTM, CNNs, BERT; statistical concepts, classification, regression, forecasting, model training, testing, evaluation, and performance optimization.',
      },
    ],
  },
  {
    id: 'mlops',
    match: /mlops|monitor|observab|langfuse|tracing|approval|human/i,
    answer:
      'He traces prompts, responses, latency, token usage and errors with Langfuse, and puts explicit human approval in front of any proposed action[1].',
    sources: [
      {
        label: 'CV, CallOps',
        quote:
          'Integrated Langfuse tracing for prompts, responses, latency, token usage, and errors; implemented explicit human approval controls for proposed actions.',
      },
    ],
  },
  {
    id: 'location',
    match: /bengaluru|bangalore|india|uae|relocat|location|based|where|start|available|notice/i,
    answer:
      "He is based in Bengaluru[1] and open to roles across India and the UAE. For a start date, email him and he'll confirm.",
    sources: [{ label: 'CV, Header', quote: 'Bengaluru (Bangalore), India' }],
  },
  {
    id: 'education',
    match: /degree|education|b\.?tech|college|universit|stud/i,
    answer:
      'B.Tech in Artificial Intelligence and Data Science from MES College of Engineering, Kuttippuram, completed in May 2025[1].',
    sources: [
      {
        label: 'CV, Education',
        quote:
          'B.Tech in Artificial Intelligence and Data Science, Sep 2021 – May 2025, MES College of Engineering, Kuttippuram, Kerala, India',
      },
    ],
  },
  {
    id: 'certs',
    match: /certif|oracle|aws cloud|course/i,
    answer:
      'Oracle Certified Foundations Associate: Agentic AI, AWS Cloud Practitioner Essentials, Big Data Analytics from Great Learning, and One Million Prompters from the Dubai Future Foundation[1].',
    sources: [
      {
        label: 'CV, Certifications',
        quote:
          'AWS Cloud Practitioner Essentials — AWS | Oracle Certified Foundations Associate: Agentic AI — Oracle | Big Data Analytics — Great Learning | One Million Prompters — Dubai Future Foundation',
      },
    ],
  },
]

export const fallback =
  "That isn't covered by my CV or project READMEs, so I won't guess. Email me and I'll answer it directly."

export function findAnswer(q: string): AskEntry | null {
  const query = q.trim()
  if (!query) return null
  return entries.find(e => e.match.test(query)) ?? null
}
