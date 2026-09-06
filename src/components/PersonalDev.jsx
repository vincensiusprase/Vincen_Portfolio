import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './About'

const certificationsData = [
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

// Modal Component untuk Preview PDF
function PdfViewerModal({ cert, onClose }) {
  if (!cert) return null;

  // Parameter `#toolbar=0&navpanes=0&scrollbar=0` menyembunyikan tombol download & print bawaan PDF viewer
  const pdfUrl = `${cert.file}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl h-[85vh] bg-gray-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam area PDF
        onContextMenu={(e) => e.preventDefault()} // Mematikan Klik Kanan
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-white">{cert.name}</h3>
            <p className="text-xs text-gray-400">Issued by {cert.issuer}</p>
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

        {/* PDF Viewer / Container */}
        <div className="relative flex-1 w-full h-full bg-gray-950">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title={cert.name}
          />
        </div>
      </div>
    </div>
  )
}

// Component untuk menangani per-kategori dengan limit 3 & tombol Show More
function CategoryGroup({ group, onPreview }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = group.items.length > 3
  const visibleItems = expanded ? group.items : group.items.slice(0, 3)

  return (
    <div className="rounded-2xl p-5 bg-white/[0.02] border border-white/10">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-xl">{group.icon}</span>
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest">
          {group.category}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {visibleItems.map((cert, idx) => (
          <button
            key={idx}
            onClick={() => onPreview(cert)}
            className="group w-full text-left flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-200"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">
                {cert.name}
              </span>
              <span className="text-xs text-gray-500">
                Issued by {cert.issuer}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-400/20 group-hover:bg-cyan-400/20 transition-colors">
              <span>Preview</span>
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
          className="mt-3 w-full py-2 text-xs font-semibold text-cyan-400 bg-cyan-400/5 hover:bg-cyan-400/10 border border-cyan-400/20 rounded-xl transition-all duration-200 flex items-center justify-center gap-1"
        >
          <span>{expanded ? 'Show Less' : `Show More (${group.items.length - 3} more)`}</span>
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
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeCert, setActiveCert] = useState(null) // State untuk menyimpan PDF yang sedang aktif di-preview

  const categories = ['All', ...certificationsData.map((c) => c.category)]

  const filteredData =
    selectedCategory === 'All'
      ? certificationsData
      : certificationsData.filter((c) => c.category === selectedCategory)

  return (
    <section id="personal-dev" className="px-6 py-20 max-w-2xl mx-auto">
      <SectionHeader title="Personal Development" />

      <div className="mb-8">
        <h2 className="text-2xl font-black text-white leading-tight mb-2">
          Certificates & <span className="text-cyan-400">Continuous Learning</span>
        </h2>
        <p className="text-xs text-gray-400">
          Klik sertifikat untuk membuka pratinjau dokumen langsung di layar.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
              selectedCategory === cat
                ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40 font-semibold'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            {cat}
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