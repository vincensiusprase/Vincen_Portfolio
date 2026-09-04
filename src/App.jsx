import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import PersonalDev from './components/PersonalDev'

export default function App() {
  return (
    <div className="noise min-h-screen" style={{ background: '#050508' }}>
      <Navbar />
      <Hero />
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <About />
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Experience />
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Projects />
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <PersonalDev />
      </div>
      <Footer />
    </div>
  )
}
