import { Car, Bot, ShieldCheck, Zap, RadioTower, MapPin, Lock, Smartphone, Briefcase } from 'lucide-react'

const trustItems = [
  { icon: Car, text: '6 Fleet Types Available' },
  { icon: Bot, text: 'AI-Powered Route Optimisation' },
  { icon: ShieldCheck, text: '24/7 Operations Command Centre' },
  { icon: Zap, text: 'EV-Ready Fleet' },
  { icon: RadioTower, text: 'AIS-140 Compliant' },
  { icon: MapPin, text: 'GPS-Tracked Every Vehicle' },
  { icon: Lock, text: 'Background-Verified Drivers' },
  { icon: Smartphone, text: 'Live Commute Tracking App' },
  { icon: Briefcase, text: 'Dedicated Account Manager' },
]

export default function TrustBar() {
  const doubled = [...trustItems, ...trustItems]

  return (
    <section
      className="bg-brand-yellow py-5 overflow-hidden"
      aria-label="Trust indicators"
    >
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 border-r border-brand-black/10 last:border-r-0"
              style={{ minWidth: 'max-content' }}
            >
              <item.icon className="w-5 h-5 text-brand-black" aria-hidden="true" />
              <span className="text-brand-black font-bold text-sm whitespace-nowrap tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
