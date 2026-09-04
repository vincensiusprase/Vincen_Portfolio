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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/5 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-lg mx-auto px-6 flex items-center justify-between">
        <span className="font-black text-lg tracking-tight">
          V<span className="text-cyan-400">.</span>
        </span>
        <div className="flex gap-1">
          {links.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              onClick={() => setActive(label)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                active === label
                  ? 'text-white bg-white/10'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
