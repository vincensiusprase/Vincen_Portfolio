import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

type Language = 'EN' | 'ID'

interface Translations {
  [key: string]: string
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (text: string) => string
}

const idTranslations: Translations = {
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
  'Data, Automation & AI': 'Data, Otomasi & AI',
  'Data & Analytics | Automation & AI': 'Data & Analitik | Otomasi & AI',
  'Data & Analytics Manager - Individual Contributor at PT Intan Safety Glass leveraging 5+ years of combined expertise in Supply Chain, Data Engineering, and Digital Transformation. Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.':
    'Manajer Data & Analitik - Kontributor Tunggal di PT Intan Safety Glass dengan pengalaman gabungan lebih dari 5 tahun di bidang Supply Chain, Data Engineering, dan Transformasi Digital. Berfokus pada pembangunan pipeline data end-to-end, optimasi infrastruktur GCP, analitik BI, dan otomasi alur kerja berbasis AI.',
  'Engineer meets': 'Engineer bertemu',
  'Operations meets': 'Operasi bertemu',
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
  '5+ years across supply chain, production operations, and data in manufacturing.': '5+ tahun di seluruh rantai pasokan, operasi produksi, dan data di manufaktur.',
  'Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.': 'Berfokus pada pembangunan pipeline data end-to-end, optimasi infrastruktur GCP, analitik BI, dan rekayasa otomasi alur kerja berbasis AI.',
  'What I am looking for:': 'Yang saya cari:',
  'a company that wants to reduce waste and manual work through data and AI, and needs someone who understands both the operations and the technology to make it happen.': 'perusahaan yang ingin mengurangi pemborosan dan pekerjaan manual melalui data dan AI, dan membutuhkan seseorang yang memahami baik operasi maupun teknologi untuk mewujudkannya.',
  'Open to conversations on data-driven operations, supply chain analytics, and manufacturing digital transformation.': 'Terbuka untuk diskusi tentang operasi berbasis data, analitik rantai pasokan, dan transformasi digital manufaktur.',
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
        'Architected end-to-end automated ELT/ETL pipelines, modern data modeling with Dataform & BigQuery, GCP infrastructure administration, AI automation workflows (Document AI & Apps Script), and executive Looker Studio dashboards.':
          'Merancang pipeline ELT/ETL otomatis end-to-end, pemodelan data modern dengan Dataform & BigQuery, administrasi infrastruktur GCP, alur kerja otomasi AI (Document AI & Apps Script), dan dashboard Looker Studio untuk eksekutif.',
        'Led SCM strategic execution, inventory optimization & demand forecasting models, process digitalization (3+ strategic optimization projects), and integrated Production & Finance workflows via Looker Studio.':
          'Memimpin eksekusi strategis SCM, optimasi persediaan & model peramalan permintaan, digitalisasi proses (3+ proyek optimasi strategis), dan mengintegrasikan alur kerja Produksi & Keuangan melalui Looker Studio.',
        'Implemented continuous improvement initiatives, optimized production processes, and enhanced operational efficiency through data-driven strategies and process reengineering.':
          'Menerapkan inisiatif continuous improvement, mengoptimalkan proses produksi, dan meningkatkan efisiensi operasional melalui strategi berbasis data dan reengineering proses.',
        'Participated in a comprehensive management training program, gaining exposure to various departments and functions within the organization, and contributing to cross-functional projects.':
          'Mengikuti program pelatihan manajemen komprehensif, memperoleh paparan berbagai departemen dan fungsi dalam organisasi, serta berkontribusi pada proyek lintas fungsi.',
        by: 'oleh',
        'Full-time': 'Penuh Waktu',
        'Data & Analytics Manager (Individual Contributor)': 'Manajer Data & Analitik (Kontributor Tunggal)',
        'Supply Chain Management': 'Manajemen Rantai Pasokan',
        'Continuous Improvement Specialist': 'Spesialis Peningkatan Berkelanjutan',
        'Management Trainee': 'Management Trainee',
        'Universitas Pembangunan Nasional "Veteran" Yogyakarta': 'Universitas Pembangunan Nasional "Veteran" Yogyakarta',
        'Halo! Saya VAI, AI Assistant resmi portofolio Vincen. Silakan tanyakan apa saja seputar pengalaman kerja, keahlian teknis, atau proyek-proyek dia!':
          'Halo! Saya VAI, Asisten AI resmi portofolio Vincen. Silakan tanyakan apa saja seputar pengalaman kerja, keahlian teknis, atau proyek-proyek dia!',
        'Geser kartu atau pilih titik navigasi untuk menjelajah proyek lain.':
          'Geser kartu atau pilih titik navigasi untuk menjelajah proyek lainnya.',
        // Hero marquee items
        'Demand Forecasting': 'Peramalan Permintaan',
        'Inventory Optimization': 'Optimasi Persediaan',
        'GCP BigQuery': 'GCP BigQuery',
        'Dataform': 'Dataform',
        'Python': 'Python',
        'Apps Script': 'Apps Script',
        // Experience - certification titles & issuers
        'Associate Data Scientist': 'Associate Data Scientist',
        'Data Analyst': 'Data Analyst',
        'KNIME L1': 'KNIME L1',
        'BNSP': 'BNSP',
        'KNIME': 'KNIME',
        // Chatbot
        'Maaf, Anda telah mencapai batas maksimal (${MAX_MONTHLY_LIMIT} pertanyaan) untuk bulan ini. Silakan hubungi Vincensius secara langsung via LinkedIn atau Email!':
          'Maaf, Anda telah mencapai batas maksimal (${MAX_MONTHLY_LIMIT} pertanyaan) untuk bulan ini. Silakan hubungi Vincensius secara langsung via LinkedIn atau Email!',
        'Model NVIDIA Nemotron sedang sibuk. Silakan tunggu beberapa saat lalu coba lagi.':
                  'Model NVIDIA Nemotron sedang sibuk. Silakan tunggu beberapa saat lalu coba lagi.',
        'AI Assistant sedang mengalami gangguan. Silakan coba lagi nanti.':
          'AI Assistant sedang mengalami gangguan. Silakan coba lagi nanti.',
        'Tanyakan sesuatu... (- + spasi untuk bullet)':
          'Tanyakan sesuatu... (- + spasi untuk bullet)',
        'Kirim': 'Kirim',
                'NVIDIA Nemotron sedang berpikir...': 'NVIDIA Nemotron sedang berpikir...',
      }

