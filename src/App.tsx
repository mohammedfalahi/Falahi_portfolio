import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Ask } from './sections/Ask'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Experience } from './sections/Experience'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ask />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
