import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import PersonalDev from './components/PersonalDev'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { LanguageProvider } from './context/LanguageContext'

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