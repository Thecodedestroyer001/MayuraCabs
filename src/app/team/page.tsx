import type { Metadata } from 'next'
import FooterCTA from '@/components/shared/FooterCTA'
import StackingCards from '@/components/team/StackingCards'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the team behind Mayura Car Rentals — building Bengaluru\'s most reliable corporate transport partner.',
}

const team = [
  {
    name: 'Arjun Mehta',
    title: 'Co-Founder & CEO',
    initials: 'AM',
    bg: '#FFCC35',
    textColor: '#1C1C1B',
    experience: '12 years in corporate operations and enterprise mobility across India\'s largest IT and BFSI organisations.',
    focus: 'Business strategy, enterprise client relationships, and fleet expansion',
    linkedin: '#',
    email: 'arjun@mayuracabs.com',
  },
  {
    name: 'Priya Krishnamurthy',
    title: 'Co-Founder & COO',
    initials: 'PK',
    bg: '#1C1C1B',
    textColor: '#FFCC35',
    experience: '10 years in HR operations, workforce planning, and corporate services at leading GCCs in Bengaluru.',
    focus: 'Operations excellence, SLA management, and customer experience',
    linkedin: '#',
    email: 'priya@mayuracabs.com',
  },
  {
    name: 'Karthik Subramaniam',
    title: 'Head of Technology',
    initials: 'KS',
    bg: '#363635',
    textColor: '#FFCC35',
    experience: '8 years building mobility and logistics platforms at product companies. Former tech lead at a top ride-sharing startup.',
    focus: 'Commute platform development, route optimisation algorithms, and data engineering',
    linkedin: '#',
    email: 'tech@mayuracabs.com',
  },
  {
    name: 'Rajesh Nair',
    title: 'Head of Safety & Compliance',
    initials: 'RN',
    bg: '#747272',
    textColor: '#FFFFFF',
    experience: '15 years in transport safety, regulatory compliance, and driver training programmes across South India.',
    focus: 'AIS-140 compliance, driver background verification, and safety protocol enforcement',
    linkedin: '#',
    email: 'safety@mayuracabs.com',
  },
]

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container max-w-3xl">
          <span className="section-tag mb-6 block w-fit">Our Team</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            The Team Behind
            <br />
            <span style={{ color: '#FFCC35' }}>Mayura Car Rentals</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Four operators who lived the corporate transport problem — and built the solution they always wished existed.
          </p>
        </div>
      </section>

      {/* Stacking Team Cards */}
      <section className="bg-brand-gray-100 pt-10">
        <div className="container max-w-6xl">
          <StackingCards team={team} />
        </div>
      </section>

      {/* Hiring CTA */}
      <section className="section-sm bg-brand-yellow relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-brand-black/5 pointer-events-none" />
        <div className="container relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-brand-black mb-4">
            We Are Growing.
            <br />
            Come Build With Us.
          </h2>
          <p className="text-brand-black/70 text-lg mb-8">
            We&apos;re looking for operators, engineers, and sales leaders who want to build Bengaluru&apos;s
            most reliable corporate mobility company.
          </p>
          <a
            href="mailto:careers@mayuracabs.com"
            id="careers-btn"
            className="bg-brand-black text-white font-bold px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            careers@mayuracabs.com
          </a>
        </div>
      </section>

      <FooterCTA />
    </>
  )
}
