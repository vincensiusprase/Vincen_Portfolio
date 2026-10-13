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

// Logo tiap skill (fallback ke teks saja bila tidak ada)
const skillLogos: Record<string, string> = {
  Python: '/images/tools/python-icon.svg',
  BigQuery: '/images/tools/bigquery.svg',
  'Cloud Storage': '/images/tools/google_cloud-icon.svg',
  'Pub/Sub': '/images/tools/PubSub.svg',
  'Cloud Run': '/images/tools/google_cloud_run-icon.svg',
  'Cloud Scheduler': '/images/tools/Cloud%20Scheduler.svg',
  IAM: '/images/tools/Identity%20And%20Access%20Management.svg',
  'Cloud Billing': '/images/tools/Billing.svg',
  Monitoring: '/images/tools/Cloud%20Monitoring.svg',
  'Document AI': '/images/tools/Document%20AI.svg',
  'Maps API': '/images/tools/Google%20Maps%20Platform.svg',
  'Looker Studio': '/images/tools/Looker.svg',
  'Google Apps Script': '/images/tools/google-app-script.svg',
}

interface SkillBadgeProps {
  name: string
}

function SkillBadge({ name }: SkillBadgeProps) {
  const logo = skillLogos[name]

  return (
    <span
      className="skill-badge inline-flex items-center gap-1.5 cursor-default whitespace-nowrap rounded-xl border px-2.5 py-1 text-xs font-semibold transition-all"
    >
      {logo && (
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 object-contain"
        />
      )}
      {name}
    </span>
  )
}

