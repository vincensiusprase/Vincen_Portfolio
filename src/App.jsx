import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import PersonalDev from './components/PersonalDev'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="noise min-h-screen" style={{ background: '#050508' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <PersonalDev />
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}