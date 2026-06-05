import type { Metadata } from 'next'
import Link from 'next/link'
import FooterCTA from '@/components/shared/FooterCTA'
import HorizontalGarage from '@/components/services/HorizontalGarage'

export const metadata: Metadata = {
  title: 'Corporate Employee Transport Services Bengaluru',
  description: 'Employee daily commute, fixed-route shuttles, EV fleet, Commute platform, and airport transfers for Bengaluru enterprises.',
}

const services = [
  {
    id: 'daily-commute',
    icon: '🏢',
    title: 'Employee Daily Commute',
    tagline: 'End-to-end managed pick-up and drop for your entire workforce.',
    included: [
      'Home-to-office and office-to-home coverage',
      'Dynamic route optimisation (updated daily)',
      'GPS tracking on every vehicle, every trip',
      'Real-time alerts to employees and admin',
      'Background-verified, trained drivers',
      'Incident reporting and escalation system',
    ],
    fleet: ['Hatchbacks (4-seater)', 'Sedans (4-seater)', 'SUVs (6-7 seater)'],
    bestFor: 'IT/ITES, GCCs, BFSI with 200+ employees across multiple shifts',
  },
  {
    id: 'shuttle',
    icon: '🚌',
    title: 'Fixed-Route Shuttle Service',
    tagline: 'High-capacity buses on pre-planned corridors — cost-effective for large workforces.',
    included: [
      'Pre-planned routes based on employee density',
      'Dedicated boarding stops with ETA updates',
      'Air-conditioned buses (20–54 seater)',
      'Route adherence monitoring via GPS',
      'Monthly ridership and utilisation reports',
      'Seat booking via Commute app',
    ],
    fleet: ['Mini Vans (9-12 seater)', 'Standard Buses (20-32 seater)', 'Large Buses (33-54 seater)'],
    bestFor: 'BPO/KPO, large IT campuses with concentrated employee catchment areas',
  },
  {
    id: 'car-rentals',
    icon: '🤝',
    title: 'Corporate Car Rentals',
    tagline: 'Dedicated vehicles for executives, client visits, and ad-hoc business travel.',
    included: [
      'Monthly, weekly, or daily rental plans',
      'Executive and premium vehicle options',
      'Chauffeur-driven with business etiquette training',
      'Client visit coordination',
      'Airport pick-up and drop scheduling',
      'Consolidated billing with trip log',
    ],
    fleet: ['Executive Sedans (Dzire, City)', 'Premium SUVs (Innova Crysta)', 'Luxury (Fortuner, available on request)'],
    bestFor: 'Consulting, BFSI, and product companies with senior leadership travel needs',
  },
  {
    id: 'ev-fleet',
    icon: '⚡',
    title: 'EV Fleet — Zero Emission Transport',
    tagline: 'Fully electric vehicles for enterprises committed to sustainability targets.',
    included: [
      'Tata Nexon EV and Tigor EV in fleet',
      'Zero-emission trip reports for ESG compliance',
      'Charging infrastructure coordination',
      'CO₂ savings certificate (monthly)',
      'Same GPS tracking and Commute platform integration',
      'No additional premium over standard fleet',
    ],
    fleet: ['Tata Tigor EV (4-seater)', 'Tata Nexon EV (5-seater)', 'Expanding to MG ZS EV (Q3 2026)'],
    bestFor: 'GCCs, product companies, and enterprises with sustainability mandates',
  },
  {
    id: 'platform',
    icon: '📱',
    title: 'Commute Platform',
    tagline: 'Proprietary enterprise mobility software — included free with all Mayura services.',
    features: [
      {
        title: 'Smart Scheduling',
        desc: 'Automated roster generation, dynamic route optimisation, and shift-change management.',
      },
      {
        title: 'Fleet Tracking',
        desc: 'Live GPS for every vehicle. Employee app shows pickup ETA with driver details.',
      },
      {
        title: 'Executive Dashboard',
        desc: 'Cost per trip, utilisation rates, SLA compliance, and monthly trend reports.',
      },
      {
        title: 'Consolidated Billing',
        desc: 'Single monthly invoice, itemised by employee, route, shift, and vehicle type.',
      },
    ],
    bestFor: 'All enterprise clients — included as standard, no additional cost',
  },
  {
    id: 'airport',
    icon: '✈️',
    title: 'Airport & Outstation Travel',
    tagline: 'Premium, reliable transfers for airport and inter-city business travel.',
    included: [
      'Kempegowda International Airport (BLR) — all terminals',
      'Flight tracking for accurate pickup timing',
      'Meet-and-greet inside terminal (on request)',
      'Outstation travel: Mysuru, Chennai, Hyderabad corridors',
      'Multi-city booking via single request',
      'Corporate account with post-trip invoicing',
    ],
    fleet: ['Executive Sedans', 'Premium SUVs', 'Tempo Traveller for team travel'],
    bestFor: 'All enterprises — leadership teams, client delegations, team off-sites',
  },
]

const fleetVehicles = [
  { name: 'Hatchback', example: 'Alto, Swift, i20', capacity: '4 passengers', type: 'Daily Commute' },
  { name: 'Sedan', example: 'Dzire, Amaze, Honda City', capacity: '4 passengers', type: 'Executive Travel' },
  { name: 'SUV / MUV', example: 'Ertiga, Innova, Crysta', capacity: '6–7 passengers', type: 'Pool / Premium' },
  { name: 'Mini Van', example: 'Tempo Traveller 9-seater', capacity: '9 passengers', type: 'Shuttle' },
  { name: 'Bus', example: '20, 32, 45, 54 seater', capacity: 'Up to 54 passengers', type: 'Fixed-Route Shuttle' },
  { name: 'EV Fleet', example: 'Nexon EV, Tigor EV', capacity: '4–5 passengers', type: 'Zero Emission' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag mb-6 block w-fit">Our Services</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              One Partner.
              <br />
              <span style={{ color: '#FFCC35' }}>Every Mobility Need. Covered.</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              From daily employee commutes to EV fleets and airport transfers — Mayura manages your
              entire transport programme so your HR and admin team doesn&apos;t have to.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Horizontal Garage Scroll */}
      <HorizontalGarage services={services} />

      {/* Fleet Overview */}
      <section className="section bg-brand-black noise-overlay">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-tag mb-4 block w-fit mx-auto">Fleet Overview</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              6 Vehicle Categories. Every Need Covered.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fleetVehicles.map((v) => (
              <div key={v.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-yellow/30 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-black text-white text-lg">{v.name}</h3>
                  <span className="text-xs bg-brand-yellow/20 text-brand-yellow px-2 py-1 rounded-full font-semibold">{v.type}</span>
                </div>
                <p className="text-white/50 text-sm mb-1">{v.example}</p>
                <p className="text-white/30 text-xs">{v.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-sm bg-brand-yellow relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-black/5 pointer-events-none" />
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-black mb-4">
            Request a Fleet Demo or Free 7-Day Pilot
          </h2>
          <p className="text-brand-black/70 text-lg mb-8 max-w-xl mx-auto">
            See the Commute platform live and get a customised fleet proposal for your enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              id="services-cta-wa"
              className="bg-brand-black text-white font-bold px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              WhatsApp Us Now
            </a>
            <Link href="/contact" id="services-cta-call" className="btn-outline-dark px-8 py-4 justify-center">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  )
}
