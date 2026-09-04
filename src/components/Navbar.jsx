import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#personal-dev', label: 'Certifications' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-black text-lg tracking-tight">
          V<span className="text-cyan-400">.</span>
        </a>

        {/* Navigation Links & Action Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex gap-0.5 sm:gap-1">
            {links.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={() => setActive(label)}
                className={`text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full transition-all duration-200 ${
                  active === label
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Button Download CV */}
          <a
            href="/pdf/Vincensius_Prasetyo_Adi_CV.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            download="Vincensius_CV.pdf"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-200 flex-shrink-0"
          >
            <span>CV</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}