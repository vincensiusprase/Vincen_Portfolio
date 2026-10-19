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
  more: 'lainnya',
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
  'Core Services': 'Layanan Utama',
  'Services I can provide to help your business grow': 'Layanan yang dapat saya berikan untuk membantu bisnis Anda berkembang',
  'GCP Data Engineer': 'Data Engineer GCP',
  'GCP Ingestion (Pub/Sub), BigQuery Warehousing, Dataform Modeling, & Cloud Orchestration': 'Ingestion GCP (Pub/Sub), Data Warehouse BigQuery, Pemodelan Dataform, & Orkestrasi Cloud',
  'Descriptive, Diagnostic, Predictive, and Prescriptive Analytics': 'Analitik Deskriptif, Diagnostik, Prediktif, dan Preskriptif',
  'Operational, Tactical, Strategic Dashboards and Conversational Analytics': 'Dashboard Operasional, Taktis, Strategis dan Analitik Percakapan',
  'Data Modeling (dbt/Dataform), SQLX Optimization, Data Quality Testing, & CI/CD Deployment': 'Pemodelan Data (dbt/Dataform), Optimasi SQLX, Pengujian Kualitas Data, & Deployment CI/CD',
  'Data Analytics': 'Analisis Data',
  'Business Intelligence': 'Business Intelligence',
  'Analytics Engineer': 'Analytics Engineer',
  'Supply Chain Analytics': 'Analitik Rantai Pasokan',
  'Demand Planner': 'Perencana Permintaan',
  'End-to-end data pipelines, ETL/ELT, data modeling & visualization': 'Pipeline data end-to-end, ETL/ELT, pemodelan data & visualisasi',
  'Power BI, Looker Studio, dashboards & executive reporting': 'Power BI, Looker Studio, dashboard & pelaporan eksekutif',
  'dbt, Dataform, SQL optimization, data quality & testing': 'dbt, Dataform, optimasi SQL, kualitas data & pengujian',
  'Demand forecasting, inventory optimization, S&OP, MRP': 'Peramalan permintaan, optimasi persediaan, S&OP, MRP',
  'Statistical forecasting, consensus planning, bias reduction': 'Peramalan statistik, perencanaan konsensus, pengurangan bias',
  '💡 Scroll horizontal untuk melihat semua layanan': '💡 Scroll horizontal untuk melihat semua layanan',
  'Data Analysis & Programming': 'Analisis Data & Pemrograman',
    'DevOps & Version Control': 'DevOps & Kontrol Versi',
    'Data Operations': 'Operasi Data',
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
        'Built automated ELT/ETL pipelines ingesting 100+ fragmented sources into BigQuery via Cloud Run + Cloud Scheduler':
          'Membangun pipeline ELT/ETL otomatis yang mengintegrasikan 100+ sumber terfragmentasi ke BigQuery via Cloud Run + Cloud Scheduler',
        'Modeled modular Dataform (SQLX) layers with data quality assertions, lineage tracking, and version control':
          'Memodelkan lapisan Dataform (SQLX) modular dengan pengujian kualitas data, pelacakan lineage, dan kontrol versi',
        'Established single source of truth + IAM governance, keeping 100% system reliability with Cloud Logging alerts':
          'Membangun single source of truth + tata kelola IAM, menjaga keandalan sistem 100% dengan peringatan Cloud Logging',
        'Shipped executive Looker Studio dashboards + reverse ETL to Sheets; automated hiring flow saving IDR 6.3M/month and scheduling effort by 90%':
          'Menghadirkan dashboard eksekutif Looker Studio + reverse ETL ke Sheets; mengotomasi rekrutmen dengan hemat Rp6,3 jt/bulan dan memangkas effort penjadwalan hingga 90%',
        'Directed SCM execution keeping 100% value-chain synchronization and maximized On-Time Delivery (OTD)':
          'Mengarahkan eksekusi SCM dengan sinkronisasi rantai nilai 100% dan memaksimalkan On-Time Delivery (OTD)',
        'Ran demand forecasting + safety stock / reorder point / ABC / RFM models on 18-month rolling calculations':
          'Menjalankan model peramalan permintaan + safety stock / reorder point / ABC / RFM dengan kalkulasi rolling 18 bulan',
        'Led 3+ digitalization projects with SOPs, cutting non-conformity records and warehousing costs':
          'Memimpin 3+ proyek digitalisasi dengan SOP, memangkas catatan non-konformitas dan biaya pergudangan',
        'Drove Kaizen / 5S initiatives optimizing production processes via data-driven process reengineering':
          'Mendorong inisiatif Kaizen / 5S untuk mengoptimalkan proses produksi melalui reengineering berbasis data',
        'Improved operational efficiency and reduced waste across manufacturing workflows':
          'Meningkatkan efisiensi operasional dan mengurangi pemborosan di seluruh alur kerja manufaktur',
        'Rotated across departments delivering cross-functional projects in operations and supply chain':
          'Rotasi lintas departemen dan menuntaskan proyek lintas fungsi di operasi dan supply chain',
        'Built data-driven reporting foundations later scaled into company-wide BI dashboards':
          'Membangun fondasi pelaporan berbasis data yang kemudian diskalakan menjadi dashboard BI seluruh perusahaan',
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
        // Hero & Navbar
        'Supply Chain | Data | Automation & AI': 'Supply Chain | Data | Otomasi & AI',
        'Hire Me': 'Rekrut Saya',
        'Certified Associate Data Scientist, Data Analyst, and Industry 4.0 Transformation Manager by BNSP': 'Bersertifikat Associate Data Scientist, Data Analyst, dan Industry 4.0 Transformation Manager dari BNSP',
        // Accessibility labels
        'Switch to light mode': 'Ganti ke mode terang',
        'Switch to dark mode': 'Ganti ke mode gelap',
        'Toggle menu': 'Buka/tutup menu',
        // Project categories
        'Data Architecture': 'Arsitektur Data',
        'AI & Google Workspace': 'AI & Google Workspace',
        'Web App App Script': 'Web App Apps Script',
        'Data Engineering': 'Rekayasa Data',
        'Data Science': 'Data Science',
        'AI Engineering': 'Rekayasa AI',
        // Project descriptions
        'Automated the end-to-end hiring workflow using Document AI, DeepSeek, Cloud Run, and Google Workspace, achieving total monthly cost savings of IDR 6.3 million.':
          'Mengotomatiskan alur rekrutmen end-to-end menggunakan Document AI, DeepSeek, Cloud Run, dan Google Workspace, dengan penghematan biaya bulanan sebesar Rp6,3 juta.',
        'Built end-to-end automated data pipelines, data models, and CI/CD workflows to ingest data from multiple sources into BigQuery and Looker Studio. Implemented Row-Level Security (RLS) for granular access control and developed Conversational Analytics to enable deep-dive analysis.':
          'Membangun pipeline data otomatis end-to-end, model data, dan alur kerja CI/CD untuk mengintegrasikan data dari berbagai sumber ke BigQuery dan Looker Studio. Menerapkan Row-Level Security (RLS) untuk kontrol akses granular dan mengembangkan Analitik Percakapan untuk memungkinkan analisis mendalam.',
        'A Discord bot for searching and analyzing Failure Mode and Effects Analysis (FMEA) data. It retrieves FMEA records and corrective steps from Vertex AI Discovery Engine, then answers using a resilient LLM fallback architecture: Nemotron is tried first, and if that request fails the bot automatically falls back to DeepSeek, keeping the bot responsive even when the primary model is unavailable. Per-session conversation history is stored in Google Cloud Firestore.':
          'Bot Discord untuk mencari dan menganalisis data Failure Mode and Effects Analysis (FMEA). Bot mengambil catatan FMEA dan langkah korektif dari Vertex AI Discovery Engine, lalu menjawab menggunakan arsitektur fallback LLM yang tangguh: Nemotron dicoba terlebih dahulu, dan jika gagal bot otomatis beralih ke DeepSeek sehingga tetap responsif meskipun model utama tidak tersedia. Riwayat percakapan per sesi disimpan di Google Cloud Firestore.',
        'Inventory management web app built with Google App Script, Inbound and Outbound inventory tracking, and automated safety stock calculations using RFM analysis and customer tiering.':
          'Aplikasi web manajemen persediaan yang dibangun dengan Google Apps Script, pelacakan stok masuk dan keluar, serta perhitungan safety stock otomatis menggunakan analisis RFM dan segmentasi pelanggan.',
        'Comprehensive overview of employee performance, combining key HR metrics into one intuitive platform.':
          'Ikhtisar komprehensif kinerja karyawan, menggabungkan metrik HR utama ke dalam satu platform yang intuitif.',
        'Comprehensive overview of procurement activities, combining key procurement metrics into one intuitive platform.':
          'Ikhtisar komprehensif aktivitas pengadaan, menggabungkan metrik pengadaan utama ke dalam satu platform yang intuitif.',
        'OEE calculation and streaming data ingestion from Pub Sub to BigQuery using Dataform and Looker Studio.':
          'Perhitungan OEE dan ingestion data streaming dari Pub Sub ke BigQuery menggunakan Dataform dan Looker Studio.',
        'An end-to-end predictive analytics workflow built on KNIME Analytics Platform to forecast residential heating oil consumption.':
          'Alur kerja analitik prediktif end-to-end di KNIME Analytics Platform untuk meramalkan konsumsi minyak pemanas rumah tangga.',
        // Projects - misc UI
        'Image {current} of {total}': 'Gambar {current} dari {total}',
    'Explore selected projects and view the details behind each one.': 'Jelajahi proyek pilihan dan lihat detail setiap karya.',
    'See All': 'Lihat Semua',
    'images': 'gambar',
    'View Gallery': 'Lihat Galeri',
        'Image Gallery Error': 'Gagal Memuat Galeri Gambar',
        'Unable to load the project images. Please try again.': 'Gagal memuat gambar proyek. Silakan coba lagi.',
        'Video Playback Error': 'Gagal Memutar Video',
        'Unable to load the video. The file may be missing or in an unsupported format.': 'Gagal memuat video. File mungkin tidak ada atau formatnya tidak didukung.',
        'Demo Animation': 'Demo Animasi',
        'Open gallery': 'Buka galeri',
        // PDF viewer
        'PDF Preview Error': 'Gagal Pratinjau PDF',
        'Unable to load the PDF certificate. The file may be missing or corrupted.': 'Gagal memuat sertifikat PDF. File mungkin tidak ada atau rusak.',
        // Error boundary
        'Something went wrong': 'Terjadi kesalahan',
        'Unable to load content. Please try again.': 'Gagal memuat konten. Silakan coba lagi.',
        'Try Again': 'Coba Lagi',
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
  more: 'more',
  All: 'All',
  'Certificates & ': 'Certificates & ',
  'Continuous Learning': 'Continuous Learning',
  Skills: 'Skills',
  'Skills & Expertise': 'Skills & Expertise',
  '💡 Klik kartu untuk melihat detail': '💡 Click a card to view details',
  '💡 Scroll horizontal untuk melihat semua layanan': '💡 Scroll horizontally to see all services',
  'Data Operations': 'Data Operations',
  'GCP Data Engineer': 'GCP Data Engineer',
  'GCP Ingestion (Pub/Sub), BigQuery Warehousing, Dataform Modeling, & Cloud Orchestration': 'GCP Ingestion (Pub/Sub), BigQuery Warehousing, Dataform Modeling, & Cloud Orchestration',
  'Services I can provide to help your business grow': 'Services I can provide to help your business grow',
  'Descriptive, Diagnostic, Predictive, and Prescriptive Analytics': 'Descriptive, Diagnostic, Predictive, and Prescriptive Analytics',
  'Operational, Tactical, Strategic Dashboards and Conversational Analytics': 'Operational, Tactical, Strategic Dashboards and Conversational Analytics',
  'Data Modeling (dbt/Dataform), SQLX Optimization, Data Quality Testing, & CI/CD Deployment': 'Data Modeling (dbt/Dataform), SQLX Optimization, Data Quality Testing, & CI/CD Deployment',
  'Supply Chain | Data | Automation & AI': 'Supply Chain | Data | Automation & AI',
  'Hire Me': 'Hire Me',
  'Certified Associate Data Scientist, Data Analyst, and Industry 4.0 Transformation Manager by BNSP': 'Certified Associate Data Scientist, Data Analyst, and Industry 4.0 Transformation Manager by BNSP',
  'Switch to light mode': 'Switch to light mode',
  'Switch to dark mode': 'Switch to dark mode',
  'Toggle menu': 'Toggle menu',
  'Data Architecture': 'Data Architecture',
  'AI & Google Workspace': 'AI & Google Workspace',
  'Web App App Script': 'Web App Apps Script',
  'Data Engineering': 'Data Engineering',
  'Data Science': 'Data Science',
  'AI Engineering': 'AI Engineering',
  'Automated the end-to-end hiring workflow using Document AI, DeepSeek, Cloud Run, and Google Workspace, achieving total monthly cost savings of IDR 6.3 million.':
    'Automated the end-to-end hiring workflow using Document AI, DeepSeek, Cloud Run, and Google Workspace, achieving total monthly cost savings of IDR 6.3 million.',
  'Built end-to-end automated data pipelines, data models, and CI/CD workflows to ingest data from multiple sources into BigQuery and Looker Studio. Implemented Row-Level Security (RLS) for granular access control and developed Conversational Analytics to enable deep-dive analysis.':
    'Built end-to-end automated data pipelines, data models, and CI/CD workflows to ingest data from multiple sources into BigQuery and Looker Studio. Implemented Row-Level Security (RLS) for granular access control and developed Conversational Analytics to enable deep-dive analysis.',
  'A Discord bot for searching and analyzing Failure Mode and Effects Analysis (FMEA) data. It retrieves FMEA records and corrective steps from Vertex AI Discovery Engine, then answers using a resilient LLM fallback architecture: Nemotron is tried first, and if that request fails the bot automatically falls back to DeepSeek, keeping the bot responsive even when the primary model is unavailable. Per-session conversation history is stored in Google Cloud Firestore.':
    'A Discord bot for searching and analyzing Failure Mode and Effects Analysis (FMEA) data. It retrieves FMEA records and corrective steps from Vertex AI Discovery Engine, then answers using a resilient LLM fallback architecture: Nemotron is tried first, and if that request fails the bot automatically falls back to DeepSeek, keeping the bot responsive even when the primary model is unavailable. Per-session conversation history is stored in Google Cloud Firestore.',
  'Inventory management web app built with Google App Script, Inbound and Outbound inventory tracking, and automated safety stock calculations using RFM analysis and customer tiering.':
    'Inventory management web app built with Google App Script, Inbound and Outbound inventory tracking, and automated safety stock calculations using RFM analysis and customer tiering.',
  'Comprehensive overview of employee performance, combining key HR metrics into one intuitive platform.':
    'Comprehensive overview of employee performance, combining key HR metrics into one intuitive platform.',
  'Comprehensive overview of procurement activities, combining key procurement metrics into one intuitive platform.':
    'Comprehensive overview of procurement activities, combining key procurement metrics into one intuitive platform.',
  'OEE calculation and streaming data ingestion from Pub Sub to BigQuery using Dataform and Looker Studio.':
    'OEE calculation and streaming data ingestion from Pub Sub to BigQuery using Dataform and Looker Studio.',
  'An end-to-end predictive analytics workflow built on KNIME Analytics Platform to forecast residential heating oil consumption.':
    'An end-to-end predictive analytics workflow built on KNIME Analytics Platform to forecast residential heating oil consumption.',
  'Image {current} of {total}': 'Image {current} of {total}',
  'Explore selected projects and view the details behind each one.': 'Explore selected projects and view the details behind each one.',
  'See All': 'See All',
  'images': 'images',
  'View Gallery': 'View Gallery',
  'Image Gallery Error': 'Image Gallery Error',
  'Unable to load the project images. Please try again.': 'Unable to load the project images. Please try again.',
  'Video Playback Error': 'Video Playback Error',
  'Unable to load the video. The file may be missing or in an unsupported format.': 'Unable to load the video. The file may be missing or in an unsupported format.',
  'Demo Animation': 'Demo Animation',
  'Open gallery': 'Open gallery',
  'PDF Preview Error': 'PDF Preview Error',
  'Unable to load the PDF certificate. The file may be missing or corrupted.': 'Unable to load the PDF certificate. The file may be missing or corrupted.',
  'Something went wrong': 'Something went wrong',
  'Unable to load content. Please try again.': 'Unable to load content. Please try again.',
  'Try Again': 'Try Again',
  Featured: 'Featured',
  Showcase: 'Showcase',
  '5+ years across supply chain, production operations, and data in manufacturing.': '5+ years across supply chain, production operations, and data in manufacturing.',
  'Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.': 'Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.',
  'What I am looking for:': 'What I am looking for:',
  'a company that wants to reduce waste and manual work through data and AI, and needs someone who understands both the operations and the technology to make it happen.': 'a company that wants to reduce waste and manual work through data and AI, and needs someone who understands both the operations and the technology to make it happen.',
  'Open to conversations on data-driven operations, supply chain analytics, and manufacturing digital transformation.': 'Open to conversations on data-driven operations, supply chain analytics, and manufacturing digital transformation.',
  'Core Services': 'Core Services',
  'Data Analytics': 'Data Analytics',
  'Business Intelligence': 'Business Intelligence',
  'Analytics Engineer': 'Analytics Engineer',
  'Supply Chain Analytics': 'Supply Chain Analytics',
  'Demand Planner': 'Demand Planner',
  'End-to-end data pipelines, ETL/ELT, data modeling & visualization': 'End-to-end data pipelines, ETL/ELT, data modeling & visualization',
  'Power BI, Looker Studio, dashboards & executive reporting': 'Power BI, Looker Studio, dashboards & executive reporting',
  'dbt, Dataform, SQL optimization, data quality & testing': 'dbt, Dataform, SQL optimization, data quality & testing',
  'Demand forecasting, inventory optimization, S&OP, MRP': 'Demand forecasting, inventory optimization, S&OP, MRP',
  'Statistical forecasting, consensus planning, bias reduction': 'Statistical forecasting, consensus planning, bias reduction',
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
  'Built automated ELT/ETL pipelines ingesting 100+ fragmented sources into BigQuery via Cloud Run + Cloud Scheduler': 'Built automated ELT/ETL pipelines ingesting 100+ fragmented sources into BigQuery via Cloud Run + Cloud Scheduler',
  'Modeled modular Dataform (SQLX) layers with data quality assertions, lineage tracking, and version control': 'Modeled modular Dataform (SQLX) layers with data quality assertions, lineage tracking, and version control',
  'Established single source of truth + IAM governance, keeping 100% system reliability with Cloud Logging alerts': 'Established single source of truth + IAM governance, keeping 100% system reliability with Cloud Logging alerts',
  'Shipped executive Looker Studio dashboards + reverse ETL to Sheets; automated hiring flow saving IDR 6.3M/month and scheduling effort by 90%': 'Shipped executive Looker Studio dashboards + reverse ETL to Sheets; automated hiring flow saving IDR 6.3M/month and scheduling effort by 90%',
  'Directed SCM execution keeping 100% value-chain synchronization and maximized On-Time Delivery (OTD)': 'Directed SCM execution keeping 100% value-chain synchronization and maximized On-Time Delivery (OTD)',
  'Ran demand forecasting + safety stock / reorder point / ABC / RFM models on 18-month rolling calculations': 'Ran demand forecasting + safety stock / reorder point / ABC / RFM models on 18-month rolling calculations',
  'Led 3+ digitalization projects with SOPs, cutting non-conformity records and warehousing costs': 'Led 3+ digitalization projects with SOPs, cutting non-conformity records and warehousing costs',
  'Drove Kaizen / 5S initiatives optimizing production processes via data-driven process reengineering': 'Drove Kaizen / 5S initiatives optimizing production processes via data-driven process reengineering',
  'Improved operational efficiency and reduced waste across manufacturing workflows': 'Improved operational efficiency and reduced waste across manufacturing workflows',
  'Rotated across departments delivering cross-functional projects in operations and supply chain': 'Rotated across departments delivering cross-functional projects in operations and supply chain',
  'Built data-driven reporting foundations later scaled into company-wide BI dashboards': 'Built data-driven reporting foundations later scaled into company-wide BI dashboards',
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
