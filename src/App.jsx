import Navbar from './components/Layout/Navbar'
import Hero from './components/Sections/Hero'
import About from './components/Sections/About'
import Skills from './components/Sections/Skills'
import Projects from './components/Sections/Projects'
import Experience from './components/Sections/Experience'
import TestimonialsAndBlog from './components/Sections/TestimonialsAndBlog'
import Contact from './components/Sections/Contact'
import Footer from './components/Layout/Footer'
import GridBackground from './components/UI/GridBackground'
import Marquee from './components/UI/Marquee'

const TICKER = [
  'React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'GenAI',
  'Next.js', 'Docker', 'Python', 'TensorFlow', 'Kubernetes', 'Express',
]

function App() {
  return (
    <div className="relative min-h-screen w-full bg-paper text-ink">
      <GridBackground />

      <Navbar />

      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <Marquee items={TICKER} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <TestimonialsAndBlog />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
