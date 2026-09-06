import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './About'

const experiences = [
  {
    role: 'Data Analyst',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Jan 2024 — Present',
    type: 'Full-time',
    desc: 'Architected end-to-end automated ELT/ETL pipelines, modern data modeling with Dataform & BigQuery, GCP infrastructure administration, AI automation workflows (Document AI & Apps Script), and executive Looker Studio dashboards.',
    tags: ['BigQuery', 'GCP', 'Dataform', 'Cloud Run', 'Python', 'Apps Script', 'Looker Studio', 'Data Governance'],
    current: true,
  },
  {
    role: 'Supply Chain Management',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Apr 2021 — Dec 2023',
    type: 'Full-time',
    desc: 'Led SCM strategic execution, inventory optimization & demand forecasting models, process digitalization (3+ strategic optimization projects), and integrated Production & Finance workflows via Looker Studio.',
    tags: ['Supply Chain', 'Demand Forecasting', 'Inventory Optimization', 'Process Digitalization', 'SOP'],
    current: false,
  },
]

const educationAndCertifications = {
  education: {
    degree: 'Bachelor of Chemical Engineering',
    institution: 'Universitas Pembangunan Nasional "Veteran" Yogyakarta',
    period: 'Graduated June 2020',
  },
  certifications: [
    { 
      title: 'Associate Data Scientist', 
      issuer: 'BNSP', 
      year: '2025',
      file: '/pdf/BNSP ADS.pdf'
    },
    { 
      title: 'Data Analyst', 
      issuer: 'BNSP', 
      year: '2025',
      file: '/pdf/BNSP Data Analyst.pdf'
    },
    { 
      title: 'KNIME L1', 
      issuer: 'KNIME', 
      year: '2025',
      file: '/pdf/KNIME L1.pdf'
    },
  ],
}

// Modal Component untuk Preview PDF Sertifikat
function PdfViewerModal({ cert, onClose }) {
  if (!cert) return null;

  // Parameter `#toolbar=0&navpanes=0&scrollbar=1` menyembunyikan toolbar download bawaan
  const pdfUrl = `${cert.file}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl h-[85vh] bg-gray-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam area preview
        onContextMenu={(e) => e.preventDefault()} // Mematikan Klik Kanan
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-white">{cert.title}</h3>
            <p className="text-xs text-gray-400">Issued by {cert.issuer} ({cert.year})</p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold"
          >
            <span>Close</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Frame / Container */}
        <div className="relative flex-1 w-full h-full bg-gray-950">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title={cert.title}
          />
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const [activeCert, setActiveCert] = useState(null) // State untuk preview modal PDF

  return (
    <section id="experience" className="px-6 py-20 max-w-2xl mx-auto">
      <SectionHeader title="Experience" />

      {/* Work Experience Timeline */}
      <div className="relative mb-16">
        {/* Timeline vertical line */}
        <div
          className="absolute left-4 top-2 bottom-2 w-px"
          style={{
            background:
              'linear-gradient(to bottom, #06b6d4, rgba(139,92,246,0.3), transparent)',
          }}
        />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, i) => {
            const ref = useReveal(i * 150)
            return (
              <div key={i} ref={ref} className="reveal flex gap-6">
                {/* Dot */}
                <div className="relative flex-shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative ${
                      exp.current
                        ? 'bg-cyan-400/20 border border-cyan-400/60'
                        : 'border border-white/10'
                    }`}
                    style={{
                      background: exp.current ? undefined : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        exp.current ? 'bg-cyan-400' : 'bg-gray-600'
                      }`}
                    />
                  </div>
                  {exp.current && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ background: 'rgba(6,182,212,0.4)' }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    {exp.current && (
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-0.5 whitespace-nowrap flex-shrink-0">
                        Present
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-cyan-400/80 mb-0.5">
                    {exp.company}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    {exp.period} • {exp.type}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {exp.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Education & Certifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
        {/* Education */}
        <div className="rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎓</span>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Education
            </h4>
          </div>
          <h5 className="text-sm font-bold text-white mb-1">
            {educationAndCertifications.education.degree}
          </h5>
          <p className="text-xs text-cyan-400/80 mb-1">
            {educationAndCertifications.education.institution}
          </p>
          <p className="text-xs text-gray-600">
            {educationAndCertifications.education.period}
          </p>
        </div>

        {/* Certifications */}
        <div className="rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📜</span>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Certifications
            </h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {educationAndCertifications.certifications.map((cert) => (
              <button
                key={cert.title}
                onClick={() => setActiveCert(cert)}
                className="group w-full text-left flex items-center justify-between text-xs p-2 rounded-xl transition-all duration-200 hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <span className="font-semibold text-gray-200 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                  {cert.title}{' '}
                  <span className="text-gray-500 font-normal">by {cert.issuer}</span>
                  {/* Eye Preview Icon */}
                  <svg
                    className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
                <span className="text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md border border-cyan-400/20 text-[10px] font-mono group-hover:bg-cyan-400/20 transition-colors">
                  {cert.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Preview PDF */}
      <PdfViewerModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  )
}