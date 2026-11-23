import { projects, experience, freelance, profile } from './portfolio'

test('featured projects are the six from the spec, in order', () =>
  expect(projects.filter(p => p.featured).map(p => p.slug)).toEqual(
    ['agentic-content-pipeline','dev-ai','enterprise-rag-chatbot','myg_assistant','Vidscribe-finalised','agent-sfx']))
test('every repo link points at the user account', () =>
  projects.filter(p => p.repo).forEach(p => expect(p.repo).toMatch(/^https:\/\/github\.com\/mohammedfalahi\//)))
test('signalforge has no repo', () => expect(projects.find(p => p.slug==='signalforge')?.repo).toBeUndefined())
test('figures match the CV', () => {
  const m = Object.fromEntries(projects.filter(p=>p.metric).map(p => [p.slug, p.metric!.value]))
  expect(m).toMatchObject({ 'agentic-content-pipeline':'240+', 'enterprise-rag-chatbot':'0.0%', 'myg_assistant':'92%' })
  expect(JSON.stringify(experience)).toContain('30%')
})
test('experience is newest first', () =>
  expect(experience.map(r=>r.org)).toEqual(['Wisermonks','Boehm Tech LLP','Boehm Tech LLP']))
test('freelance roles are separate', () =>
  expect(freelance.map(r=>r.org)).toEqual(['Drytis Inc.','Careerflow.ai']))
test('india contact details, no excluded personal data', () => {
  expect(profile).toMatchObject({ location:'Bengaluru, India', email:'falahi@mohammedfalahi.in', phone:'+91 95672 45034' })
  expect(JSON.stringify({profile,experience})).not.toMatch(/nationality|date of birth|visa|CGPA/i)
})