export function SectionHeader({ title }: { title: string }) {
  const { t } = useLanguage()
  return (
    <div className="reveal-item flex items-center gap-3 mb-8">
      <span className="w-1.5 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #FB923C, #F97316)' }} />
      <span className="text-xs font-black text-[#16264A] uppercase tracking-widest">
        {t(title)}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background:
            'linear-gradient(90deg, rgba(249,115,22,0.35), transparent)',
        }}
      />
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const sectionRef = useReveal()
  const titleRef = useReveal()
  const textRef = useReveal(100)

  const [activeGroup, setActiveGroup] = useState(null)

  const toggleGroup = (id) => {
    setActiveGroup((prev) => (prev === id ? null : id))
  }

  const renderSkillCards = () => {
    return skillGroups.map(({ id, label, icon, categories }) => {
      const isOpen = activeGroup === id
      const totalSkills = categories.reduce(
        (acc, cat) => acc + cat.items.length,
        0
      )

      return (
        <div
          key={id}
          className={`skill-card w-full rounded-2xl overflow-hidden ${
            isOpen ? 'is-open' : ''
          }`}
        >
          {/* Header Card */}
          <button
            type="button"
            onClick={() => toggleGroup(id)}
            className={`skill-card-header w-full text-left p-4 flex items-center justify-between gap-3 focus:outline-none cursor-pointer group transition-colors ${
              isOpen ? 'is-open' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="skill-card-icon text-xl p-2 rounded-xl border group-hover:scale-110 transition-transform">
                {icon}
              </span>
              <div>
                <h3 className="skill-card-title text-xs font-bold uppercase tracking-wider">
                  {t(label)}
                </h3>
                <p className="skill-card-meta text-[10px] mt-0.5">
                  {totalSkills} Skills
                </p>
              </div>
            </div>

            {/* Indikator Panah Toggle */}
            <div
              className={`skill-card-toggle w-6 h-6 rounded-full flex items-center justify-center border transition-transform duration-300 text-[10px] ${
                isOpen ? 'is-open rotate-180' : ''
              }`}
            >
              ▼
            </div>
          </button>

          {/* Area Detail Skill */}
          {isOpen && (
            <div className="skill-card-details px-4 pb-4 pt-3 border-t flex flex-col gap-4">
              {categories.map(({ subLabel, items }) => (
                <div key={subLabel}>
                  <p className="skill-card-category text-[10px] font-bold uppercase tracking-wider mb-2">
                    {t(subLabel)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <SkillBadge key={item} name={item} />
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
    <section ref={sectionRef} id="about" className="reveal-section px-6 py-20 max-w-6xl mx-auto overflow-hidden">
      <SectionHeader title="About" />

      {/* Profile Section - Full Width */}
      <div className="reveal-item mb-14 p-6 sm:p-8 rounded-[2rem] hero-surface border border-[#F6DCC6] shadow-[0_30px_60px_-45px_rgba(249,115,22,0.5)]">
        <div ref={titleRef} className="reveal mb-4 text-center">
          <h2 className="text-2xl font-black text-[#16264A] leading-tight mb-1">
            {t('Operations meets')} <span className="text-gradient-warm">{t('Data, Automation & AI')}</span>
          </h2>
        </div>

        <div ref={textRef} className="reveal space-y-3 text-sm text-[#55607A] leading-relaxed text-center">
          <p>
            {t('5+ years across supply chain, production operations, and data in manufacturing.')}
          </p>
          <p>
            {t('Specialized in building end-to-end data pipelines, optimizing GCP infrastructure, driving BI analytics, and engineering AI-based workflow automations.')}
          </p>
          <p>
            <span className="font-semibold text-[#16264A]">
              {t('What I am looking for:')}
            </span>{' '}
            {t('a company that wants to reduce waste and manual work through data and AI, and needs someone who understands both the operations and the technology to make it happen.')}
          </p>
        </div>
      </div>

      {/* Services follow the reference layout: heading on the left, scrollable cards on the right. */}
      <div className="reveal-item mb-14 grid grid-cols-1 lg:grid-cols-[0.55fr_1.45fr] gap-6 lg:gap-10 items-start rounded-[2rem] hero-surface border border-[#F6DCC6] p-5 sm:p-8 shadow-[0_30px_60px_-45px_rgba(249,115,22,0.35)]">
        <div className="pt-2 lg:pt-1">
          <h3 className="max-w-xs text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight text-[#16264A]">
          {t('Core Services')}
          </h3>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#F97316]">
          {t('Services I can provide to help your business grow')}
          </p>
        </div>

        <div
          className="max-h-[35rem] sm:max-h-[18rem] w-full overflow-y-auto pr-2 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
          role="region"
          aria-label={t('Core Services')}
          tabIndex={0}
        >
          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: t('Data Engineer'), icon: '⚙️', desc: t('Dataform, Big Query, Cloud Run') },
            { title: t('Data Analytics'), icon: '📊', desc: t('Data Cleaning, Analysis, and Visualization') },
            { title: t('Business Intelligence'), icon: '📈', desc: t('Power BI, Looker Studio, dashboards & executive reporting') },
            { title: t('Analytics Engineer'), icon: '⚙️', desc: t('dbt, Dataform, SQL optimization, data quality & testing') },
            { title: t('Supply Chain Analytics'), icon: '📦', desc: t('Demand forecasting, inventory optimization, S&OP, MRP') },
            { title: t('Demand Planner'), icon: '🎯', desc: t('Statistical forecasting, consensus planning, bias reduction') },
          ].map((service, index) => (
            <article
              key={index}
              className="min-h-32 rounded-2xl soft-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FFF1E6] text-lg">
                  {service.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs leading-relaxed text-[#6B7280]">{service.desc}</p>
                  <h4 className="mt-4 font-semibold text-[#F97316]">{service.title}</h4>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>

      {/* Skills Section - Bottom (Horizontal Marquee as before) */}
      <div className="reveal-item mt-16">
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-xs font-bold text-[#16264A] uppercase tracking-wider">
            {t('Skills & Expertise')}
          </span>
          <span className="text-[10px] text-[#F97316] font-mono font-semibold">
            {t('💡 Klik kartu untuk melihat detail')}
          </span>
        </div>

        {/* Continuous Sliding Skill Marquee */}
        <div className="skill-marquee-window w-full overflow-hidden relative py-2">
          <div className={`skill-marquee-track ${activeGroup !== null ? 'is-paused' : ''}`}>
            {/* Set Pertama */}
            <div className="skill-marquee-set">
              {renderSkillCards()}
            </div>
            {/* Set Kedua (Duplikat untuk Looping) */}
            <div className="skill-marquee-set" aria-hidden="true">
              {renderSkillCards()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}