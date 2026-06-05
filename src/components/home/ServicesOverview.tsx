import Link from 'next/link'

const services = [
  {
    icon: '🏢',
    title: 'Employee Daily Commute',
    desc: 'End-to-end managed pick-up and drop service for your entire workforce. Dynamic routing, GPS tracking, and real-time alerts.',
    href: '/services#daily-commute',
    accent: '#FFCC35',
  },
  {
    icon: '🚌',
    title: 'Fixed-Route Shuttle',
    desc: 'High-capacity shuttle buses on pre-planned corridors. Cost-effective for 50+ employees on similar routes.',
    href: '/services#shuttle',
    accent: '#FFCC35',
  },
  {
    icon: '🤝',
    title: 'Corporate Car Rentals',
    desc: 'Dedicated vehicles for executives, client visits, airport transfers, and ad-hoc business travel.',
    href: '/services#car-rentals',
    accent: '#FFCC35',
  },
  {
    icon: '⚡',
    title: 'EV Fleet',
    desc: 'Fully electric vehicles with zero-emission reporting for ESG compliance. Tata Nexon EV and Tigor EV ready.',
    href: '/services#ev-fleet',
    accent: '#FFCC35',
  },
  {
    icon: '📱',
    title: 'Commute Platform',
    desc: 'Our proprietary platform gives your admin team real-time visibility, automated billing, and SLA dashboards.',
    href: '/services#platform',
    accent: '#FFCC35',
  },
  {
    icon: '✈️',
    title: 'Airport & Outstation',
    desc: 'Premium vehicle options for airport transfers, outstation travel, and inter-city corporate trips.',
    href: '/services#airport',
    accent: '#FFCC35',
  },
]

export default function ServicesOverview() {
  return (
    <section className="section bg-white" aria-labelledby="services-heading">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal">
            <span className="section-tag-dark">Our Services</span>
          </div>
          <h2
            id="services-heading"
            className="reveal text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-tight mt-4"
          >
            Everything Your Employees Need.
            <br />
            <span style={{ color: '#FFCC35' }}>Nothing You Have to Manage.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="reveal card-hover group relative bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 shadow-sm hover:border-brand-yellow/50 hover:shadow-brand-yellow/10 hover:shadow-xl transition-all"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-brand-gray-100 flex items-center justify-center text-2xl group-hover:bg-brand-yellow/10 transition-colors flex-shrink-0">
                {service.icon}
              </div>

              <div className="flex-1">
                <h3 className="font-black text-brand-black text-lg mb-2 leading-snug group-hover:text-brand-yellow transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-brand-gray-500 text-sm font-semibold group-hover:text-brand-yellow transition-colors">
                Learn more
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

              {/* Yellow accent bottom bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform rounded-b-2xl origin-left" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-12">
          <Link href="/services" id="explore-services-btn" className="btn-primary text-base px-10 py-4">
            Explore All Services
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
