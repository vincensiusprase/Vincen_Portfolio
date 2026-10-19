import React from 'react'
import { useLanguage } from '../context/LanguageContext.tsx'
import { useReveal } from '../hooks/useReveal.ts'

interface StatItem {
  value: string
  label: string
  icon: string
}

interface ToolItem {
  name: string
  logo: string
}

const stats: StatItem[] = [
  { value: '5+', label: 'Experience', icon: '💼' },
  { value: '10+', label: 'Projects', icon: '🚀' },
  { value: '3', label: 'Certifications', icon: '🎓' },
]

const tools: ToolItem[] = [
  { name: 'BigQuery', logo: '/images/tools/bigquery.svg' },
  { name: 'GitHub', logo: '/images/tools/github-icon.svg' },
  { name: 'Cloud Run', logo: '/images/tools/google_cloud_run-icon.svg' },
  { name: 'Cloud Scheduler', logo: '/images/tools/Cloud%20Scheduler.svg' },
  { name: 'Apps Script', logo: '/images/tools/google-app-script.svg' },
  { name: 'Google Sheets', logo: '/images/tools/google-sheets.svg' },
  { name: 'Looker', logo: '/images/tools/Looker.svg' },
  { name: 'Python', logo: '/images/tools/python-icon.svg' },
  { name: 'Document AI', logo: '/images/tools/Document%20AI.svg' },
  { name: 'Google Cloud', logo: '/images/tools/google_cloud-icon.svg' },
  { name: 'Cloud Monitoring', logo: '/images/tools/Cloud%20Monitoring.svg' },
  { name: 'Data Transfer', logo: '/images/tools/Data%20Transfer.svg' },
  { name: 'Billing', logo: '/images/tools/Billing.svg' },
  { name: 'Artifact Registry', logo: '/images/tools/Artifact%20Registry.svg' },
  { name: 'Cloud Build', logo: '/images/tools/Cloud%20Build.svg' },
  { name: 'Google Maps Platform', logo: '/images/tools/Google%20Maps%20Platform.svg' },
  { name: 'Pub/Sub', logo: '/images/tools/PubSub.svg' },
  { name: 'Identity and Access Management', logo: '/images/tools/Identity%20And%20Access%20Management.svg' },
  { name: 'Vertex AI', logo: '/images/tools/Vertex%20AI.svg' },
]

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef = useReveal()

  return (
    <section ref={sectionRef} className="reveal-section relative px-6 pt-28 pb-16 max-w-6xl mx-auto">
      {/* Floating decorative shapes (gaya referensi) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[8%] top-[30%] w-10 h-10 rounded-full bg-[#F97316]/20 blur-[1px] float-anim" />
        <span className="absolute right-[10%] top-[18%] w-6 h-6 rounded-full border-2 border-[#F97316]/60 float-anim-slow" />
        <span className="absolute left-[16%] bottom-[16%] w-4 h-4 rounded-full bg-[#4A5C8A]/40 float-anim" />
        <span className="absolute right-[22%] top-[62%] w-3 h-3 rounded-full border-2 border-sky-400/60 float-anim-slow" />
      </div>

      {/* Main peach panel */}
      <div className="reveal-item relative hero-surface rounded-[2.5rem] border border-[#F6DCC6] shadow-[0_40px_80px_-50px_rgba(249,115,22,0.5)] overflow-hidden">
        {/* Soft blobs */}
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-white/50 blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-[#FFD9A8]/60 blur-3xl" />

        <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-14">
          <div className="reveal-stagger grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* LEFT: Copy */}
            <div className="lg:col-span-7">
              {/* Badge status */}
              <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-800 bg-white/80 border border-emerald-200/80 rounded-full px-4 py-1.5 tracking-wide shadow-sm backdrop-blur-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t('OPEN TO OPPORTUNITIES')}
              </span>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.1] text-[#16264A] mb-3">
                Vincensius Prasetyo Adi
              </h1>
              <h2 className="text-lg sm:text-xl font-bold mb-5">
                <span className="text-gradient-warm">{t('Supply Chain | Data | Automation & AI')}</span>
              </h2>

              {/* Tool logo marquee */}
              <div
                className="tool-marquee w-full overflow-hidden relative py-2 mb-7 mask-gradient"
                aria-label="Tools and platforms used in my work"
              >
                <div className="tool-marquee-track">
                  {[false, true].map((isDuplicate) => (
                    <div
                      key={isDuplicate ? 'duplicate' : 'tools'}
                      className="tool-marquee-group"
                      aria-hidden={isDuplicate || undefined}
                    >
                      {tools.map(({ name, logo }) => (
                        <span key={name} className="tool-marquee-item">
                          <img className="tool-marquee-logo" src={logo} alt="" aria-hidden="true" />
                          <span>{name}</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group px-7 py-3 rounded-2xl text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.04] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)' }}
                >
                  {t('View Projects')}
                </a>
                <a
                  href="/pdf/Vincensius_Prasetyo_Adi_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Vincensius_Prasetyo_Adi_CV.pdf"
                  className="flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-bold text-[#16264A] bg-white/90 border border-[#F3E1D0] hover:bg-white hover:border-[#F97316] shadow-sm backdrop-blur-sm transition-all hover:scale-[1.04] active:scale-95"
                >
                  <span>{t('Download CV')}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                {stats.map(({ value, label, icon }) => (
                  <div key={label} className="soft-card rounded-xl px-3 py-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg grid place-items-center text-sm bg-gradient-to-br from-orange-100 to-amber-100">
                      {icon}
                    </span>
                    <p className="text-xs font-black text-[#16264A] leading-tight">
                      {value} {t(label)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[#4A5C8A]">
                {t('Certified Associate Data Scientist, Data Analyst, and Industry 4.0 Transformation Manager by BNSP')}
              </p>
            </div>

            {/* RIGHT: Photo */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[320px]">
                {/* Glow ring */}
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[#FFD9A8] via-[#FFE3D0] to-[#F97316]/30 blur-2xl opacity-70" />
                {/* Photo */}
                <div className="relative rounded-[1.75rem] overflow-hidden border-4 border-white shadow-2xl bg-white">
                  <img
                    src="/images/Vincen Photo.png"
                    alt="Vincensius Prasetyo Adi"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating emoji chip - top left (di sudut luar foto) */}
                <div className="absolute -top-5 -left-5 w-14 h-14 rounded-2xl bg-white shadow-xl border border-[#F3E7DC] grid place-items-center text-2xl float-anim">
                  🎯
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
