const trustItems = [
  { icon: '🚗', text: '6 Fleet Types Available' },
  { icon: '🤖', text: 'AI-Powered Route Optimisation' },
  { icon: '🛡️', text: '24/7 Operations Command Centre' },
  { icon: '⚡', text: 'EV-Ready Fleet' },
  { icon: '📡', text: 'AIS-140 Compliant' },
  { icon: '📍', text: 'GPS-Tracked Every Vehicle' },
  { icon: '🔒', text: 'Background-Verified Drivers' },
  { icon: '📱', text: 'Live Commute Tracking App' },
  { icon: '💼', text: 'Dedicated Account Manager' },
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
              <span className="text-xl" role="img" aria-hidden="true">{item.icon}</span>
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
