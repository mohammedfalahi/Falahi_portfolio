/**
 * Diagram specs for the two feature rows in Selected work, drawn by the taste-skill kit
 * (public/kit/diagrams/diagram.js). Every label restates a fact from portfolio.ts:
 * the project summaries, tags and the Wisermonks role. Icons are kit ids; their files
 * were fetched into public/kit/icons by the kit's icons.mjs.
 */
type DiagramNode = { label: string; icon?: string; sub?: string; done?: boolean }

export type DiagramSpec = {
  layout: 'fanin' | 'lanes'
  /** "card" keeps the full 340px panel even for a flat drawing. */
  size?: 'card' | 'band'
  alt: string
  sources?: DiagramNode[]
  target?: DiagramNode
  then?: DiagramNode[]
  input?: DiagramNode
  core?: DiagramNode
  lanes?: DiagramNode[]
}

export const diagrams: Record<string, DiagramSpec> = {
  // fanin-warehouse preset: many into one, then on along a short chain
  'enterprise-rag-chatbot': {
    layout: 'fanin',
    size: 'card',
    alt: "A question and each tenant's documents pass an access check enforced in the database, then hybrid search with pgvector and reranking, then the answer.",
    sources: [
      { label: 'Question', icon: 'ui:message-square' },
      { label: 'Documents', icon: 'ui:file-text', sub: 'Per tenant' },
    ],
    target: { label: 'Access check', icon: 'ui:shield-check', sub: 'In the database' },
    then: [
      { label: 'Hybrid search', icon: 'postgres', sub: 'pgvector, reranking' },
      { label: 'Answer', icon: 'ui:message-square-text', done: true },
    ],
  },
  // lanes-agent preset: one input, a core, parallel lanes
  'agentic-content-pipeline': {
    layout: 'lanes',
    alt: 'Brand PDFs from onboarding go to a Gemini agent built in n8n, which produces content calendars, Telegram approvals and multi-format content.',
    input: { label: 'Brand PDFs', icon: 'pdf', sub: 'Onboarding' },
    core: { label: 'Agent', icon: 'gemini', sub: 'n8n' },
    lanes: [
      { label: 'Content calendar', icon: 'ui:calendar-days', done: true },
      { label: 'Telegram approval', icon: 'telegram', done: true },
      { label: 'Multi-format posts', icon: 'ui:images', done: true },
    ],
  },
}
