export default function Footer() {
  return (
    <footer className="relative px-6 py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, #8b5cf6)' }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(255,255,255,0.1))',
            }}
          />
          <span className="text-gray-700 text-xs tracking-widest uppercase">
            Get in touch
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to left, transparent, rgba(255,255,255,0.1))',
            }}
          />
        </div>

        <h2 className="text-3xl font-black mb-3">
          <span className="gradient-text">Let's build</span>
          <br />
          <span className="text-white">something great.</span>
        </h2>

        <p className="text-sm text-gray-600 mb-10">
          Punya proyek data atau automation? Mari diskusi.
        </p>

        {/* Action Buttons: LinkedIn & GitHub Sejajar Horizontal */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href="https://www.linkedin.com/in/vincensiusprase/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-200 border border-white/15 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:scale-105 active:scale-95"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/vincensiusprase/App_Script_Personal_Project"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-200 border border-white/15 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:scale-105 active:scale-95"
          >
            GitHub
          </a>
          <a
            href="https://www.skills.google/public_profiles/d3cf8334-3f6f-4ecc-896b-62ff3046a212"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-200 border border-white/15 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:scale-105 active:scale-95"
          >
            SkillsGoogle
          </a>
        </div>

        <p className="text-xs text-gray-800">
          © 2026 • Built with React + Tailwind
        </p>
      </div>
    </footer>
  )
}