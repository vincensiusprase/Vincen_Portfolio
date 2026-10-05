import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal.ts'
import { SectionHeader } from './About.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import PdfViewerModal from './PdfViewerModal.tsx'

interface CertificationItem {
  name: string
  issuer: string
  file: string
}

interface CertificationCategory {
  category: string
  icon: string
  items: CertificationItem[]
}

interface CategoryGroupProps {
  group: CertificationCategory
  onPreview: (cert: CertificationItem) => void
}

const certificationsData: CertificationCategory[] = [
  {
    category: 'Data & AI',
    icon: '🤖',
    items: [
      { name: 'Analitik Data Google', issuer: 'Google', file: '/pdf/Analitik Data Google.pdf' },
      { name: 'Tableau Business Intelligence Analyst', issuer: 'Tableau', file: '/pdf/Tableau Business Intelligence Analyst.pdf' },
      { name: 'Meta Data Analyst', issuer: 'Meta', file: '/pdf/Meta Data Analyst.pdf' },
      { name: 'Data Science Fundamentals', issuer: 'Fresh Graduate Academy', file: '/pdf/Sertifikat_Vincensius Prasetyo Adi_Fundamental Data Science.pdf' },
      { name: 'Certified AI Foundations Associate', issuer: 'Oracle', file: '/pdf/OCI25CertifiedAIFoundationsAssociate.pdf' },
      { name: 'IBM BI Analyst', issuer: 'IBM', file: '/pdf/IBM BI Analyst.pdf' },
      { name: 'Microsoft Data Visualization', issuer: 'Microsoft', file: '/pdf/Microsoft Data Visualization.pdf' },
      { name: 'Microsoft Excel', issuer: 'Microsoft', file: '/pdf/Microsoft Excel - Vincensius Prasetyo Adi.pdf' },
      { name: 'Data Analytics', issuer: 'Profesional Academy', file: '/pdf/Sertifikat_Vincensius Prasetyo Adi_Data Analytics.pdf' },
      { name: 'Business Intelligence Engineer', issuer: 'Profesional Academy', file: '/pdf/Sertifikat_Vincensius Prasetyo Adi_Business Intelligence Engineer.pdf' }
    ],
  },
  {
    category: 'Supply Chain',
    icon: '📦',
    items: [
      { name: 'Supply Chain Management', issuer: 'Rutgers University', file: '/pdf/Supply Chain Management.pdf' },
      { name: 'Unilever Supply Chain Data Analyst', issuer: 'Unilever', file: '/pdf/Unilever Supply Chain Data Analyst.pdf' },
    ],
  },
  {
    category: 'Google Cloud & Google Workspace',
    icon: '☁️',
    items: [
      { name: 'Google Professional Workspace Administrator', issuer: 'Google Cloud', file: '/pdf/Google Professional Workspace Administrator.pdf' },
    ],
  },
  {
    category: 'Management & Business',
    icon: '📈',
    items: [
      { name: 'IBM Business Analyst', issuer: 'IBM', file: '/pdf/IBM Business Analyst.pdf' },
      { name: 'Six Sigma Green Belt', issuer: 'Kennesaw State University', file: '/pdf/Six Sigma Green Belt - KSU.pdf' },
      { name: 'Digital Transformation 4.0', issuer: 'Kementrian Perindustrian', file: '/pdf/Transformasi Digital - Level Manager.pdf' },
    ],
  },
  {
    category: 'Project Management',
    icon: '🎯',
    items: [
      { name: 'Manajemen Proyek Google', issuer: 'Google', file: '/pdf/Google Project Management.pdf' },
    ],
  },
  {
    category: 'LC/NC Analytics',
    icon: '⚡',
    items: [
      { name: 'Data Engineering Profesional Certifications', issuer: 'RapidMiner', file: '/pdf/Vincensius_PA_Data Engineering Professional Certication.pdf' },
      { name: 'Aplication Use Profesional Certificate', issuer: 'RapidMiner', file: '/pdf/RapidMiner_Vincensius_PA_Application_Use_Professional_Certificate.pdf' },
      { name: 'Machine Learning Professional Certication', issuer: 'RapidMiner', file: '/pdf/Vincensius_PA_Machine Learning Professional Certication.pdf' },
    ],
  },
  {
    category: 'Languages',
    icon: '🌐',
    items: [
      { name: 'EFSET English Certificate (B1 Intermediate)', issuer: 'EFSET', file: '/pdf/EF SET Certificate - Vincensius P A.pdf' },
    ],
  },
  ]

  // Component untuk menangani per-kategori dengan limit 3 & tombol Show More
  function CategoryGroup({ group, onPreview }: CategoryGroupProps) {
  const { t, language } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const hasMore = group.items.length > 3
  const visibleItems = expanded ? group.items : group.items.slice(0, 3)

  return (
    <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-xl">{group.icon}</span>
        <h3 className="text-xs font-bold text-[#3D5A80] uppercase tracking-widest">
          {t(group.category)}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {visibleItems.map((cert, idx) => (
          <button
            key={idx}
            onClick={() => onPreview(cert)}
            className="group w-full text-left flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#3D5A80] hover:bg-slate-100/80 transition-all duration-200 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800 group-hover:text-[#1F3A5F] transition-colors">
                {cert.name}
              </span>
              <span className="text-xs text-slate-500">
                {t('Issued by ')}{cert.issuer}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#1F3A5F] bg-[#E0F0FF] px-2.5 py-1 rounded-lg border border-sky-200 group-hover:bg-[#1F3A5F] group-hover:text-white transition-colors">
              <span>{t('Preview')}</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:scale-110 transition-transform"
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
            </div>
          </button>
        ))}
      </div>

      {/* Tombol Show More / Show Less */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-full py-2 text-xs font-semibold text-[#1F3A5F] bg-[#E0F0FF]/60 hover:bg-[#E0F0FF] border border-sky-200 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>{expanded ? t('Show Less') : `${t('Show More')} (${group.items.length - 3} ${language === 'ID' ? 'lainnya' : 'more'})`}</span>
          <svg
            className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default function PersonalDev() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('Data & AI')
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null)

  const categories: string[] = ['All', ...certificationsData.map((c) => c.category)]

  const filteredData: CertificationCategory[] =
    selectedCategory === 'All'
      ? certificationsData
      : certificationsData.filter((c) => c.category === selectedCategory)

  return (
    <section id="personal-dev" className="px-6 py-20 max-w-5xl mx-auto">
      <SectionHeader title="Personal Development" />

      <div className="mb-8">
        <h2 className="text-2xl font-black text-[#1F3A5F] leading-tight mb-2">
          {t('Certificates & ')}<span className="text-[#3D5A80]">{t('Continuous Learning')}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {t('Klik sertifikat untuk membuka pratinjau dokumen langsung di layar.')}
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1F3A5F] text-white border-[#1F3A5F] font-semibold shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-[#1F3A5F]'
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      {/* Grouped Certifications List */}
      <div className="flex flex-col gap-6">
        {filteredData.map((group) => (
          <CategoryGroup key={group.category} group={group} onPreview={(cert) => setActiveCert(cert)} />
        ))}
      </div>

      {/* Render Modal PDF Viewer jika ada cert yang dipilih */}
      <PdfViewerModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  )
}
