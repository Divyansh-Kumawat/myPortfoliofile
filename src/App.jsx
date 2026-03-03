import { useState } from 'react'
import Navbar from './components/Layout/Navbar'
import Hero from './components/Sections/Hero'
import About from './components/Sections/About'
import Skills from './components/Sections/Skills'
import Projects from './components/Sections/Projects'
import Experience from './components/Sections/Experience'
import TestimonialsAndBlog from './components/Sections/TestimonialsAndBlog'
import Contact from './components/Sections/Contact'
import Footer from './components/Layout/Footer'

function App() {
  const [theme, setTheme] = useState('dark')

  return (
    <div className={`${theme} min-h-screen relative`}>
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <TestimonialsAndBlog />
        <Contact />
      </main>

      <Footer />

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-[#45A29E]/5 rounded-full blur-[150px]"></div>
      </div>
    </div>
  )
}

export default App
