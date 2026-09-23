import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './About'
import { useLanguage } from '../context/LanguageContext'

const experiences = [
  {
    role: 'Data Analyst',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Jan 2024 – Present',
    type: 'Full-time',
    desc: 'Architected end-to-end automated ELT/ETL pipelines, modern data modeling with Dataform & BigQuery, GCP infrastructure administration, AI automation workflows (Document AI & Apps Script), and executive Looker Studio dashboards.',
    tags: ['BigQuery', 'GCP', 'Dataform', 'Cloud Run', 'Python', 'Apps Script', 'Looker Studio', 'Data Governance'],
    current: true,
  },
  {
    role: 'Supply Chain Management',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Apr 2021 – Dec 2023',
    type: 'Full-time',
    desc: 'Led SCM strategic execution, inventory optimization & demand forecasting models, process digitalization (3+ strategic optimization projects), and integrated Production & Finance workflows via Looker Studio.',
    tags: ['Supply Chain', 'Demand Forecasting', 'Inventory Optimization', 'Process Digitalization', 'SOP'],
    current: false,
  },
  {
    role: 'Continuous Improvement Specialist',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Apr 2021 — Apr 2022',
    type: 'Contract',
    desc: 'Implemented continuous improvement initiatives, optimized production processes, and enhanced operational efficiency through data-driven strategies and process reengineering.',
    tags: ['5S', 'Kaizen', 'Process Optimization', 'Operational Efficiency', 'Data-Driven Strategies'],
    current: false,
  },
  {
    role: 'Management Trainee',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Apr 2021 — Apr 2022',
    type: 'Contract',
    desc: 'Participated in a comprehensive management training program, gaining exposure to various departments and functions within the organization, and contributing to cross-functional projects.',
    tags: ['Management Training', 'Cross-Functional Collaboration', 'Data-Driven Strategies'],
    current: false,
  }
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

function PdfViewerModal({ cert, onClose }) {
  const { t } = useLanguage()
  if (!cert) return null;
  const pdfUrl = `${cert.file}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[85vh] bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-[#1F3A5F]">{cert.title}</h3>
            <p className="text-xs text-slate-500">{t('Issued by ')}{cert.issuer} ({cert.year})</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-600 hover:text-[#1F3A5F] bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold shadow-xs"
          >
            <span>{t('Close')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative flex-1 w-full h-full bg-slate-100">
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
  const { t, language } = useLanguage()
  const [activeCert, setActiveCert] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 2)
  const hasMore = experiences.length > 2

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
              'linear-gradient(to bottom, #1F3A5F, rgba(61,90,128,0.3), transparent)',
          }}
        />

        <div className="flex flex-col gap-10">
          {visibleExperiences.map((exp) => (
            <div key={exp.role} className="flex gap-6 transition-all duration-300 animate-fadeIn">
              {/* Dot */}
              <div className="relative flex-shrink-0 mt-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative ${
                    exp.current
                      ? 'bg-[#E0F0FF] border border-[#1F3A5F]'
                      : 'border border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      exp.current ? 'bg-[#1F3A5F]' : 'bg-slate-400'
                    }`}
                  />
                </div>
                {exp.current && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-25"
                    style={{ background: '#1F3A5F' }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-[#1F3A5F]">{t(exp.role)}</h3>
                  {exp.current && (
                    <span className="text-xs font-semibold text-[#1F3A5F] bg-[#E0F0FF] border border-sky-200 rounded-full px-2.5 py-0.5 whitespace-nowrap flex-shrink-0">
                      {t('Present')}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-[#3D5A80] mb-0.5">
                  {exp.company}
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  {exp.period} • {exp.type}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'ID'
                    ? exp.desc
                      .replace('Architected end-to-end automated', 'Merancang pipeline otomatis')
                      .replace('Led SCM strategic execution', 'Memimpin eksekusi strategis SCM')
                      .replace('Implemented continuous improvement initiatives', 'Menerapkan inisiatif continuous improvement')
                      .replace('Participated in a comprehensive management training program', 'Mengikuti program pelatihan manajemen komprehensif')
                    : exp.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-700 bg-slate-100 border border-slate-200/80 rounded-full px-2.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Show More / Show Less */}
        {hasMore && (
          <div className="mt-8 flex justify-center pl-14">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="text-xs font-semibold text-[#1F3A5F] bg-[#E0F0FF]/60 hover:bg-[#E0F0FF] border border-sky-200 rounded-xl px-4 py-2 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>{showAll ? 'Show Less' : `Show More (${experiences.length - 2} more)`}</span>
              <svg
                className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                  showAll ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Education & Certifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
        {/* Education */}
        <div className="rounded-2xl p-5 border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎓</span>
            <h4 className="text-xs font-bold text-[#3D5A80] uppercase tracking-widest">
              {t('Education')}
            </h4>
          </div>
          <h5 className="text-sm font-bold text-[#1F3A5F] mb-1">
            {t(educationAndCertifications.education.degree)}
          </h5>
          <p className="text-xs text-[#3D5A80] mb-1">
            {educationAndCertifications.education.institution}
          </p>
          <p className="text-xs text-slate-400">
            {t(educationAndCertifications.education.period)}
          </p>
        </div>

        {/* Certifications */}
        <div className="rounded-2xl p-5 border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📜</span>
            <h4 className="text-xs font-bold text-[#3D5A80] uppercase tracking-widest">
              {t('Certifications')}
            </h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {educationAndCertifications.certifications.map((cert) => (
              <button
                key={cert.title}
                onClick={() => setActiveCert(cert)}
                className="group w-full text-left flex items-center justify-between text-xs p-2 rounded-xl transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <span className="font-semibold text-slate-800 group-hover:text-[#1F3A5F] flex items-center gap-1.5 transition-colors">
                  {cert.title}{' '}
                  <span className="text-slate-400 font-normal">{language === 'ID' ? 'oleh' : 'by'} {cert.issuer}</span>
                  <svg
                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1F3A5F] opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110"
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
                <span className="text-[#1F3A5F] bg-[#E0F0FF] px-2 py-0.5 rounded-md border border-sky-200 text-[10px] font-mono group-hover:bg-[#1F3A5F] group-hover:text-white transition-colors">
                  {cert.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <PdfViewerModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  )
}