import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal.ts'
import { SectionHeader } from './About.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import PdfViewerModal from './PdfViewerModal.tsx'

interface ExperienceItem {
  role: string
  company: string
  period: string
  type: string
  desc: string[]
  tags: string[]
  current: boolean
}

interface Education {
  degree: string
  institution: string
  period: string
}

interface Certification {
  title: string
  issuer: string
  year: string
  file: string
}

interface EducationAndCertifications {
  education: Education
  certifications: Certification[]
}

const experiences: ExperienceItem[] = [
  {
    role: 'Data & Analytics Manager (Individual Contributor)',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Jan 2024 – Present',
    type: 'Full-time',
    desc: [
      'Built automated ELT/ETL pipelines ingesting 100+ fragmented sources into BigQuery via Cloud Run + Cloud Scheduler',
      'Modeled modular Dataform (SQLX) layers with data quality assertions, lineage tracking, and version control',
      'Established single source of truth + IAM governance, keeping 100% system reliability with Cloud Logging alerts',
      'Shipped executive Looker Studio dashboards + reverse ETL to Sheets; automated hiring flow saving IDR 6.3M/month and scheduling effort by 90%',
    ],
    tags: ['BigQuery', 'GCP', 'Dataform', 'Cloud Run', 'Python', 'Apps Script', 'Looker Studio', 'Data Governance'],
    current: true,
  },
  {
    role: 'Supply Chain Management',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Apr 2021 – Dec 2023',
    type: 'Full-time',
    desc: [
      'Directed SCM execution keeping 100% value-chain synchronization and maximized On-Time Delivery (OTD)',
      'Ran demand forecasting + safety stock / reorder point / ABC / RFM models on 18-month rolling calculations',
      'Led 3+ digitalization projects with SOPs, cutting non-conformity records and warehousing costs',
    ],
    tags: ['Supply Chain', 'Demand Forecasting', 'Inventory Optimization', 'Process Digitalization', 'SOP'],
    current: false,
  },
  {
    role: 'Continuous Improvement Specialist',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Apr 2021 — Apr 2022',
    type: 'Contract',
    desc: [
      'Drove Kaizen / 5S initiatives optimizing production processes via data-driven process reengineering',
      'Improved operational efficiency and reduced waste across manufacturing workflows',
    ],
    tags: ['5S', 'Kaizen', 'Process Optimization', 'Operational Efficiency', 'Data-Driven Strategies'],
    current: false,
  },
  {
    role: 'Management Trainee',
    company: 'PT Intan Safety Glass (Glass Processor Industry)',
    period: 'Apr 2021 — Apr 2022',
    type: 'Contract',
    desc: [
      'Rotated across departments delivering cross-functional projects in operations and supply chain',
      'Built data-driven reporting foundations later scaled into company-wide BI dashboards',
    ],
    tags: ['Management Training', 'Cross-Functional Collaboration', 'Data-Driven Strategies'],
    current: false,
  }
]

const experienceToolLogos: Record<string, string> = {
  BigQuery: '/images/tools/bigquery.svg',
  GCP: '/images/tools/google_cloud-icon.svg',
  'Cloud Run': '/images/tools/google_cloud_run-icon.svg',
  Python: '/images/tools/python-icon.svg',
  'Apps Script': '/images/tools/google-app-script.svg',
  'Looker Studio': '/images/tools/Looker.svg',
}

const educationAndCertifications: EducationAndCertifications = {
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
      title: 'Industry 4.0 Transformation Manager',
      issuer: 'BNSP',
      year: '2026',
      file: 'pdf/BNSP Transformasi Digital 4 Manager Vincen.pdf'
    },
  ],
}

export default function Experience() {
  const { t, language } = useLanguage()
  const sectionRef = useReveal()
  const [activeCert, setActiveCert] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 2)
  const hasMore = experiences.length > 2

  return (
    <section ref={sectionRef} id="experience" className="reveal-section px-6 py-20 max-w-5xl mx-auto">
      <SectionHeader title="Experience" />

      {/* Work Experience Timeline */}
      <div className="reveal-item relative mb-16">
        {/* Timeline vertical line */}
        <div
          className="absolute left-4 top-2 bottom-2 w-px"
          style={{
            background:
              'linear-gradient(to bottom, #F97316, rgba(249,115,22,0.25), transparent)',
          }}
        />

        <div className="reveal-stagger flex flex-col gap-10">
          {visibleExperiences.map((exp) => (
            <div key={exp.role} className="flex gap-6 transition-all duration-300">
              {/* Dot */}
              <div className="relative flex-shrink-0 mt-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative ${
                    exp.current
                      ? 'bg-[#FFEDD5] border border-[#F97316]'
                      : 'border border-[#F0E4DA] bg-white'
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      exp.current ? 'bg-[#F97316]' : 'bg-slate-400'
                    }`}
                  />
                </div>
                {exp.current && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-25"
                    style={{ background: '#F97316' }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-[#16264A]">{t(exp.role)}</h3>
                  {exp.current && (
                    <span className="text-xs font-bold text-white rounded-full px-3 py-0.5 whitespace-nowrap flex-shrink-0 shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #FB923C, #F97316)' }}>
                      {t('Present')}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-[#F97316] mb-0.5">
                  {exp.company}
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  {exp.period} • {t(exp.type)}
                </p>
                <ul className="text-xs text-slate-600 leading-relaxed mb-4 space-y-1.5 list-none pl-0">
                  {exp.desc.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-[#F97316] font-bold flex-shrink-0">-</span>
                      <span>{t(point)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => {
                    const logo = experienceToolLogos[tag]

                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 border border-slate-200/80 rounded-full px-2.5 py-0.5"
                      >
                        {logo && <img src={logo} alt="" className="h-3.5 w-3.5 object-contain" />}
                        {tag}
                      </span>
                    )
                  })}
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
              className="text-xs font-semibold text-[#16264A] bg-[#FFEDD5]/60 hover:bg-[#FFEDD5] border border-[#FFD9A8] rounded-xl px-4 py-2 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>{showAll ? t('Show Less') : `${t('Show More')} (${experiences.length - 2} ${t('more')})`}</span>
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
      <div className="reveal-item reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
        {/* Education */}
        <div className="rounded-2xl p-5 panel-soft shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎓</span>
            <h4 className="text-xs font-bold text-[#4A5C8A] uppercase tracking-widest">
              {t('Education')}
            </h4>
          </div>
          <h5 className="text-sm font-bold text-[#16264A] mb-1">
            {t(educationAndCertifications.education.degree)}
          </h5>
          <p className="text-xs text-[#4A5C8A] mb-1">
            {t(educationAndCertifications.education.institution)}
          </p>
          <p className="text-xs text-slate-400">
            {t(educationAndCertifications.education.period)}
          </p>
        </div>

        {/* Certifications */}
        <div className="rounded-2xl p-5 panel-soft shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📜</span>
            <h4 className="text-xs font-bold text-[#4A5C8A] uppercase tracking-widest">
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
                <span className="font-semibold text-slate-800 group-hover:text-[#16264A] flex items-center gap-1.5 transition-colors">
                  {cert.title}{' '}
                  <span className="text-slate-400 font-normal">{t('by')} {cert.issuer}</span>
                  <svg
                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#16264A] opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110"
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
                <span className="text-[#16264A] bg-[#FFEDD5] px-2 py-0.5 rounded-md border border-[#FFD9A8] text-[10px] font-mono group-hover:bg-[#16264A] group-hover:text-white transition-colors">
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