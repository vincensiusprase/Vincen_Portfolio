import React, { useState } from 'react'
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
  tagColors: string[]
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

// Daftar Proyek Utama (Carousel Slider)
const featuredProjects: FeaturedProject[] = [
  {
    id: 'recruitment-automation',
    category: 'AI & Google Workspace',
    name: 'End-to-End Recruitment Automation',
    desc: 'Automated the end-to-end hiring workflow using Document AI, DeepSeek, Cloud Run, and Google Workspace, achieving total monthly cost savings of IDR 6.3 million.',
    tags: ['Document AI', 'DeepSeek', 'Cloud Run', 'Google Workspace'],
    tagColors: ['violet', 'cyan', 'sky', 'emerald'],
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
    category: 'Data Architecture & GCP',
    name: 'End-to-End Company Data Architecture',
    desc: 'Built end-to-end automated pipelines, data models, and CI/CD workflows from multiple sources to BigQuery and Looker Studio using GCP, Dataform, and GitHub.',
    tags: ['BigQuery', 'GCP', 'Dataform', 'Looker Studio', 'CI/CD'],
    tagColors: ['cyan', 'sky', 'violet', 'emerald', 'gray'],
    accent: '#06b6d4',
    icon: '☁️',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
    videoUrl: '/videos/KNIME.mp4',
    mainImage: '/images/Data Architecture.jpg',
    images: [
      '/images/Data Architecture.jpg'
    ],
  },
  {
    id: 'rag',
    category: 'AI Engineering',
    title: 'RAG FMEA Maintenance Bot',
    desc: 'A Discord bot for searching and analyzing Failure Mode and Effects Analysis (FMEA) data. The bot retrieves FMEA records and corrective steps from Vertex AI Discovery Engine, uses DeepSeek to generate responses, and stores per-session conversation history in Google Cloud Firestore.',
    tags: ['Python', 'LangChain', 'OpenAI API', 'RAG'],
    tagColors: ['violet', 'cyan', 'sky', 'emerald', 'emerald'],
    accent: '#10b981',
    icon: '📦',
    link: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/05_ai_engineer/rag_fmea',
    mainImage: '/images/FMEA-Cover.png',
    images: [
      '/images/Evaluasi_RAG_FMEA.jpeg',

    ],
  },
  {
    id: 'safety-stock',
    category: 'Analytics & Inventory Modeling',
    name: 'Dynamic Safety Stock & Customer Analytics',
    desc: 'Automated 18-month rolling calculations for safety stock, reorder point, ABC analysis, customer tiering, and RFM analysis using BigQuery, Cloud Run, and Cloud Scheduler.',
    tags: ['BigQuery', 'Cloud Run', 'Customer Tiering', 'RFM Analysis'],
    tagColors: ['cyan', 'sky', 'violet', 'amber'],
    accent: '#f59e0b',
    icon: '📈',
    link: 'https://github.com/vincensiusprase/App_Script_Personal_Project',
    mainImage: '/images/RAG FMEA.jpeg',
    images: [
      '/images/RAG FMEA.jpeg',
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
    desc: 'A Discord bot for searching and analyzing Failure Mode and Effects Analysis (FMEA) data. The bot retrieves FMEA records and corrective steps from Vertex AI Discovery Engine, uses DeepSeek to generate responses, and stores per-session conversation history in Google Cloud Firestore.',
    tags: ['Python', 'LangChain', 'OpenAI API', 'RAG'],
    githubUrl: 'https://github.com/vincensiusprase/portofolio_recap/tree/main/05_ai_engineer/rag_fmea',
  },
]

const categories = ['All', 'Business Intelligence', 'Data Engineering', 'Data Science', 'AI Engineering']

const tagColorMap = {
  cyan: 'text-cyan-900 bg-cyan-100 border-cyan-200',
  sky: 'text-sky-900 bg-sky-100 border-sky-200',
  emerald: 'text-emerald-900 bg-emerald-100 border-emerald-200',
  violet: 'text-violet-900 bg-violet-100 border-violet-200',
  amber: 'text-amber-900 bg-amber-100 border-amber-200',
  gray: 'text-slate-700 bg-slate-100 border-slate-200',
}

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
            <h3 className="text-sm font-bold text-[#1F3A5F]">{project.name}</h3>
            <p className="text-[10px] text-slate-500">
              Image {currentIndex + 1} of {project.images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-[#1F3A5F] bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-slate-300 text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white transition-all text-xs cursor-pointer shadow-md"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-slate-300 text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white transition-all text-xs cursor-pointer shadow-md"
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
                    ? 'bg-[#1F3A5F] w-5'
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
            <h3 className="text-lg font-bold text-[#1F3A5F] mb-2">Image Gallery Error</h3>
            <p className="text-sm text-slate-600 mb-4">Unable to load the project images. Please try again.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1F3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#3D5A80] transition-colors cursor-pointer"
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
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedGalleryProject, setSelectedGalleryProject] = useState<FeaturedProject | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; name: string } | null>(null)

  const currentProject = featuredProjects[activeIndex]

  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const filteredMoreProjects =
    activeCategory === 'All'
      ? moreProjects
      : moreProjects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="px-6 py-20 max-w-6xl mx-auto relative">
      <SectionHeader title="Projects" />

      {/* HEADER CAROUSEL: Judul & Tombol Navigasi Panah */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-[#1F3A5F] tracking-tight">
            {t('Featured')} <span className="text-[#3D5A80]">{t('Showcase')}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {t('Geser kartu atau pilih titik navigasi untuk menjelajah proyek lain.')}
          </p>
        </div>

        {/* Tombol Geser Kiri / Kanan */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevSlide}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-[#1F3A5F] hover:text-white text-[#1F3A5F] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            title="Previous Project"
          >
            ◀
          </button>
          <button
            onClick={handleNextSlide}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-[#1F3A5F] hover:text-white text-[#1F3A5F] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            title="Next Project"
          >
            ▶
          </button>
        </div>
      </div>

      {/* FEATURED PROJECT SLIDER CARD */}
      <div className="relative rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-md overflow-hidden mb-8 transition-all duration-300">

        {/* GAMBAR PREVIEW UTAMA PNG DI ATAS KARTU PROYEK */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-6 group">
          <img
            src={currentProject.mainImage}
            alt={currentProject.name}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/images/Vincen Photo.png'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

          {/* Badge Kategori & Video Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-xs font-bold text-[#1F3A5F] bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <span>{currentProject.icon}</span>
              {t(currentProject.category)}
            </span>
          </div>

          {currentProject.videoUrl && (
            <button
              type="button"
              onClick={() => setSelectedVideo({ url: currentProject.videoUrl, name: currentProject.name })}
              className="absolute bottom-3 right-3 text-xs bg-[#1F3A5F] hover:bg-[#3D5A80] text-white font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md cursor-pointer"
            >
              <span>▶</span> {language === 'ID' ? 'Putar Demo Video' : 'Play Video Demo'}
            </button>
          )}
        </div>

        {/* DETAILS PROYEK */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1F3A5F] mb-2">
              {currentProject.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              {language === 'ID'
                ? currentProject.desc
                  .replace('Automated the end-to-end hiring workflow', 'Mengotomatiskan alur rekrutmen end-to-end')
                  .replace('Built end-to-end automated pipelines', 'Membangun pipeline otomatis end-to-end')
                  .replace('Automated 18-month rolling calculations', 'Mengotomatiskan kalkulasi rolling 18 bulan')
                  .replace('A Discord bot for searching and analyzing', 'Bot Discord untuk mencari dan menganalisis')
                : currentProject.desc}
            </p>
          </div>

          <a
            href={currentProject.link}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-[#1F3A5F] hover:text-white hover:border-[#1F3A5F] text-xs font-semibold text-[#1F3A5F] transition-all shadow-2xs"
          >
            <span>GitHub Repo</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* TAGS TECH STACK & BUTTON GALERI */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {currentProject.tags.map((tag, idx) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                  tagColorMap[currentProject.tagColors[idx]] || tagColorMap.gray
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSelectedGalleryProject(currentProject)}
            className="text-xs text-[#3D5A80] hover:text-[#1F3A5F] flex items-center gap-1.5 font-bold transition-colors cursor-pointer"
          >
            <span>📷 {language === 'ID' ? 'Lihat Galeri Lengkap' : 'View Full Gallery'} ({currentProject.images ? currentProject.images.length : 0})</span>
          </button>
        </div>
      </div>

      {/* INDIKATOR NAVIGASI DOTS SLIDER */}
      <div className="flex justify-center items-center gap-2 mb-16">
        {featuredProjects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              activeIndex === idx
                ? 'w-8 bg-[#1F3A5F]'
                : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
            title={p.name}
          />
        ))}
      </div>

      {/* MORE PROJECTS SECTION */}
      <div className="pt-8 border-t border-slate-200">
        <h3 className="text-base font-bold text-[#1F3A5F] mb-1">{t('More Projects')}</h3>
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
                  ? 'bg-[#1F3A5F] text-white border-[#1F3A5F] font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-[#1F3A5F]'
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
              className="group block p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#3D5A80] hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-[#3D5A80] uppercase tracking-wider">
                  {t(item.category)}
                </span>
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1F3A5F] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-[#1F3A5F] transition-colors">
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
                  <span key={tag} className="text-[9px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
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
          <h3 className="text-sm font-bold text-[#1F3A5F]">
            {selectedVideo.name} — {language === 'ID' ? 'Demo Animasi' : 'Demo Animation'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-[#1F3A5F] text-xs bg-white hover:bg-slate-100 border border-slate-200 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-xs"
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
            <h3 className="text-lg font-bold text-[#1F3A5F] mb-2">Video Playback Error</h3>
            <p className="text-sm text-slate-600 mb-4">Unable to load the video. The file may be missing or in an unsupported format.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1F3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#3D5A80] transition-colors cursor-pointer"
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