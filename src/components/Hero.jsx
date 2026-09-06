import React from 'react'

const stats = [
  { value: '5+', label: 'Years', sub: 'Experience' },
  { value: '10+', label: 'Projects', sub: 'Delivered' },
  { value: '3', label: 'Certifications', sub: 'Holder' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden max-w-2xl mx-auto">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Badge status */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-4 py-1.5 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Hero Headline Section */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          {/* Nama Utama */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            <span className="gradient-text">Vincensius Prasetyo Adi</span>
          </h1>

          {/* Target Role Utama (Lebih Ringkas & Focused) */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Demand Planner & Manufacturing Data Specialist
          </h2>

          {/* Sub-headline / Core Competency Tagline */}
          <p className="text-xs text-gray-500 font-mono tracking-wide text-center">
            Demand Forecasting <span className="text-cyan-500">•</span> Inventory Optimization <span className="text-cyan-500">•</span> GCP BigQuery <span className="text-cyan-500">•</span> Dataform <span className="text-cyan-500">•</span> Python <span className="text-cyan-500">•</span> Apps Script
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center mb-12">
          <a
            href="#projects"
            className="group relative px-6 py-2.5 rounded-full text-sm font-bold text-black overflow-hidden transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}
          >
            View Projects
          </a>
          <a
            href="/pdf/Vincensius Prasetyo Adi CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Vincensius_Prasetyo_Adi_CV.pdf"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-gray-300 border border-white/15 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:scale-105 active:scale-95"
          >
            <span>Download CV</span>
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
              className="relative rounded-2xl p-4 text-center overflow-hidden bg-white/[0.03] border border-white/[0.07]"
            >
              <div className="text-2xl font-black text-white mb-0.5">{value}</div>
              <div className="text-xs font-semibold text-gray-400">{label}</div>
              <div className="text-xs text-gray-600">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  )
}