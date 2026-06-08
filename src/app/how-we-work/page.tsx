import type { Metadata } from 'next'
import Link from 'next/link'
import FooterCTA from '@/components/shared/FooterCTA'
import DynamicRouteTimeline from '@/components/how-we-work/DynamicRouteTimeline'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'From discovery call to first pickup - exactly how Mayura onboards enterprise clients in 3 weeks.',
}

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    timeline: 'Day 1',
    color: '#FFCC35',
    what: [
      'Understand your employee count, shifts, and office locations',
      'Map your current transport challenges and costs',
      'Identify priority pain points to solve first',
      'Walk you through the Commute platform (20-min demo)',
      'Discuss the free 7-day pilot structure',
    ],
    cta: true,
  },
  {
    number: '02',
    title: 'Transport Audit & Route Design',
    timeline: 'Days 2–5',
    color: '#1C1C1B',
    what: [
      'Collect employee address data (secure, GDPR-compliant)',
      'Run AI-powered route optimisation across all zones',
      'Determine optimal fleet mix (vehicle types, count)',
      'Design shift-specific scheduling templates',
      'Prepare cost model and pilot proposal document',
    ],
    cta: false,
  },
  {
    number: '03',
    title: 'Free 7-Day Pilot',
    timeline: 'Week 2',
    color: '#FFCC35',
    what: [
      'Full fleet deployment - zero cost to you',
      'Your admin team gets live Commute dashboard access',
      'Employees receive trip alerts and driver details',
      '24/7 command centre monitoring throughout',
      'Mid-pilot check-in call on Day 4',
    ],
    cta: false,
  },
  {
    number: '04',
    title: 'Contract & Onboarding',
    timeline: 'Week 3',
    color: '#1C1C1B',
    what: [
      'Review pilot report: on-time rates, cost analysis',
      'Finalise SLA terms and penalty clauses',
      'Set up billing integration with your finance team',
      'Onboard all employees to the Commute app',
      'Handover to your dedicated account manager',
    ],
    cta: false,
  },
  {
    number: '05',
    title: 'Ongoing Operations',
    timeline: 'Month 1 onwards',
    color: '#363635',
    what: [
      'Monthly SLA review calls with your admin team',
      'Quarterly route optimisation updates',
      'Real-time driver and fleet management (24/7)',
      'Continuous employee feedback loop',
      'Annual transport programme audit and renewal',
    ],
    cta: false,
  },
]

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container max-w-3xl">
          <span className="section-tag mb-6 block w-fit">Our Process</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            From Discovery Call to First Pickup.
            <br />
            <span style={{ color: '#FFCC35' }}>In 3 Weeks. Guaranteed.</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            We&apos;ve refined our onboarding process to get your enterprise transport programme live - fast,
            seamlessly, and with zero disruption to your employees.
          </p>
        </div>
      </section>

      {/* Dynamic Animated Timeline */}
      <section className="section bg-white overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <DynamicRouteTimeline steps={steps} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-sm bg-brand-yellow relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-brand-black/5" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-brand-black mb-4">
            Start with a 30-Minute Discovery Call
          </h2>
          <p className="text-brand-black/70 mb-8">
            No sales pitch. No pressure. We&apos;ll understand your requirements and share exactly how we&apos;d
            structure your transport programme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              id="how-work-bottom-wa"
              className="bg-brand-black text-white font-bold px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              WhatsApp to Schedule
            </a>
            <Link href="/contact" id="how-work-bottom-contact" className="btn-outline-dark px-8 py-4 justify-center">
              Fill the Contact Form
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  )
}
