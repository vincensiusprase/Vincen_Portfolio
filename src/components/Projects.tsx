import React, { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.ts'
import { SectionHeader } from './About.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

// Type definitions for project data
interface ProjectTag {
  tag: string
  color: string
}

interface FeaturedProject {
  id: string
  category: string
  name: string
  desc: string
  tags: string[]
  accent: string
  icon: string
  link: string
  videoUrl?: string
  mainImage: string
  images: string[]
}

interface MoreProject {
  category: string
  title: string
  desc: string
  tags: string[]
  githubUrl: string
}

interface ImageSlideshowModalProps {
  project: FeaturedProject | null
  onClose: () => void
}

interface VideoModalProps {
  selectedVideo: { url: string; name: string } | null
  onClose: () => void
  language: 'ID' | 'EN'
}

// Daftar proyek unggulan
const featuredProjects: FeaturedProject[] = [
  {
    id: 'recruitment-automation',
    category: 'AI & Google Workspace',
    name: 'End-to-End Recruitment Automation',
    desc: 'Automated the end-to-end hiring workflow using Document AI, DeepSeek, Cloud Run, and Google Workspace, achieving total monthly cost savings of IDR 6.3 million.',
    tags: ['Document AI', 'DeepSeek', 'Cloud Run', 'Google Workspace'],
    accent: '#8b5cf6',
    icon: '🤖',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
    videoUrl: '/videos/recruitment-flow.mp4',
    mainImage: '/images/Recruitment.jpg',
    images: [
      '/images/Recruitment.jpg'
    ],
  },
  {
    id: 'data-architecture',
    category: 'Data Architecture',
    name: 'End-to-End FMCG Data Architecture',
    desc: 'Built end-to-end automated data pipelines, data models, and CI/CD workflows to ingest data from multiple sources into BigQuery and Looker Studio. Implemented Row-Level Security (RLS) for granular access control and developed Conversational Analytics to enable deep-dive analysis.',
    tags: ['BigQuery', 'GCP', 'Looker Studio', 'CI/CD'],
    accent: '#06b6d4',
    icon: '☁️',
    link: 'https://github.com/vincensiusprase/fmcg-dataform-pipeline',
    videoUrl: '/videos/KNIME.mp4',
    mainImage: '/images/FMCG/fmcg-cover.png',
    images: [
      '/images/FMCG/fmcg-cover.png',
      '/images/FMCG/fmcg-compiled-graph.png',
      '/images/FMCG/convo-example-1.png',
      '/images/FMCG/convo-example-2.png',
      '/images/FMCG/looker_full_access.png',
      '/images/FMCG/looker_rls_access.png',
    ],
  },
  {
    id: 'rag',
    category: 'AI Engineering',
    name: 'RAG FMEA Maintenance Bot',
    desc: 'A Discord bot for searching and analyzing Failure Mode and Effects Analysis (FMEA) data. It retrieves FMEA records and corrective steps from Vertex AI Discovery Engine, then answers using a resilient LLM fallback architecture: Nemotron is tried first, and if that request fails the bot automatically falls back to DeepSeek, keeping the bot responsive even when the primary model is unavailable. Per-session conversation history is stored in Google Cloud Firestore.',
    tags: ['Python', 'Nemotron', 'DeepSeek', 'RAG', 'Fallback LLM'],
    accent: '#10b981',
    icon: '📦',
    link: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/05_ai_engineer/rag_fmea',
    mainImage: '/images/RAG/FMEA-Cover.png',
    images: [
      '/images/RAG/FMEA-Cover.png',
      '/images/RAG/RAG-FMEA.jpeg',
      '/images/RAG/Evaluasi-RAG-FMEA.jpeg',
      '/images/RAG/convo-example-id.png',
      '/images/RAG/convo-example-en.png',
    ],
  },
  {
    id: 'safety-stock',
    category: 'Web App App Script',
    name: 'Inventory Management',
    desc: 'Inventory management web app built with Google App Script, Inbound and Outbound inventory tracking, and automated safety stock calculations using RFM analysis and customer tiering.',
    tags: ['Google App Script', 'Google Sheets'],
    accent: '#f59e0b',
    icon: '📈',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
    mainImage: '/images/IM Web App/IM Web App Cover.svg',
    images: [
      '/images/IM Web App/IM Web App Cover.svg',
      '/images/IM Web App/Dashboard Kaca.png',
      '/images/IM Web App/Lot Number.png',
      '/images/IM Web App/Tracking No Pallet.png',
      '/images/IM Web App/Form Masuk Kaca.png',
      '/images/IM Web App/Form Keluar Kaca.png',
      '/images/IM Web App/Riwayat Transaksi Kaca.png',
    ],
  },
]

const moreProjects: MoreProject[] = [
  {
    category: 'Business Intelligence',
    title: 'Employee Performance Analytics',
    desc: 'Comprehensive overview of employee performance, combining key HR metrics into one intuitive platform.',
    tags: ['Power BI', 'DAX'],
    githubUrl: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/02_business_intelligence/employee-performance-analytics',
  },
  {
    category: 'Business Intelligence',
    title: 'Procurement Analytics',
    desc: 'Comprehensive overview of procurement activities, combining key procurement metrics into one intuitive platform.',
    tags: ['Power BI', 'DAX'],
    githubUrl: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/02_business_intelligence/procurement-analytics',
  },
  {
    category: 'Data Engineering',
    title: 'Streaming OEE Calculation Simulation Pipeline',
    desc: 'OEE calculation and streaming data ingestion from Pub Sub to BigQuery using Dataform and Looker Studio.',
    tags: ['BigQuery', 'Pub Sub', 'SQLX', 'Looker Studio'],
    githubUrl: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/03_data_engineering/streaming-pipeline-manufacture',
  },
  {
    category: 'Data Science',
    title: 'Residential Heating Oil Consumption Forecasting',
    desc: 'An end-to-end predictive analytics workflow built on KNIME Analytics Platform to forecast residential heating oil consumption.',
    tags: ['KNIME', 'Machine Learning'],
    githubUrl: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/03_low_code/heating-oil-prediction',
  },
  {
    category: 'AI Engineering',
    title: 'RAG FMEA Maintenance Bot',
    desc: 'A Discord bot for searching and analyzing Failure Mode and Effects Analysis (FMEA) data. It retrieves FMEA records and corrective steps from Vertex AI Discovery Engine, then answers using a resilient LLM fallback architecture: Nemotron is tried first, and if that request fails the bot automatically falls back to DeepSeek, keeping the bot responsive even when the primary model is unavailable. Per-session conversation history is stored in Google Cloud Firestore.',
    tags: ['Python', 'Nemotron', 'DeepSeek', 'RAG', 'Fallback LLM'],
    githubUrl: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/05_ai_engineer/rag_fmea',
  },
]

const projectToolLogos: Record<string, string> = {
  BigQuery: '/images/tools/bigquery.svg',
  GCP: '/images/tools/google_cloud-icon.svg',
  'Cloud Run': '/images/tools/google_cloud_run-icon.svg',
  Python: '/images/tools/python-icon.svg',
  'Document AI': '/images/tools/Document%20AI.svg',
  'Looker Studio': '/images/tools/Looker.svg',
  'Pub Sub': '/images/tools/PubSub.svg',
  'Cloud Scheduler': '/images/tools/Cloud%20Scheduler.svg',
  'Vertex AI': '/images/tools/Vertex%20AI.svg',
  'Google Sheets': '/images/tools/google-sheets.svg',
  'Google App Script': '/images/tools/google-app-script.svg',
  'DeepSeek': '/images/tools/deepseek.svg',
  'LangChain': '/images/tools/LangChain.svg',
  'Nemotron': '/images/tools/nemotron.svg',
  'KNIME': '/images/tools/knime.svg',
  'Power BI': '/images/tools/powerbi.svg',
  'DAX': '/images/tools/DAX.svg',
}

const categories = ['All', 'Business Intelligence', 'Data Engineering', 'Data Science', 'AI Engineering']

// Modal Component untuk Slideshow Galeri Foto Proyek
function ImageSlideshowModalContent({ project, onClose }: ImageSlideshowModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!project || !project.images || project.images.length === 0) return null

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % project.images.length)
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-sm font-bold text-[#16264A]">{project.name}</h3>
            <p className="text-[10px] text-slate-500">
              Image {currentIndex + 1} of {project.images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-[#16264A] bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
          >
            ✕
          </button>
        </div>

        <div className="relative flex items-center justify-center bg-slate-100 p-4 min-h-[300px] max-h-[60vh]">
          <img
            src={project.images[currentIndex]}
            alt={`${project.name} slide ${currentIndex + 1}`}
            className="max-h-[50vh] w-auto object-contain rounded-lg border border-slate-200 shadow-md"
            onError={(e) => {
              e.target.src = '/images/Vincen Photo.png'
            }}
          />

          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-slate-300 text-[#16264A] hover:bg-[#16264A] hover:text-white transition-all text-xs cursor-pointer shadow-md"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-slate-300 text-[#16264A] hover:bg-[#16264A] hover:text-white transition-all text-xs cursor-pointer shadow-md"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {project.images.length > 1 && (
          <div className="flex justify-center gap-1.5 p-3 bg-slate-50 border-t border-slate-200">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#16264A] w-5'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Image Slideshow Modal with Error Boundary
 * Wraps the image slideshow content with error handling
 */
function ImageSlideshowModal({ project, onClose }: ImageSlideshowModalProps) {
  return (
    <ErrorBoundary
      title="Image Gallery Error"
      message="Unable to load the project images. Please try again."
      fallback={(error, errorInfo) => (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
          onClick={onClose}
        >
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#16264A] mb-2">Image Gallery Error</h3>
            <p className="text-sm text-slate-600 mb-4">Unable to load the project images. Please try again.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#16264A] text-white text-sm font-semibold rounded-xl hover:bg-[#4A5C8A] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    >
      <ImageSlideshowModalContent project={project} onClose={onClose} />
    </ErrorBoundary>
  )
}

export default function Projects() {
  const { t, language } = useLanguage()
  const sectionRef = useReveal()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedGalleryProject, setSelectedGalleryProject] = useState<FeaturedProject | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; name: string } | null>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.project-reveal')
    if (!cards) return

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [activeCategory, sectionRef])

  const filteredMoreProjects =
    activeCategory === 'All'
      ? moreProjects
      : moreProjects.filter((p) => p.category === activeCategory)

  return (
    <section ref={sectionRef} id="projects" className="reveal-section px-6 py-20 max-w-6xl mx-auto relative">
      <SectionHeader title="Projects" />

      <div className="reveal-item grid grid-cols-1 lg:grid-cols-[minmax(10rem,0.7fr)_minmax(0,2fr)] gap-6 lg:gap-8 mb-16">
        <div className="flex flex-col items-start lg:pt-5">
          <h2 className="text-2xl sm:text-3xl font-black text-[#16264A] tracking-tight leading-tight">
            {t('Featured')}<br />
            <span className="text-[#4A5C8A]">{t('Showcase')}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-3 max-w-xs">
            {language === 'ID'
              ? 'Jelajahi proyek pilihan dan lihat detail setiap karya.'
              : 'Explore selected projects and view the details behind each one.'}
          </p>
          <a
            href="#more-projects"
            className="warm-button mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            {language === 'ID' ? 'Lihat Semua' : 'See All'}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="featured-projects-scroll hero-surface rounded-[1.75rem] border border-[#F6DCC6] p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="project-reveal group soft-card flex min-w-0 flex-col rounded-[1.5rem] p-3.5 sm:p-4 shadow-sm transition-shadow hover:shadow-lg hover:shadow-orange-900/10"
              >
                <button
                  type="button"
                  onClick={() => setSelectedGalleryProject(project)}
                  className="relative mb-4 block aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#FFF7F0] text-left"
                  aria-label={`${language === 'ID' ? 'Buka galeri' : 'Open gallery'}: ${project.name}`}
                >
                  <img
                    src={project.mainImage}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/images/Vincen Photo.png'
                    }}
                  />
                  <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#16264A] shadow-sm backdrop-blur">
                    <span aria-hidden="true">{project.icon}</span>
                    {t(project.category)}
                  </span>
                </button>

                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold leading-snug text-[#16264A]">
                      {project.name}
                    </h3>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {project.images.length} {language === 'ID' ? 'gambar' : 'images'}
                    </span>
                  </div>
                  <p className="featured-project-desc mb-3 text-[11px] leading-relaxed text-slate-600">
                    {language === 'ID'
                      ? project.desc
                        .replace('Automated the end-to-end hiring workflow', 'Mengotomatiskan alur rekrutmen end-to-end')
                        .replace('Built end-to-end automated pipelines', 'Membangun pipeline otomatis end-to-end')
                        .replace('Automated 18-month rolling calculations', 'Mengotomatiskan kalkulasi rolling 18 bulan')
                        .replace('A Discord bot for searching and analyzing', 'Bot Discord untuk mencari dan menganalisis')
                      : project.desc}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="project-tag inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold"
                      >
                        {projectToolLogos[tag] && (
                          <img src={projectToolLogos[tag]} alt="" className="h-3 w-3 object-contain" />
                        )}
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedGalleryProject(project)}
                      className="text-[10px] font-bold text-[#4A5C8A] transition-colors hover:text-[#16264A]"
                    >
                      📷 {language === 'ID' ? 'Lihat Galeri' : 'View Gallery'}
                    </button>
                    <div className="flex items-center gap-3">
                      {project.videoUrl && (
                        <button
                          type="button"
                          onClick={() => setSelectedVideo({ url: project.videoUrl, name: project.name })}
                          className="text-[10px] font-bold text-[#4A5C8A] transition-colors hover:text-[#16264A]"
                        >
                          ▶ {language === 'ID' ? 'Demo' : 'Demo'}
                        </button>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#16264A] transition-colors hover:text-[#F97316]"
                      >
                        GitHub
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* MORE PROJECTS SECTION */}
      <div id="more-projects" className="reveal-item pt-8 border-t border-slate-200">
        <h3 className="text-base font-bold text-[#16264A] mb-1">{t('More Projects')}</h3>
        <p className="text-xs text-slate-500 mb-6">
          {t('Explore additional technical domain projects linked directly to GitHub repositories.')}
        </p>

        {/* Filter Tab Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#F97316] text-white border-[#F97316] font-semibold shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-600 border-[#F0E4DA] hover:bg-[#FFEDD5]/60 hover:text-[#F97316]'
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        {/* More Projects Grid (2 Kolom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMoreProjects.map((item, idx) => (
            <a
              key={idx}
              href={item.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="project-reveal group soft-card block p-4 rounded-2xl hover:border-[#F97316] hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-[#4A5C8A] uppercase tracking-wider">
                  {t(item.category)}
                </span>
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#16264A] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-[#16264A] transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
                {language === 'ID'
                  ? item.desc.replace('Comprehensive overview', 'Ikhtisar komprehensif')
                    .replace('An end-to-end predictive analytics workflow', 'Workflow analitik prediktif end-to-end')
                    .replace('OEE calculation and streaming data ingestion', 'Kalkulasi OEE dan ingestion data streaming')
                  : item.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="project-tag inline-flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded-full border">
                    {projectToolLogos[tag] && (
                      <img src={projectToolLogos[tag]} alt="" className="h-3 w-3 object-contain" />
                    )}
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* MODAL POPUP SLIDESHOW GALERI FOTO */}
      <ImageSlideshowModal
        project={selectedGalleryProject}
        onClose={() => setSelectedGalleryProject(null)}
      />

      {/* MODAL POPUP VIDEO DEMO */}
      {selectedVideo && (
        <VideoModal
          selectedVideo={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          language={language}
        />
      )}
    </section>
  )
}

// Video Modal Content Component
function VideoModalContent({ selectedVideo, onClose, language }: VideoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-bold text-[#16264A]">
            {selectedVideo.name} — {language === 'ID' ? 'Demo Animasi' : 'Demo Animation'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-[#16264A] text-xs bg-white hover:bg-slate-100 border border-slate-200 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            ✕
          </button>
        </div>
        <div className="p-4 bg-slate-100 flex justify-center">
          <video
            src={selectedVideo.url}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full rounded-xl border border-slate-200 shadow-md max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Video Modal with Error Boundary
 * Wraps the video modal content with error handling
 */
function VideoModal({ selectedVideo, onClose, language }: VideoModalProps) {
  return (
    <ErrorBoundary
      title="Video Playback Error"
      message="Unable to load the video. The file may be missing or in an unsupported format."
      fallback={(error, errorInfo) => (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
          onClick={onClose}
        >
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#16264A] mb-2">Video Playback Error</h3>
            <p className="text-sm text-slate-600 mb-4">Unable to load the video. The file may be missing or in an unsupported format.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#16264A] text-white text-sm font-semibold rounded-xl hover:bg-[#4A5C8A] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    >
      <VideoModalContent selectedVideo={selectedVideo} onClose={onClose} language={language} />
    </ErrorBoundary>
  )
}