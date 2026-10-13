import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.tsx'
import { useTheme } from '../context/ThemeContext.tsx'

interface NavLink {
  href: string
  label: string
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <nav
        className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border border-[#F3E1D0] shadow-lg shadow-orange-500/5'
            : 'bg-white/70 backdrop-blur-md border border-white/70 shadow-sm'
        }`}
      >
        <div className="px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-xl grid place-items-center text-white text-sm font-black shadow-md shadow-orange-500/25"
              style={{ background: 'linear-gradient(135deg, #FB923C, #F97316)' }}
            >
              V
            </span>
            <span className="font-black text-base tracking-tight text-[#16264A]">
              Vincen<span className="text-[#F97316]">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={() => setActive(label)}
                className={`text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-200 ${
                  active === label
                    ? 'text-[#16264A] bg-[#FFEDD5]'
                    : 'text-slate-500 hover:text-[#16264A] hover:bg-[#FFF4EC]'
                }`}
              >
                {t(label)}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full grid place-items-center border border-[#F0E4DA] bg-white text-[#16264A] hover:border-[#F97316] transition-colors"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
                </svg>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full border border-[#F0E4DA] bg-white">
              {['ID', 'EN'].map((option, index) => (
                <span key={option} className="flex items-center">
                  {index > 0 && <span className="text-slate-300 px-1">|</span>}
                  <button
                    type="button"
                    aria-pressed={language === option}
                    onClick={() => setLanguage(option)}
                    className={language === option ? 'text-[#F97316]' : 'text-slate-400 hover:text-[#16264A]'}
                  >
                    {option}
                  </button>
                </span>
              ))}
            </div>

            <a
              href="/pdf/Vincensius_Prasetyo_Adi_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Vincensius_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full text-white shadow-md shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #FB923C, #F97316)' }}
            >
              <span>{t('Hire Me')}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-xl grid place-items-center border border-[#F0E4DA] bg-white text-[#16264A]"
            >
              <span className="text-base leading-none">{open ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden px-4 pb-4 animate-fadeIn">
            <div className="flex flex-col gap-1 pt-2 border-t border-[#F3E1D0]">
              {links.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => { setActive(label); setOpen(false) }}
                  className="text-sm font-semibold text-slate-600 hover:text-[#16264A] hover:bg-[#FFF4EC] px-3 py-2.5 rounded-xl transition-colors"
                >
                  {t(label)}
                </a>
              ))}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full border border-[#F0E4DA] bg-white">
                  {['ID', 'EN'].map((option, index) => (
                    <span key={option} className="flex items-center">
                      {index > 0 && <span className="text-slate-300 px-1">|</span>}
                      <button
                        type="button"
                        onClick={() => setLanguage(option)}
                        className={language === option ? 'text-[#F97316]' : 'text-slate-400'}
                      >
                        {option}
                      </button>
                    </span>
                  ))}
                </div>
                <a
                  href="/pdf/Vincensius_Prasetyo_Adi_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Vincensius_CV.pdf"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full text-white shadow-md"
                  style={{ background: 'linear-gradient(135deg, #FB923C, #F97316)' }}
                >
                  {t('Get in touch')}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
