import { useReveal } from '../hooks/useReveal'

const skillGroups = [
  {
    label: 'Data Analysis & Programming',
    icon: '🐍',
    color: 'cyan',
    skills: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'SQL (Standard & Legacy)'],
  },
  {
    label: 'Google Cloud Platform (GCP)',
    icon: '☁️',
    color: 'sky',
    skills: [
      'BigQuery',
      'Cloud Storage',
      'Cloud Run',
      'Dataform',
      'Dataflow',
      'Cloud Scheduler',
      'IAM',
      'Cloud Billing',
      'Knowledge Catalog',
      'Monitoring',
    ],
  },
  {
    label: 'BI, Visualization & Spreadsheets',
    icon: '📊',
    color: 'emerald',
    skills: [
      'Power BI (DAX, Power Query)',
      'Looker Studio',
      'Conversational Analytics',
      'Advanced Excel',
      'Google Sheets',
    ],
  },
  {
    label: 'AI, Automation & No-Code',
    icon: '⚙️',
    color: 'violet',
    skills: [
      'Prompting',
      'Google Apps Script',
      'API Integration',
      'Document AI',
      'RapidMiner',
      'KNIME',
    ],
  },
  {
    label: 'Workspace Admin & Digital Strategy',
    icon: '🚀',
    color: 'amber',
    skills: [
      'Google Workspace Admin',
      'User Management',
      'Security Policies',
      'Industry 4.0 Roadmapping',
      'Technology Evaluation',
      'Strategic Planning',
    ],
  },
]

const colorMap = {
  cyan: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20 hover:bg-cyan-400/20',
  sky: 'text-sky-300 bg-sky-400/10 border-sky-400/20 hover:bg-sky-400/20',
  emerald: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20 hover:bg-emerald-400/20',
  violet: 'text-violet-300 bg-violet-400/10 border-violet-400/20 hover:bg-violet-400/20',
  amber: 'text-amber-300 bg-amber-400/10 border-amber-400/20 hover:bg-amber-400/20',
}

function SkillBadge({ name, color, index }) {
  const ref = useReveal(index * 40)
  return (
    <span
      ref={ref}
      className={`reveal text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-default ${colorMap[color]}`}
    >
      {name}
    </span>
  )
}

export default function About() {
  const titleRef = useReveal()
  const textRef = useReveal(100)
  const photoRef = useReveal(150)

  return (
    <section id="about" className="px-6 py-20 max-w-2xl mx-auto">
      <SectionHeader title="About" />

      {/* Profil Section: Foto + Teks Singkat */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center mb-12">
        {/* Foto Tanpa Frame Bulat dengan Efek Glow Pemisah Background */}
        <div ref={photoRef} className="reveal sm:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-[220px]">
            {/* Ambient Background Glow (Memberikan efek backlight sehingga baju & background terpisah) */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-75 blur-lg transition duration-500 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)',
              }}
            />

            {/* Inner Backplate Lighting */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a12] p-1.5 shadow-2xl">
              <img
                src="/images/Vincen Photo.png"
                alt="Vincensius Prasetyo Adi"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  // Drop shadow khusus untuk memperjelas siluet bahu/baju dari background gelap
                  filter: 'drop-shadow(0px 8px 24px rgba(6, 182, 212, 0.25))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bio Intro */}
        <div className="sm:col-span-7">
          <div ref={titleRef} className="reveal mb-4">
            <h2 className="text-2xl font-black text-white leading-tight mb-1">
              Engineer meets <span className="text-cyan-400">Data Analyst</span>
            </h2>
            <p className="text-xs font-semibold text-gray-400">
              Vincensius Prasetyo Adi
            </p>
          </div>

          <div ref={textRef} className="reveal">
            <p className="text-sm text-gray-400 leading-relaxed">
              Data Analyst di PT Intan Safety Glass dengan 5+ tahun pengalaman gabungan di bidang Data, Supply Chain, & Digital Transformation. Berfokus pada end-to-end data pipeline, GCP infrastructure, BI analytics, dan otomatisasi berbasis AI.
            </p>
          </div>
        </div>
      </div>

      {/* Skill Groups */}
      <div className="flex flex-col gap-8">
        {skillGroups.map(({ label, icon, color, skills }) => (
          <div key={label}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{icon}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {label}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <SkillBadge key={skill} name={skill} color={color} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
        {title}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,182,212,0.4), transparent)',
        }}
      />
    </div>
  )
}