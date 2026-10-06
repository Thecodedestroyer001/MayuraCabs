import { Car, CarFront, Bus, BusFront, Zap, MapPin, Calendar, LineChart, CreditCard, Smartphone, AlertTriangle } from 'lucide-react'

const fleetTypes = [
  { icon: CarFront, name: 'Sedans', desc: 'Dzire, Amaze - Executive daily commute' },
  { icon: Car, name: 'Premium / Luxury', desc: 'For Senior Leadership travel' },
  { icon: Car, name: 'SUVs', desc: 'Ertiga, Innova - 6–7 seater pool rides' },
  { icon: BusFront, name: 'Mini Vans', desc: 'Tempo Traveller - 9–12 seater shuttles' },
  { icon: Bus, name: 'Buses', desc: '20–54 seater for large workforce' },
  { icon: Zap, name: 'EV Fleet', desc: 'Tata Nexon EV, Tigor EV - zero emission' },
]

const platformFeatures = [
  { icon: MapPin, title: 'Live Fleet Tracking', desc: 'Real-time GPS on every vehicle, always' },
  { icon: Calendar, title: 'Smart Scheduling', desc: 'Automated roster + route generation' },
  { icon: LineChart, title: 'Executive Dashboard', desc: 'Cost, utilisation & SLA reports' },
  { icon: CreditCard, title: 'Consolidated Billing', desc: 'One invoice, itemised per trip' },
  { icon: Smartphone, title: 'Employee App', desc: 'Live pickup ETA on employee\'s phone' },
  { icon: AlertTriangle, title: 'SOS & Safety Alerts', desc: 'One-tap emergency with auto-notification' },
]

export default function SolutionSection() {
  return (
    <section className="section bg-brand-gray-100" aria-labelledby="solution-heading">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="reveal">
            <span className="section-tag-dark">The Mayura Solution</span>
          </div>
          <h2
            id="solution-heading"
            className="reveal text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-tight mt-4"
          >
            One Partner.{' '}
            <span className="text-gradient-yellow" style={{ WebkitTextFillColor: 'initial', color: '#FFCC35' }}>
              Total Accountability.
            </span>{' '}
            Zero Complexity.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Fleet column */}
          <div className="reveal-left bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-black">
                <CarFront className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-black text-brand-black text-lg">Fleet Mix</h3>
              </div>
            </div>
            <div className="space-y-4">
              {fleetTypes.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-brand-yellow/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-gray-100 flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors flex-shrink-0 text-brand-black">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-brand-black text-sm">{item.name}</div>
                    <div className="text-brand-gray-500 text-xs mt-0.5">{item.desc}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform column */}
          <div className="reveal-right bg-brand-black rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/20 flex items-center justify-center text-brand-yellow">
                <Zap className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-black text-white text-lg">Commute Platform</h3>
                <p className="text-white/50 text-sm">Proprietary tech built for enterprise ops</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {platformFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow/40 hover:bg-brand-yellow/5 transition-all group"
                >
                  <div className="mb-4 text-brand-yellow">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{feat.title}</div>
                  <div className="text-white/50 text-xs leading-relaxed">{feat.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA inside */}
            <div className="mt-8 p-4 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20">
              <p className="text-brand-yellow text-sm font-semibold mb-1">Platform Demo Available</p>
              <p className="text-white/60 text-xs">See the Commute dashboard live - takes 20 minutes.</p>
            </div>
          </div>
        </div>

        {/* Bottom comparison row */}
        <div className="reveal mt-10 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
            <div className="text-3xl font-black text-brand-black mb-1">Traditional Vendor</div>
            <div className="text-brand-gray-500 text-sm">Multiple contacts • Zero data • Vendor chaos</div>
          </div>
          <div className="bg-brand-yellow rounded-2xl p-6 text-center relative overflow-hidden">
            <div className="absolute top-3 right-3 text-xs font-bold bg-brand-black text-brand-yellow px-2 py-1 rounded-full">MAYURA</div>
            <div className="text-3xl font-black text-brand-black mb-1">One Integrated Partner</div>
            <div className="text-brand-black/60 text-sm">Single POC • Live dashboard • SLA guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
