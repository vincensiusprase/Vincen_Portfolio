import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { language, t } = useLanguage()
  const emailSubject = language === 'ID'
    ? 'Diskusi Proyek Data & Automation'
    : 'Data & Automation Project Discussion'
  return (
    <footer className="relative px-6 py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #cee8ff, #acc2ef)' }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(31,58,95,0.2))',
            }}
          />
          <span className="text-[#3D5A80] text-xs font-bold tracking-widest uppercase">
            {t('Get in touch')}
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to left, transparent, rgba(31,58,95,0.2))',
            }}
          />
        </div>

        <h2 className="text-3xl font-black mb-3 leading-tight">
          <span className="text-[#1F3A5F]">{t("Let's build")}</span>
          <br />
          <span className="text-[#3D5A80]">{t('something great.')}</span>
        </h2>

        <p className="text-sm text-slate-600 mb-6">
          {t('Punya proyek data atau automation? Mari diskusi.')}
        </p>

        {/* Direct Web Gmail Link */}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=vincensiusprase@gmail.com&su=${encodeURIComponent(emailSubject)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200/80 hover:border-[#3D5A80] hover:bg-[#E0F0FF] transition-all mb-10 group shadow-2xs"
        >
          <span className="text-sm">✉️</span>
          <span className="text-sm font-semibold text-slate-800 group-hover:text-[#1F3A5F] transition-colors">
            vincensiusprase@gmail.com
          </span>
        </a>

        {/* Action Buttons: LinkedIn, GitHub, SkillsGoogle */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href="https://www.linkedin.com/in/vincensiusprase/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#1F3A5F] bg-white border border-slate-300 hover:bg-[#1F3A5F] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/vincensiusprase/App_Script_Personal_Project"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#1F3A5F] bg-white border border-slate-300 hover:bg-[#1F3A5F] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            GitHub
          </a>
          <a
            href="https://www.skills.google/public_profiles/d3cf8334-3f6f-4ecc-896b-62ff3046a212"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#1F3A5F] bg-white border border-slate-300 hover:bg-[#1F3A5F] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            SkillsGoogle
          </a>
        </div>

        <p className="text-xs text-slate-400">
          © 2026 • Built with React + Tailwind
        </p>
      </div>
    </footer>
  )
}