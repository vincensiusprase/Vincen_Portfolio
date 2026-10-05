import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.ts'
import { useLanguage } from '../context/LanguageContext.tsx'

// Type definitions for skill data
interface SkillCategory {
  subLabel: string
  items: string[]
}

interface SkillGroup {
  id: string
  label: string
  icon: string
  color: string
  categories: SkillCategory[]
}

const skillGroups: SkillGroup[] = [
  {
    id: 'data-prog',
    label: 'Data Operations',
    icon: '📈',
    color: 'navy',
    categories: [
      {
        subLabel: 'Languages',
        items: ['Python', 'SQL', 'DAX', 'JavaScript'],
      },
      {
        subLabel: 'Libraries & Toolkits',
        items: ['Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'ta', 'yfinance'],
      },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Version Control',
    icon: '🐙',
    color: 'darkSky',
    categories: [
      {
        subLabel: 'Version Control & CI/CD',
        items: ['Git', 'GitHub', 'GitHub Actions'],
      },
      {
        subLabel: 'Environment & Deployment',
        items: ['Docker', 'Antigravity', 'VS Code', 'Cloud Shell Editor'],
      },
    ],
  },
  {
    id: 'gcp',
    label: 'Google Cloud Platform (GCP)',
    icon: '☁️',
    color: 'navy',
    categories: [
      {
        subLabel: 'Data & Analytics',
        items: [
          'BigQuery',
          'Dataform',
          'Cloud Storage',
          'Knowledge Catalog',
          'Pub/Sub',
        ],
      },
      {
        subLabel: 'Compute & Operations',
        items: [
          'Cloud Run',
          'Cloud Scheduler',
          'IAM',
          'Cloud Billing',
          'Monitoring',
          'Secret Manager',
        ],
      },
      {
        subLabel: 'Workspace Admin & Security',
        items: [
          'Google Workspace Administration',
          'Access Control & User Management',
          'Workspace Security & Policy Enforcement',
          'File Management & Data Governance',
        ],
      },
      {
        subLabel: 'Other GCP Services',
        items: ['Document AI', 'Maps API'],
      },
    ],
  },
  {
    id: 'bi-sheets',
    label: 'BI, Visualization & Spreadsheets',
    icon: '📊',
    color: 'slateNavy',
    categories: [
      {
        subLabel: 'BI & Analytics Tools',
        items: ['Power BI', 'Looker Studio', 'Conversational Analytics'],
      },
      {
        subLabel: 'Advanced Spreadsheets',
        items: [
          'Arrayformula, Lambda, Map, Let',
          'Query',
          'X-V-HLookup',
          'Pivot Tables',
          'Nested IF, IFS',
          'Array & Text Functions',
          'Data Validation & Conditional Formatting',
        ],
      },
    ],
  },
  {
    id: 'ai-nocode',
    label: 'AI, Automation & Low-Code',
    icon: '⚙️',
    color: 'darkSky',
    categories: [
      {
        subLabel: 'Automation & APIs',
        items: ['Google Apps Script', 'API Integration', 'Prompt Engineering', 'RAG'],
      },
      {
        subLabel: 'No-Code/Low-Code Analytics',
        items: ['RapidMiner', 'KNIME'],
      },
    ],
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain & Operations',
    icon: '📦',
    color: 'slateNavy',
    categories: [
      {
        subLabel: 'Operational Excellence & Quality',
        items: [
          '5S & Kaizen Methodologies',
          'Lean Manufacturing Principles',
          'Process Improvement & Standardization',
        ],
      },
      {
        subLabel: 'Warehouse & Material Control',
        items: [
          'ABC Analysis',
          'Safety Stock & Reorder Point Calculation',
          'Automatic MRP Efficiency Calculation',
          'Aging Analysis',
          'FEFO',
        ],
      },
      {
        subLabel: 'Planning & Governance',
        items: [
          'Sales & Operations Planning (S&OP)',
          'Demand Forecasting',
          'Customer Tiering',
        ],
      },
    ],
  },
  {
    id: 'digital-trans',
    label: 'Digital Transformation & Strategy',
    icon: '🚀',
    color: 'navy',
    categories: [
      {
        subLabel: 'Strategic Planning & Execution',
        items: [
          'Industry 4.0 Aspiration & Opportunity Formulation',
          'Strategic Planning & Digital Roadmapping',
          'Technology Pilot Project Execution',
          'Solution & Impact Evaluation',
        ],
      },
    ],
  },
]

// Color Map seragam bertema Dark Blue & Slate Navy
const colorMap: Record<string, string> = {
  navy: 'text-[#0F1C2E] bg-slate-200/80 border-slate-300 hover:bg-[#1F3A5F] hover:text-white',
  slateNavy: 'text-[#1F3A5F] bg-sky-100/70 border-sky-200 hover:bg-[#3D5A80] hover:text-white',
  darkSky: 'text-[#254E7A] bg-blue-50 border-blue-200 hover:bg-[#1F3A5F] hover:text-white',
}

interface SkillBadgeProps {
  name: string
  color: string
}

function SkillBadge({ name, color }: SkillBadgeProps) {
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-xl border transition-all cursor-default whitespace-nowrap shadow-2xs ${
        colorMap[color] || colorMap.navy
      }`}
    >
      {name}
    </span>
  )
}

export function SectionHeader({ title }: { title: string }) {
  const { t } = useLanguage()
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-xs font-black text-[#1F3A5F] uppercase tracking-widest">
        {t(title)}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background:
            'linear-gradient(90deg, rgba(31,58,95,0.3), transparent)',
        }}
      />
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const titleRef = useReveal()
  const textRef = useReveal(100)
  const photoRef = useReveal(150)

  const [activeGroup, setActiveGroup] = useState(null)

  const toggleGroup = (id) => {
    setActiveGroup((prev) => (prev === id ? null : id))
  }

  const renderSkillCards = (isDuplicate = false) => {
    return skillGroups.map(({ id, label, icon, color, categories }) => {
      const isOpen = activeGroup === id
      const totalSkills = categories.reduce(
        (acc, cat) => acc + cat.items.length,
        0
      )

      return (
        <div
          key={isDuplicate ? `${id}-dup` : id}
          className={`w-[300px] sm:w-[340px] flex-shrink-0 rounded-2xl border transition-all duration-300 overflow-hidden shadow-md ${
            isOpen
              ? 'border-sky-400 ring-2 ring-sky-400/30 bg-[#0F1C2E]'
              : 'border-[#1F3A5F] hover:border-slate-400 bg-[#1F3A5F]'
          }`}
        >
          {/* Header Card (Selalu Background Dark Blue) */}
          <button
            type="button"
            onClick={() => toggleGroup(id)}
            className={`w-full text-left p-4 flex items-center justify-between gap-3 focus:outline-none cursor-pointer group transition-colors ${
              isOpen ? 'bg-[#0F1C2E]' : 'bg-[#1F3A5F] hover:bg-[#254E7A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl p-2 rounded-xl bg-white/10 border border-white/10 group-hover:scale-110 transition-transform">
                {icon}
              </span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  {t(label)}
                </h3>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  {totalSkills} Skills
                </p>
              </div>
            </div>

            {/* Indikator Panah Toggle */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-transform duration-300 text-[10px] ${
                isOpen
                  ? 'rotate-180 bg-sky-400 text-[#0F1C2E] border-sky-400'
                  : 'border-white/20 text-white bg-white/5 group-hover:border-white'
              }`}
            >
              ▼
            </div>
          </button>

          {/* Area Detail Skill (Latar sedikit lebih terang agar badge mudah dibaca) */}
          {isOpen && (
            <div className="px-4 pb-4 pt-3 border-t border-white/10 flex flex-col gap-4 bg-[#1F3A5F]/95">
              {categories.map(({ subLabel, items }) => (
                <div key={subLabel}>
                  <p className="text-[10px] font-bold text-sky-300 uppercase tracking-wider mb-2">
                    {t(subLabel)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <SkillBadge key={item} name={item} color={color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <section id="about" className="px-6 py-20 max-w-6xl mx-auto overflow-hidden">
      <SectionHeader title="About" />

      {/* Profil Section */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center mb-12">
        <div ref={photoRef} className="reveal sm:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-[220px]">
            <div
              className="absolute -inset-1 rounded-2xl opacity-40 blur-md transition duration-500 group-hover:opacity-70"
              style={{
                background:
                  'linear-gradient(135deg, rgba(31, 58, 95, 0.4) 0%, rgba(61, 90, 128, 0.6) 100%)',
              }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-1.5 shadow-md">
              <img
                src="/images/Vincen Photo.png"
                alt="Vincensius Prasetyo Adi"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-7">
          <div ref={titleRef} className="reveal mb-4">
            <h2 className="text-2xl font-black text-[#1F3A5F] leading-tight mb-1">
              {t('Operations meets')} <span className="text-[#3D5A80]">{t('Data, Automation & AI')}</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Vincensius Prasetyo Adi
            </p>
          </div>

          <div ref={textRef} className="reveal space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              {t('5+ years across supply chain, production operations, and data in manufacturing.')}
            </p>
            <p>
              {t('Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.')}
            </p>
            <p>
              <span className="font-semibold text-slate-800">
                {t('What I am looking for:')}
              </span>{' '}
              {t('a company that wants to reduce waste and manual work through data and AI, and needs someone who understands both the operations and the technology to make it happen.')}
            </p>
            <p className="text-slate-500">
              {t('Open to conversations on data-driven operations, supply chain analytics, and manufacturing digital transformation.')}
            </p>
          </div>
        </div>
      </div>

      {/* Title Petunjuk Interaktif */}
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">
          {t('Skills & Expertise')}
        </span>
        <span className="text-[10px] text-[#3D5A80] font-mono font-medium">
          {t('💡 Klik kartu untuk melihat detail')}
        </span>
      </div>

      {/* Continuous Sliding Skill Marquee */}
      <div className="w-full overflow-hidden relative py-2">
        <div
          className={`flex gap-4 items-start animate-marquee ${
            activeGroup !== null ? '[animation-play-state:paused]' : ''
          } hover:[animation-play-state:paused]`}
        >
          {/* Set Pertama */}
          <div className="flex gap-4 items-start">
            {renderSkillCards(false)}
          </div>
          {/* Set Kedua (Duplikat untuk Looping) */}
          <div className="flex gap-4 items-start" aria-hidden="true">
            {renderSkillCards(true)}
          </div>
        </div>
      </div>
    </section>
  )
}