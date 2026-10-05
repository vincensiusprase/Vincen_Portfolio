import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Experience from './components/Experience.tsx'
import Projects from './components/Projects.tsx'
import PersonalDev from './components/PersonalDev.tsx'
import Footer from './components/Footer.tsx'
import Chatbot from './components/Chatbot.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'

export default function App() {
  return (
    <LanguageProvider>
      <div className="noise min-h-screen" style={{ background: 'var(--bg-100)' }}>
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
        <Chatbot />
      </div>
    </LanguageProvider>
  )
}