const enTranslations: Translations = {
  // Navigation
  About: 'About',
  Experience: 'Experience',
  Projects: 'Projects',
  'Personal Development': 'Personal Development',
  // Hero
  'Download CV': 'Download CV',
  'View Projects': 'View Projects',
  'OPEN TO OPPORTUNITIES': 'OPEN TO OPPORTUNITIES',
  Years: 'Years',
  Delivered: 'Delivered',
  Certifications: 'Certifications',
  Holder: 'Holder',
  'Get in touch': 'Get in touch',
  "Let's build": 'Let\'s build',
  'something great.': 'something great.',
  'Data, Automation & AI': 'Data, Automation & AI',
  'Data & Analytics | Automation & AI': 'Data & Analytics | Automation & AI',
  'Data & Analytics Manager - Individual Contributor at PT Intan Safety Glass leveraging 5+ years of combined expertise in Supply Chain, Data Engineering, and Digital Transformation. Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.':
    'Data & Analytics Manager - Individual Contributor at PT Intan Safety Glass leveraging 5+ years of combined expertise in Supply Chain, Data Engineering, and Digital Transformation. Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.',
  'Engineer meets': 'Engineer meets',
  'Operations meets': 'Operations meets',
  'Bachelor of Chemical Engineering': 'Bachelor of Chemical Engineering',
  'Graduated June 2020': 'Graduated June 2020',
  Education: 'Education',
  Close: 'Close',
  Present: 'Present',
  Contract: 'Contract',
  'Issued by ': 'Issued by ',
  Preview: 'Preview',
  'Show Less': 'Show Less',
  'Show More': 'Show More',
  Demo: 'Demo',
  'More Projects': 'More Projects',
  All: 'All',
  'Certificates & ': 'Certificates & ',
  'Continuous Learning': 'Continuous Learning',
  Skills: 'Skills',
  'Skills & Expertise': 'Skills & Expertise',
  '💡 Klik kartu untuk melihat detail': '💡 Click a card to view details',
  Featured: 'Featured',
  Showcase: 'Showcase',
  '5+ years across supply chain, production operations, and data in manufacturing.': '5+ years across supply chain, production operations, and data in manufacturing.',
  'Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.': 'Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.',
  'What I am looking for:': 'What I am looking for:',
  'a company that wants to reduce waste and manual work through data and AI, and needs someone who understands both the operations and the technology to make it happen.': 'a company that wants to reduce waste and manual work through data and AI, and needs someone who understands both the operations and the technology to make it happen.',
  'Open to conversations on data-driven operations, supply chain analytics, and manufacturing digital transformation.': 'Open to conversations on data-driven operations, supply chain analytics, and manufacturing digital transformation.',
  'Data Analysis & Programming': 'Data Analysis & Programming',
  'DevOps & Version Control': 'DevOps & Version Control',
  'Google Cloud Platform (GCP)': 'Google Cloud Platform (GCP)',
  'BI, Visualization & Spreadsheets': 'BI, Visualization & Spreadsheets',
  'AI, Automation & Low-Code': 'AI, Automation & Low-Code',
  'Supply Chain & Operations': 'Supply Chain & Operations',
  'Digital Transformation & Strategy': 'Digital Transformation & Strategy',
  Languages: 'Languages',
  'Libraries & Toolkits': 'Libraries & Toolkits',
  'Version Control & CI/CD': 'Version Control & CI/CD',
  'Environment & Deployment': 'Environment & Deployment',
  'Data & Analytics': 'Data & Analytics',
  'Compute & Operations': 'Compute & Operations',
  'Workspace Admin & Security': 'Workspace Admin & Security',
  'Other GCP Services': 'Other GCP Services',
  'BI & Analytics Tools': 'BI & Analytics Tools',
  'Advanced Spreadsheets': 'Advanced Spreadsheets',
  'Automation & APIs': 'Automation & APIs',
  'No-Code/Low-Code Analytics': 'No-Code/Low-Code Analytics',
  'Operational Excellence & Quality': 'Operational Excellence & Quality',
  'Warehouse & Material Control': 'Warehouse & Material Control',
  'Planning & Governance': 'Planning & Governance',
  'Strategic Planning & Execution': 'Strategic Planning & Execution',
  'Data & AI': 'Data & AI',
  'Supply Chain': 'Supply Chain',
  'Google Cloud & Google Workspace': 'Google Cloud & Google Workspace',
  'Management & Business': 'Management & Business',
  'Project Management': 'Project Management',
  'LC/NC Analytics': 'LC/NC Analytics',
  'Explore additional technical domain projects linked directly to GitHub repositories.': 'Explore additional technical domain projects linked directly to GitHub repositories.',
  'Klik sertifikat untuk membuka pratinjau dokumen langsung di layar.': 'Click a certificate to open a document preview directly on screen.',
  'Punya proyek data atau automation? Mari diskusi.': 'Have a data or automation project? Let\'s discuss.',
  'Data & Workflow Automation Specialist': 'Data & Workflow Automation Specialist',
  'Demand Forecasting': 'Demand Forecasting',
  'Inventory Optimization': 'Inventory Optimization',
  'Architected end-to-end automated ELT/ETL pipelines, modern data modeling with Dataform & BigQuery, GCP infrastructure administration, AI automation workflows (Document AI & Apps Script), and executive Looker Studio dashboards.':
    'Architected end-to-end automated ELT/ETL pipelines, modern data modeling with Dataform & BigQuery, GCP infrastructure administration, AI automation workflows (Document AI & Apps Script), and executive Looker Studio dashboards.',
  'Led SCM strategic execution, inventory optimization & demand forecasting models, process digitalization (3+ strategic optimization projects), and integrated Production & Finance workflows via Looker Studio.':
    'Led SCM strategic execution, inventory optimization & demand forecasting models, process digitalization (3+ strategic optimization projects), and integrated Production & Finance workflows via Looker Studio.',
  'Implemented continuous improvement initiatives, optimized production processes, and enhanced operational efficiency through data-driven strategies and process reengineering.':
    'Implemented continuous improvement initiatives, optimized production processes, and enhanced operational efficiency through data-driven strategies and process reengineering.',
  'Participated in a comprehensive management training program, gaining exposure to various departments and functions within the organization, and contributing to cross-functional projects.':
    'Participated in a comprehensive management training program, gaining exposure to various departments and functions within the organization, and contributing to cross-functional projects.',
  by: 'by',
  'Full-time': 'Full-time',
  'Data & Analytics Manager (Individual Contributor)': 'Data & Analytics Manager (Individual Contributor)',
  'Supply Chain Management': 'Supply Chain Management',
  'Continuous Improvement Specialist': 'Continuous Improvement Specialist',
  'Management Trainee': 'Management Trainee',
  'Universitas Pembangunan Nasional "Veteran" Yogyakarta': 'Universitas Pembangunan Nasional "Veteran" Yogyakarta',
    // Chatbot
    'Halo! Saya VAI, AI Assistant resmi portofolio Vincen. Silakan tanyakan apa saja seputar pengalaman kerja, keahlian teknis, atau proyek-proyek dia!':
      'Hello! I am VAI, the official AI Assistant for Vincen\'s portfolio. Feel free to ask anything about work experience, technical skills, or projects!',
    'Geser kartu atau pilih titik navigasi untuk menjelajah proyek lain.':
      'Swipe cards or select navigation dots to explore other projects.',
    'Maaf, Anda telah mencapai batas maksimal (${MAX_MONTHLY_LIMIT} pertanyaan) untuk bulan ini. Silakan hubungi Vincensius secara langsung via LinkedIn atau Email!':
      'Sorry, you have reached the maximum limit (${MAX_MONTHLY_LIMIT} questions) for this month. Please contact Vincensius directly via LinkedIn or Email!',
    'Model NVIDIA Nemotron sedang sibuk. Silakan tunggu beberapa saat lalu coba lagi.':
          'Model NVIDIA Nemotron is busy. Please wait a moment and try again.',
    'AI Assistant sedang mengalami gangguan. Silakan coba lagi nanti.':
      'AI Assistant is experiencing issues. Please try again later.',
    'Tanyakan sesuatu... (- + spasi untuk bullet)':
      'Ask something... (- + space for bullet)',
    'Kirim': 'Send',
        'NVIDIA Nemotron sedang berpikir...': 'NVIDIA Nemotron is thinking...',
    'VAI': 'VAI',
    'Ask Assistant': 'Ask Assistant',
    'AI Assistant': 'AI Assistant',
        'Powered by NVIDIA | Quota: {remainingQuota}/{MAX_MONTHLY_LIMIT}':
          'Powered by NVIDIA | Quota: {remainingQuota}/{MAX_MONTHLY_LIMIT}',
        'Jawaban API kosong': 'API response is empty',
            // Technical skills & certifications (same in both languages)
            'GCP BigQuery': 'GCP BigQuery',
            'Dataform': 'Dataform',
            'Python': 'Python',
            'Apps Script': 'Apps Script',
            'Associate Data Scientist': 'Associate Data Scientist',
            'Data Analyst': 'Data Analyst',
            'KNIME L1': 'KNIME L1',
            'BNSP': 'BNSP',
            'KNIME': 'KNIME',
                }

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('portfolio-language') as Language) || 'EN')

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
