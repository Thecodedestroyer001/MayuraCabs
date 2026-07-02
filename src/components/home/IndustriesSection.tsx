import { Laptop, Globe, PhoneCall, Landmark, TrendingUp, Rocket, Microscope, Lightbulb } from 'lucide-react'

const industries = [
  {
    icon: Laptop,
    name: 'IT / ITES',
    companies: 'Infosys, Wipro, TCS, Capgemini',
  },
  {
    icon: Globe,
    name: 'Global Capability Centres',
    companies: 'SAP Labs, LinkedIn, Google, Intel',
  },
  {
    icon: PhoneCall,
    name: 'BPO / KPO',
    companies: 'Concentrix, EXL, Mphasis, WNS',
  },
  {
    icon: Landmark,
    name: 'BFSI',
    companies: 'HSBC, Citi, Goldman Sachs, JPMorgan',
  },
  {
    icon: TrendingUp,
    name: 'Consulting',
    companies: 'Deloitte, PwC, KPMG, McKinsey',
  },
  {
    icon: Rocket,
    name: 'Product Companies',
    companies: 'Swiggy, Zepto, Razorpay, Meesho',
  },
  {
    icon: Microscope,
    name: 'Semiconductor',
    companies: 'Qualcomm, NXP, Micron, STMicro',
  },
  {
    icon: Lightbulb,
    name: 'High-Growth Startups',
    companies: 'Series B+ with 200+ employees',
  },
]

export default function IndustriesSection() {
  return (
    <section
      className="section pb-32 bg-brand-black noise-overlay"
      aria-labelledby="industries-heading"
    >


      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="reveal">
            <span className="section-tag">Industries We Serve</span>
          </div>
          <h2
            id="industries-heading"
            className="reveal text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mt-4"
          >
            Built for the Enterprises
            <br />
            <span style={{ color: '#FFCC35' }}>That Power Bengaluru</span>
          </h2>
          <p className="reveal text-white/60 text-lg mt-6 leading-relaxed">
            Every industry has unique transport requirements. Mayura builds customised programmes for the
            specific shift patterns, security protocols, and compliance needs of each sector.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="reveal card-hover group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-yellow/40 hover:bg-brand-yellow/5 transition-all cursor-default"
            >
              <div className="mb-4 text-brand-yellow">
                <ind.icon className="w-8 h-8" />
              </div>
              <h3 className="font-black text-white text-sm mb-2 group-hover:text-brand-yellow transition-colors leading-snug">
                {ind.name}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">{ind.companies}</p>
            </div>
          ))}
        </div>

        {/* Bottom stat bar */}
        <div className="reveal mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
          {[
            { num: '8+', label: 'Industries Served' },
            { num: '500+', label: 'Vehicles Deployed' },
            { num: '50K+', label: 'Employee Trips / Month' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black" style={{ color: '#FFCC35' }}>{stat.num}</div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/40 to-transparent" />
    </section>
  )
}
