'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StackingCards({ team }: { team: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative pb-32">
      {team.map((member, i) => {
        // Calculate dynamic properties for stacking effect
        const targetScale = 1 - ( (team.length - i) * 0.05 )
        
        return (
          <div 
            key={member.name}
            className="sticky flex justify-center mb-16 md:mb-32 px-4"
            style={{ 
              top: `calc(100px + ${i * 30}px)`, 
              zIndex: i 
            }}
          >
            <motion.div 
              className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] flex flex-col md:flex-row w-full max-w-4xl mx-auto origin-top"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            >
              {/* Left Side: Avatar */}
              <div
                className="w-full md:w-2/5 h-64 md:h-auto flex flex-col items-center justify-center p-8 relative overflow-hidden group"
                style={{ background: member.bg, color: member.textColor }}
              >
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjU2IDI1NicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuOScgbnVtT2N0YXZlcz0nNCcgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZSknLz48L3N2Zz4=')] mix-blend-overlay pointer-events-none" />
                
                <span className="text-[120px] font-black tracking-tighter opacity-10 absolute -bottom-10 -right-4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  {member.initials}
                </span>
                
                <div className="relative z-10 text-6xl md:text-8xl font-black drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                  {member.initials}
                </div>
              </div>

              {/* Right Side: Info */}
              <div className="p-8 md:p-12 flex flex-col flex-1 bg-white relative">
                <h2 className="font-black text-brand-black text-3xl md:text-4xl leading-tight mb-2">{member.name}</h2>
                <p className="text-brand-yellow text-sm md:text-base font-bold uppercase tracking-widest mb-6">{member.title}</p>
                
                <p className="text-brand-gray-500 text-base md:text-lg leading-relaxed mb-8 flex-1">
                  {member.experience}
                </p>
                
                <div className="bg-brand-gray-100 rounded-2xl px-5 py-4 mb-8 border border-gray-200">
                  <p className="text-brand-black text-xs font-bold uppercase tracking-wider mb-1">Primary Focus</p>
                  <p className="text-brand-gray-700 text-sm">{member.focus}</p>
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={member.linkedin}
                    className="w-12 h-12 rounded-xl bg-brand-black flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-black hover:-translate-y-1 transition-all duration-300 shadow-md"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-brand-gray-200 flex items-center justify-center text-brand-black hover:border-brand-yellow hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
