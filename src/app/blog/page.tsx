import Link from 'next/link'
import { NewsletterForm } from '@/components/shared/NewsletterForm'

const articles = [
  {
    category: 'Operations',
    title: 'The Complete Guide to Setting Up Managed Employee Transport for Your Enterprise',
    keyword: 'managed employee transport Bengaluru',
    desc: 'A step-by-step guide for HR and Admin managers: from route mapping and fleet selection to SLA negotiation and billing consolidation.',
    readTime: '12 min read',
    href: '/blog/complete-guide-employee-transport',
  },
  {
    category: 'People & Culture',
    title: 'How Commute Quality Directly Affects Employee Productivity and Retention',
    keyword: 'employee commute productivity',
    desc: 'Research-backed analysis showing how a 30-minute reduction in average commute time correlates with measurable improvements in engagement scores.',
    readTime: '8 min read',
    href: '/blog/commute-quality-productivity-retention',
  },
  {
    category: 'Fleet Strategy',
    title: 'EV Fleet vs. Petrol Fleet: What Admin Managers Need to Know in 2026',
    keyword: 'EV fleet corporate transport India',
    desc: 'Total cost of ownership comparison, charging infrastructure requirements, and ESG reporting benefits - everything you need to make the fleet decision.',
    readTime: '10 min read',
    href: '/blog/ev-vs-petrol-fleet-admin-guide',
  },
  {
    category: 'Legal & Compliance',
    title: 'How to Write a Corporate Transport SLA That Actually Protects Your Company',
    keyword: 'corporate transport SLA India',
    desc: 'The 8 non-negotiable clauses every transport SLA must include - with penalty structures, breakdown protocols, and compliance requirements.',
    readTime: '9 min read',
    href: '/blog/corporate-transport-sla-guide',
  },
  {
    category: 'Technology',
    title: 'Corporate Transport Technology in 2025: What Every Enterprise Should Be Using',
    keyword: 'corporate transport technology platform India',
    desc: 'From live fleet tracking and AI route optimisation to automated billing - the technology stack modern enterprises use to manage employee mobility.',
    readTime: '11 min read',
    href: '/blog/corporate-transport-technology-2025',
  },
  {
    category: 'Procurement',
    title: '10 Questions Every HR Manager Should Ask Before Signing a Transport Contract',
    keyword: 'corporate transport vendor evaluation India',
    desc: 'The due diligence checklist that separates professional transport partners from unreliable vendors - ask these before you sign anything.',
    readTime: '7 min read',
    href: '/blog/transport-contract-questions-checklist',
  },
]

const categoryColors: Record<string, string> = {
  Operations: '#FFCC35',
  'People & Culture': '#E8E8E5',
  'Fleet Strategy': '#1C1C1B',
  'Legal & Compliance': '#747272',
  Technology: '#363635',
  Procurement: '#FFF799',
}

const categoryText: Record<string, string> = {
  Operations: '#1C1C1B',
  'People & Culture': '#363635',
  'Fleet Strategy': '#FFCC35',
  'Legal & Compliance': '#FFFFFF',
  Technology: '#FFCC35',
  Procurement: '#1C1C1B',
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container max-w-3xl">
          <span className="section-tag mb-6 block w-fit">Insights & Resources</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            Insights for HR, Admin,
            <br />
            <span style={{ color: '#FFCC35' }}>and Operations Leaders</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Practical guides on corporate employee transport, fleet management, and enterprise mobility -
            from the team that operates it every day.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section bg-brand-gray-100">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {articles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="reveal card-hover group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
              >
                {/* Category header */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{
                    background: categoryColors[article.category] || '#F5F5F3',
                    color: categoryText[article.category] || '#1C1C1B',
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{article.category}</span>
                  <span className="text-xs opacity-70">{article.readTime}</span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-black text-brand-black text-base leading-snug mb-3 group-hover:text-brand-yellow transition-colors flex-1">
                    {article.title}
                  </h2>
                  <p className="text-brand-gray-500 text-sm leading-relaxed mb-4">{article.desc}</p>

                  <div className="flex items-center gap-2 text-brand-black text-sm font-semibold group-hover:text-brand-yellow transition-colors mt-auto">
                    Read article
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="reveal mt-16 bg-brand-black rounded-3xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-3">Get New Articles in Your Inbox</h2>
            <p className="text-white/60 text-sm mb-6">Monthly insights for HR and Admin managers on corporate transport, fleet management, and compliance.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>

    </>
  )
}
