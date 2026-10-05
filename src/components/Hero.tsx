import React from 'react'
import { useLanguage } from '../context/LanguageContext.tsx'

interface StatItem {
  value: string
  label: string
  sub: string
}

const stats: StatItem[] = [
  { value: '5+', label: 'Years', sub: 'Experience' },
  { value: '10+', label: 'Projects', sub: 'Delivered' },
  { value: '3', label: 'Certifications', sub: 'Holder' },
]

export default function Hero() {
  const { t } = useLanguage()
  const marqueeText = "Demand Forecasting • Inventory Optimization • GCP BigQuery • Dataform • Python • Apps Script • "

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden max-w-5xl mx-auto">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #cee8ff, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #acc2ef, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Badge status */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 tracking-wide shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t('OPEN TO OPPORTUNITIES')}
          </span>
        </div>

        {/* Hero Headline Section */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          {/* Nama Utama */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[#1F3A5F]">
            Vincensius Prasetyo Adi
          </h1>

          {/* Target Role Utama */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#3D5A80] mb-4">
            {t('Data & Analytics | Automation & AI')}
          </h2>

          {/* Running Marquee Text Section */}
          <div className="w-full overflow-hidden whitespace-nowrap relative py-1">
            <div className="inline-flex animate-marquee">
              <span className="text-xs text-slate-500 font-mono tracking-wide pr-4">
                {marqueeText.split(' • ').map((item, index) => <span key={item}>{index > 0 && ' • '}{t(item)}</span>)}
              </span>
              <span className="text-xs text-slate-500 font-mono tracking-wide pr-4" aria-hidden="true">
                {marqueeText}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center mb-12">
          <a
            href="#projects"
            className="group relative px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#1F3A5F] hover:bg-[#3D5A80] shadow-md transition-all hover:scale-105 active:scale-95"
          >
            {t('View Projects')}
          </a>
          <a
            href="/pdf/Vincensius_Prasetyo_Adi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Vincensius_Prasetyo_Adi_CV.pdf"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-[#1F3A5F] bg-white border border-slate-300 hover:border-[#3D5A80] hover:text-[#3D5A80] hover:bg-slate-50 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <span>{t('Download CV')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ value, label, sub }) => (
            <div
              key={label}
              className="relative rounded-2xl p-4 text-center overflow-hidden bg-slate-50/80 border border-slate-200/80 shadow-sm"
            >
              <div className="text-2xl font-black text-[#1F3A5F] mb-0.5">{value}</div>
              <div className="text-xs font-semibold text-slate-700">{t(label)}</div>
              <div className="text-xs text-slate-500">{t(sub)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}