import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './About'

const projects = [
  {
    category: 'AI & Google Workspace',
    name: 'End-to-End Recruitment Automation',
    desc: 'Automated the end-to-end hiring workflow using Document AI, DeepSeek, Cloud Run, and Google Workspace, achieving total monthly cost savings of IDR 6.3 million.',
    tags: ['Document AI', 'DeepSeek', 'Cloud Run', 'Google Workspace'],
    tagColors: ['violet', 'cyan', 'sky', 'emerald'],
    accent: '#8b5cf6',
    icon: '🤖',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Data Architecture & GCP',
    name: 'End-to-End Company Data Architecture',
    desc: 'Built end-to-end automated pipelines, data models, and CI/CD workflows from multiple sources to BigQuery and Looker Studio using GCP, Dataform, and GitHub.',
    tags: ['BigQuery', 'GCP', 'Dataform', 'Looker Studio', 'CI/CD'],
    tagColors: ['cyan', 'sky', 'violet', 'emerald', 'gray'],
    accent: '#06b6d4',
    icon: '🏗️',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Supply Chain & Automation',
    name: 'Automation Production Scheduling & Delivery Planning',
    desc: 'Automated the production scheduling workflow using Google Sheets, Apps Script, BigQuery, Dataform, Cloud Scheduler, and Cloud Run, reducing administrative effort by 90%.',
    tags: ['Apps Script', 'BigQuery', 'Dataform', 'Cloud Run', 'Sheets'],
    tagColors: ['violet', 'cyan', 'sky', 'emerald', 'emerald'],
    accent: '#10b981',
    icon: '📦',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Analytics & Inventory Modeling',
    name: 'Dynamic Safety Stock & Customer Analytics',
    desc: 'Automated 18-month rolling calculations for safety stock, reorder point, ABC analysis, customer tiering, and RFM analysis using BigQuery, Cloud Run, and Cloud Scheduler.',
    tags: ['BigQuery', 'Cloud Run', 'Customer Tiering', 'RFM Analysis'],
    tagColors: ['cyan', 'sky', 'violet', 'amber'],
    accent: '#f59e0b',
    icon: '📈',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Web Development & AI',
    name: 'Inventory Management Web App',
    desc: 'Developed a custom web application using Google Apps Script and Gemini to streamline end-to-end inventory management operations.',
    tags: ['Google Apps Script', 'Gemini AI', 'Web App'],
    tagColors: ['violet', 'cyan', 'emerald'],
    accent: '#ec4899',
    icon: '💻',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Lead Generation',
    name: 'Leads Scraping & Extraction',
    desc: 'Built an automated lead scraper using Maps API, Apps Script, and Google Sheets to extract target glass shop leads.',
    tags: ['Maps API', 'Apps Script', 'Google Sheets'],
    tagColors: ['sky', 'violet', 'emerald'],
    accent: '#3b82f6',
    icon: '🗺️',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
]

const moreProjects = [
  {
    category: 'Business Intelligence',
    title: 'Manufacturing Executive Dashboard',
    desc: 'Interactive Looker Studio & Power BI dashboard tracking daily production yield and SCM KPIs.',
    tags: ['Looker Studio', 'Power BI', 'DAX'],
    githubUrl: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Data Pipeline',
    title: 'BigQuery & Dataform Automation',
    desc: 'Scheduled ETL pipelines ingesting Google Sheets API data into partitioned BigQuery tables.',
    tags: ['BigQuery', 'Dataform', 'SQLX', 'GCP'],
    githubUrl: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Web App',
    title: 'Inventory Tracker Web Application',
    desc: 'Custom Apps Script web application integrated with Gemini AI for real-time inventory management.',
    tags: ['Apps Script', 'Gemini AI', 'HTML/JS'],
    githubUrl: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'API Integration',
    title: 'Maps API Leads Extractor',
    desc: 'Automated lead scraper fetching location & contact data directly into structured spreadsheets.',
    tags: ['REST API', 'Maps API', 'Apps Script'],
    githubUrl: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
  {
    category: 'Low Code/No Code',
    title: 'KNIME Data Analytics Workflow',
    desc: 'No-code data transformation and predictive modeling workflows for operational datasets.',
    tags: ['KNIME', 'Analytics', 'Data Transformation'],
    githubUrl: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
  },
]

const categories = ['All', 'Business Intelligence', 'Data Pipeline', 'Web App', 'API Integration', 'Low Code/No Code']

const tagColorMap = {
  cyan: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
  sky: 'text-sky-300 bg-sky-400/10 border-sky-400/20',
  emerald: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  violet: 'text-violet-300 bg-violet-400/10 border-violet-400/20',
  amber: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
  gray: 'text-gray-400 bg-white/5 border-white/10',
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredMoreProjects = activeCategory === 'All'
    ? moreProjects
    : moreProjects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="px-6 py-20 max-w-2xl mx-auto">
      <SectionHeader title="Projects" />

      {/* Top 6 Main Projects */}
      <div className="flex flex-col gap-5 mb-16">
        {projects.map((project, i) => {
          const ref = useReveal(i * 100)
          return (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              ref={ref}
              className="reveal glow-card block rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:border-cyan-500/30"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{project.icon}</span>
                  <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

              <div
                className="h-0.5 w-8 rounded-full mb-3 transition-all duration-300 group-hover:w-16"
                style={{ background: project.accent }}
              />

              <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {project.name}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, j) => (
                  <span
                    key={tag}
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                      tagColorMap[project.tagColors[j]] || tagColorMap.gray
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          )
        })}
      </div>

      {/* More Projects Section (Dibawah Projects Utama) */}
      <div className="pt-8 border-t border-white/10">
        <h3 className="text-lg font-bold text-white mb-2">More Projects</h3>
        <p className="text-xs text-gray-400 mb-6">
          Explore additional technical domain projects linked directly to GitHub repositories.
        </p>

        {/* Filter Tab Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
                activeCategory === cat
                  ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40 font-semibold'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* More Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMoreProjects.map((item, idx) => (
            <a
              key={idx}
              href={item.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group block p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-cyan-300 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}