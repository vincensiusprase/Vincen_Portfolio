import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.tsx'

interface NavLink {
  href: string
  label: string
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links: NavLink[] = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#personal-dev', label: 'Personal Development' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-black text-lg tracking-tight text-slate-900">
          V<span className="text-[#3D5A80]">.</span>
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
                    ? 'text-[#1F3A5F] bg-[#E0F0FF] font-semibold'
                    : 'text-slate-600 hover:text-[#1F3A5F] hover:bg-slate-100'
                }`}
              >
                {t(label)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-full border border-slate-200 bg-white">
            {['ID', 'EN'].map((option, index) => (
              <span key={option} className="flex items-center">
                {index > 0 && <span className="text-slate-300 px-1">|</span>}
                <button
                  type="button"
                  aria-pressed={language === option}
                  onClick={() => setLanguage(option)}
                  className={language === option ? 'text-[#1F3A5F]' : 'text-slate-400 hover:text-[#1F3A5F]'}
                >
                  {option}
                </button>
              </span>
            ))}
          </div>

          {/* Button Download CV */}
          <a
            href="/pdf/Vincensius_Prasetyo_Adi_CV.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            download="Vincensius_CV.pdf"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1F3A5F] text-white hover:bg-[#3D5A80] transition-all duration-200 flex-shrink-0 shadow-sm"
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