import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './About'

const certificationsData = [
  {
    category: 'Data & AI',
    icon: '🤖',
    items: [
      { name: 'Analitik Data Google', issuer: 'Google', file: '/pdf/Analitik Data Google.pdf' },
      { name: 'Tableau Business Intelligence Analyst', issuer: 'Tableau', file: '/pdf/Tableau BI Analyst.pdf' },
      { name: 'Meta Data Analyst', issuer: 'Meta', file: '/pdf/Meta Data Analyst.pdf' },
      { name: 'Data Science Fundamentals', issuer: 'BNSP', file: '/pdf/Data Science.pdf' },
    ],
  },
  {
    category: 'Supply Chain',
    icon: '📦',
    items: [
      { name: 'Supply Chain Management', issuer: 'SCM Institute', file: '/pdf/Supply Chain Management.pdf' },
    ],
  },
  {
    category: 'Google Cloud & Google Workspace',
    icon: '☁️',
    items: [
      { name: 'Google Professional Workspace Administrator', issuer: 'Google Cloud', file: '/pdf/Google Workspace Admin.pdf' },
    ],
  },
  {
    category: 'Management & Business',
    icon: '📈',
    items: [
      { name: 'IBM Business Analyst', issuer: 'IBM', file: '/pdf/IBM Business Analyst.pdf' },
      { name: 'Six Sigma Green Belt', issuer: 'Six Sigma', file: '/pdf/Six Sigma Green Belt.pdf' },
      { name: 'Digital Transformation', issuer: 'BNSP / Institute', file: '/pdf/Digital Transformation.pdf' },
    ],
  },
  {
    category: 'Project Management',
    icon: '🎯',
    items: [
      { name: 'Manajemen Proyek Google', issuer: 'Google', file: '/pdf/Manajemen Proyek Google.pdf' },
    ],
  },
  {
    category: 'LC/NC Analytics',
    icon: '⚡',
    items: [
      { name: 'Data Engineering Profesional Certifications', issuer: 'Professional Body', file: '/pdf/Data Engineering Professional.pdf' },
    ],
  },
  {
    category: 'Languages',
    icon: '🌐',
    items: [
      { name: 'EFSET English Certificate (B1 Intermediate)', issuer: 'EFSET', file: '/pdf/EFSET.pdf' },
    ],
  },
]

// Component untuk menangani per-kategori dengan limit 3 & tombol Show More
function CategoryGroup({ group }) {
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
          <a
            key={idx}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-200"
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
              <span>View PDF</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>
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
          Certifications & <span className="text-cyan-400">Continuous Learning</span>
        </h2>
        <p className="text-xs text-gray-400">
          Klik pada sertifikat untuk melihat/mengunduh dokumen PDF resmi.
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
          <CategoryGroup key={group.category} group={group} />
        ))}
      </div>
    </section>
  )
}