import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Article',
  description: 'Expert insights on corporate employee transport for Bengaluru enterprises.',
}

const articleSlugs = [
  'complete-guide-employee-transport',
  'commute-quality-productivity-retention',
  'ev-vs-petrol-fleet-admin-guide',
  'corporate-transport-sla-guide',
  'corporate-transport-technology-2025',
  'transport-contract-questions-checklist',
]

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export default function BlogArticlePage() {
  return (
    <>
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-yellow text-sm mb-8 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Blog
          </Link>
          <span className="section-tag mb-6 block w-fit">Coming Soon</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
            Full article content will be published soon.
          </h1>
          <p className="text-white/70 text-lg">
            This article is part of Mayura&apos;s content series for HR, Admin, and Operations leaders.
            Subscribe to our newsletter to be notified when it&apos;s live.
          </p>
        </div>
      </section>
      <section className="section-sm bg-brand-yellow">
        <div className="container text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-brand-black mb-4">Get Notified When This Article Goes Live</h2>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your work email"
              className="flex-1 border border-brand-black/20 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none"
            />
            <button type="button" className="bg-brand-black text-white font-bold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity">
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
