'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'

export default function DynamicRouteTimeline({ steps }: { steps: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress of the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Smooth the scroll so the line drawing feels fluid, not jittery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20
  })

  // Map progress to height (0% to 100%)
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-10 md:py-20">
      
      {/* Background SVG Line (The Track) */}
      <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-1 md:-ml-[2px] z-0">
        <div className="absolute inset-0 bg-gray-200/50 rounded-full" />
        
        {/* Animated drawing line */}
        <motion.div 
          className="absolute top-0 left-0 w-full bg-brand-yellow origin-top rounded-full shadow-[0_0_15px_rgba(255,204,53,0.6)]"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-12 md:gap-20">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0
          
          return (
            <div key={step.number} className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Node (Circle on the line) */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-200px" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                className="absolute left-[20px] md:left-1/2 md:-ml-5 w-10 h-10 rounded-full bg-brand-black border-[3px] border-brand-yellow flex items-center justify-center shadow-[0_0_20px_rgba(255,204,53,0.5)] z-20"
              >
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </motion.div>

              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}
              >
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                  {/* Faint Step Number removed per user request */}

                  <div className="relative z-10">
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                      <span className="text-xs font-bold bg-brand-black text-brand-yellow px-3 py-1.5 rounded-full">
                        {step.timeline}
                      </span>
                      <span className="text-brand-gray-500 font-bold tracking-widest text-sm">STEP {step.number}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-brand-black mb-6 leading-tight">
                      {step.title}
                    </h2>

                    <ul className={`space-y-3 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                      {step.what.map((item: string) => (
                        <li key={item} className={`flex items-start gap-3 w-full ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                            <circle cx="12" cy="12" r="10" fill="#FFCC35" fillOpacity="0.2"/>
                            <path d="M8 12l3 3 5-5" stroke="#1C1C1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-brand-gray-700 text-sm md:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {step.cta && (
                      <div className={`mt-8 pt-6 border-t border-gray-100 ${isEven ? 'md:flex md:justify-end' : ''}`}>
                        <Link
                          href="/contact"
                          className="btn-primary text-sm shadow-[0_4px_15px_rgba(255,204,53,0.3)]"
                        >
                          Book Your Discovery Call →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
