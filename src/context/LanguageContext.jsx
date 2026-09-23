import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const idTranslations = {
  About: 'Tentang',
  Experience: 'Pengalaman',
  Projects: 'Proyek',
  'Personal Development': 'Pengembangan Diri',
  'Download CV': 'Unduh CV',
  'View Projects': 'Lihat Proyek',
  'OPEN TO OPPORTUNITIES': 'TERBUKA UNTUK PELUANG',
  Years: 'Tahun',
  Delivered: 'Terselesaikan',
  Certifications: 'Sertifikasi',
  Holder: 'Pemilik',
  'Get in touch': 'Mari terhubung',
  "Let's build": 'Mari membangun',
  'something great.': 'sesuatu yang hebat.',
  'Data Analyst': 'Analis Data',
  'Data Analyst at PT Intan Safety Glass leveraging 5+ years of combined expertise in Supply Chain, Data Engineering, and Digital Transformation. Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.':
    'Analis Data di PT Intan Safety Glass dengan pengalaman gabungan lebih dari 5 tahun di bidang Supply Chain, Data Engineering, dan Transformasi Digital. Berfokus pada pembangunan pipeline data end-to-end, optimasi infrastruktur GCP, analitik BI, dan otomasi alur kerja berbasis AI.',
  'Engineer meets': 'Engineer bertemu',
  'Bachelor of Chemical Engineering': 'Sarjana Teknik Kimia',
  'Graduated June 2020': 'Lulus Juni 2020',
  Education: 'Pendidikan',
  Close: 'Tutup',
  Present: 'Sekarang',
  Contract: 'Kontrak',
  'Issued by ': 'Diterbitkan oleh ',
  Preview: 'Pratinjau',
  'Show Less': 'Tampilkan Lebih Sedikit',
  'Show More': 'Tampilkan Lebih Banyak',
  Demo: 'Demo',
  'More Projects': 'Proyek Lainnya',
  All: 'Semua',
  'Certificates & ': 'Sertifikat & ',
  'Continuous Learning': 'Pembelajaran Berkelanjutan',
  Skills: 'Keahlian',
  'Skills & Expertise': 'Keahlian & Spesialisasi',
  '💡 Klik kartu untuk melihat detail': '💡 Klik kartu untuk melihat detail',
  Featured: 'Pilihan Utama',
  Showcase: 'Proyek Unggulan',
  'Data Analysis & Programming': 'Analisis Data & Pemrograman',
  'DevOps & Version Control': 'DevOps & Kontrol Versi',
  'Google Cloud Platform (GCP)': 'Google Cloud Platform (GCP)',
  'BI, Visualization & Spreadsheets': 'BI, Visualisasi & Spreadsheet',
  'AI, Automation & Low-Code': 'AI, Otomasi & Low-Code',
  'Supply Chain & Operations': 'Supply Chain & Operasi',
  'Digital Transformation & Strategy': 'Transformasi Digital & Strategi',
  Languages: 'Bahasa',
  'Libraries & Toolkits': 'Pustaka & Toolkit',
  'Version Control & CI/CD': 'Kontrol Versi & CI/CD',
  'Environment & Deployment': 'Lingkungan & Deployment',
  'Data & Analytics': 'Data & Analitik',
  'Compute & Operations': 'Komputasi & Operasi',
  'Workspace Admin & Security': 'Admin Workspace & Keamanan',
  'Other GCP Services': 'Layanan GCP Lainnya',
  'BI & Analytics Tools': 'Tool BI & Analitik',
  'Advanced Spreadsheets': 'Spreadsheet Tingkat Lanjut',
  'Automation & APIs': 'Otomasi & API',
  'No-Code/Low-Code Analytics': 'Analitik No-Code/Low-Code',
  'Operational Excellence & Quality': 'Keunggulan Operasional & Kualitas',
  'Warehouse & Material Control': 'Kontrol Gudang & Material',
  'Planning & Governance': 'Perencanaan & Tata Kelola',
  'Strategic Planning & Execution': 'Perencanaan & Eksekusi Strategis',
  'Data & AI': 'Data & AI',
  'Supply Chain': 'Supply Chain',
  'Google Cloud & Google Workspace': 'Google Cloud & Google Workspace',
  'Management & Business': 'Manajemen & Bisnis',
  'Project Management': 'Manajemen Proyek',
  'LC/NC Analytics': 'Analitik LC/NC',
  'Explore additional technical domain projects linked directly to GitHub repositories.':
    'Jelajahi proyek teknis lainnya yang terhubung langsung ke repositori GitHub.',
  'Klik sertifikat untuk membuka pratinjau dokumen langsung di layar.':
    'Klik sertifikat untuk membuka pratinjau dokumen langsung di layar.',
  'Punya proyek data atau automation? Mari diskusi.':
    'Punya proyek data atau otomasi? Mari berdiskusi.',
  'Data & Workflow Automation Specialist': 'Spesialis Data & Otomasi Workflow',
  'Demand Forecasting': 'Peramalan Permintaan',
  'Inventory Optimization': 'Optimasi Persediaan',
  'Halo! Saya VAI, AI Assistant resmi portofolio Vincen. Silakan tanyakan apa saja seputar pengalaman kerja, keahlian teknis, atau proyek-proyek dia!':
    'Halo! Saya VAI, AI Assistant resmi portofolio Vincen. Silakan tanyakan tentang pengalaman kerja, keahlian teknis, atau proyek-proyek Vincen!',
  'Geser kartu atau pilih titik navigasi untuk menjelajah proyek lain.':
    'Geser kartu atau pilih titik navigasi untuk menjelajah proyek lainnya.',
}

const enTranslations = {
  'Halo! Saya VAI, AI Assistant resmi portofolio Vincen. Silakan tanyakan apa saja seputar pengalaman kerja, keahlian teknis, atau proyek-proyek dia!':
    'Hello! I am VAI, the official AI Assistant for Vincen’s portfolio. Feel free to ask about his work experience, technical skills, or projects!',
  'Klik sertifikat untuk membuka pratinjau dokumen langsung di layar.':
    'Click a certificate to open a document preview directly on screen.',
  'Punya proyek data atau automation? Mari diskusi.':
    'Have a data or automation project? Let’s discuss.',
  'Explore additional technical domain projects linked directly to GitHub repositories.':
    'Explore additional technical domain projects linked directly to GitHub repositories.',
  'Geser kartu atau pilih titik navigasi untuk menjelajah proyek lain.':
    'Swipe the card or select a navigation dot to explore more projects.',
  'Featured': 'Featured',
  Showcase: 'Showcase',
  'Engineer meets': 'Engineer meets',
  'Skills & Expertise': 'Skills & Expertise',
  '💡 Klik kartu untuk melihat detail': '💡 Click a card to view details',
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') || 'EN')

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language.toLowerCase()
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (text) => language === 'ID'
      ? idTranslations[text] || text
      : enTranslations[text] || text,
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
