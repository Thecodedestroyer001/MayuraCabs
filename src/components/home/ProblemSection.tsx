const painPoints = [
  {
    icon: '💸',
    problem: 'Skyrocketing and unpredictable transport costs',
    desc: 'No visibility into per-trip costs, surge pricing, or billing disputes with multiple vendors.',
  },
  {
    icon: '📋',
    problem: 'Multiple vendors, zero accountability',
    desc: 'Managing 3–5 cab vendors with different SLAs, no single point of contact, constant escalations.',
  },
  {
    icon: '😟',
    problem: 'Employee safety and late pickups',
    desc: 'Drivers who are unverified, vehicles without GPS, and employees left stranded after late shifts.',
  },
  {
    icon: '📊',
    problem: 'Zero data or reporting',
    desc: 'No dashboards, no utilisation reports, no way to justify transport spend to finance teams.',
  },
  {
    icon: '🌿',
    problem: 'No path to sustainability goals',
    desc: 'ESG commitments require EV fleet data — traditional vendors can\'t provide it.',
  },
  {
    icon: '🔄',
    problem: 'Route chaos during office expansions',
    desc: 'Adding new offices or shift changes creates weeks of manual route replanning and employee complaints.',
  },
]

export default function ProblemSection() {
  return (
    <section className="section bg-white" aria-labelledby="problem-heading">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal">
            <span className="section-tag-dark">The Problem</span>
          </div>
          <h2
            id="problem-heading"
            className="reveal text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-tight mt-4"
          >
            Is Your Corporate Transport Programme{' '}
            <span className="relative inline-block">
              Costing You More
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C60 3.5 240 3.5 298 8.5"
                  stroke="#FFCC35"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            Than It Should?
          </h2>
          <p className="reveal text-brand-gray-500 text-lg mt-6 leading-relaxed">
            Most Bengaluru enterprises are losing money, time, and employee trust on broken transport programmes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {painPoints.map((point) => (
            <div
              key={point.problem}
              className="reveal card-hover bg-white border border-gray-100 rounded-2xl p-7 group shadow-sm hover:border-brand-yellow/30"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gray-100 flex items-center justify-center text-2xl mb-5 group-hover:bg-brand-yellow/10 transition-colors">
                {point.icon}
              </div>
              <h3 className="font-bold text-brand-black text-base mb-2 leading-snug">
                {point.problem}
              </h3>
              <p className="text-brand-gray-500 text-sm leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Closing callout */}
        <div className="reveal mt-14 text-center max-w-2xl mx-auto">
          <div className="bg-brand-gray-100 rounded-2xl p-8 border border-gray-200">
            <p className="text-brand-black text-xl font-bold italic leading-relaxed">
              &ldquo;If you manage transport for 200+ employees, you deserve a partner who treats it like a
              mission-critical operation — not an afterthought.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
