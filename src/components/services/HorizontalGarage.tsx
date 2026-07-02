'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HorizontalGarage({ services }: { services: any[] }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Measure track width to ensure perfect pixel-accurate scroll
  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        // Total scrollable width is the track width minus the viewport width
        // Adding + 150px to ensure the last card comes further to the left and doesn't hug the screen edge
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth + 150)
      }
    }
    updateRange()
    window.addEventListener('resize', updateRange)
    return () => window.removeEventListener('resize', updateRange)
  }, [])

  // Handle hash navigation to scroll to specific cards
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash || !targetRef.current) return
      
      const index = services.findIndex(s => s.id === hash)
      if (index !== -1 && trackRef.current) {
        const cardElement = document.getElementById(hash)
        if (!cardElement) return

        // 1. Calculate how many pixels the track needs to translate to center this card
        const cardLeft = cardElement.offsetLeft
        const cardWidth = cardElement.offsetWidth
        const viewportWidth = window.innerWidth
        
        // We want the card in the middle: target translation = cardLeft - (viewportWidth / 2) + (cardWidth / 2)
        let targetTranslation = cardLeft - (viewportWidth / 2) + (cardWidth / 2)
        
        // 2. Clamp the translation so we don't scroll past the start or end of the track
        // The maximum translation is our scrollRange (calculated in updateRange)
        // If scrollRange isn't ready yet, estimate it:
        const currentScrollRange = scrollRange || (trackRef.current.scrollWidth - viewportWidth + 150)
        targetTranslation = Math.max(0, Math.min(targetTranslation, currentScrollRange))
        
        // 3. Convert that translation into a progress ratio [0, 1]
        const progress = targetTranslation / currentScrollRange
        
        // 4. Convert progress into vertical scroll distance
        const sectionHeight = targetRef.current.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollDistance = (sectionHeight - viewportHeight) * progress
        
        // 5. Add the section's absolute top offset to the body
        const rect = targetRef.current.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        
        window.scrollTo({
          top: sectionTop + scrollDistance,
          behavior: 'smooth'
        })
      }
    }

    // Run after a short delay to allow layout and scrollRange to settle
    const timer = setTimeout(handleHash, 300)
    
    // Listen for manual hash changes (e.g. clicking a footer link while already on the page)
    window.addEventListener('hashchange', handleHash)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [services])

  // Map scroll progress to exact pixel translation
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange])

  // Subtle parallax for the background grid
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"])

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-brand-black" id="services-garage">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Animated Parallax Background */}
        <motion.div 
          style={{ x: bgX }}
          className="absolute inset-0 opacity-10 pointer-events-none w-[200vw]"
        >
          <div className="w-full h-full grid-bg" />
        </motion.div>

        <div className="container mb-8 md:mb-12">
          <span className="section-tag-dark border-white/20 text-white/50 bg-white/5">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Explore the <span className="text-brand-yellow">Garage.</span>
          </h2>
          <p className="text-white/50 mt-2">Scroll down to navigate through our fleet and mobility solutions.</p>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 md:gap-10 px-6 md:px-8 max-w-max items-stretch h-max my-auto">
          {services.map((service) => (
            <div 
              key={service.id}
              id={service.id}
              className="w-[85vw] md:w-[70vw] lg:w-[800px] flex-shrink-0 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 hover:border-brand-yellow/30 transition-all duration-500 relative overflow-hidden group hover:-translate-y-2 flex flex-col md:flex-row gap-8 md:gap-12"
            >
              {/* Left Column: Title & Tagline */}
              <div className="relative z-10 md:w-1/2 flex flex-col justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-yellow flex items-center justify-center text-3xl md:text-4xl mb-6 shadow-[0_0_30px_rgba(255,204,53,0.3)]">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm md:text-lg text-white/60 leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              {/* Right Column: Details */}
              <div className="relative z-10 md:w-1/2 flex flex-col justify-center">
                <div className="space-y-6">
                  {service.features ? (
                    <div className="grid grid-cols-1 gap-5">
                      {service.features.map((feat: any) => (
                        <div key={feat.title}>
                          <h4 className="text-brand-yellow font-bold mb-1.5 text-[11px] md:text-xs uppercase tracking-wider">{feat.title}</h4>
                          <p className="text-white/50 text-[13px] md:text-sm leading-relaxed">{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-[11px] md:text-xs uppercase tracking-widest text-brand-yellow mb-3 font-bold">What&apos;s Included</h4>
                        <ul className="space-y-2">
                          {service.included?.map((item: string) => (
                            <li key={item} className="flex items-start gap-2 text-white/80">
                              <svg width="18" height="18" viewBox="0 0 24 24" className="mt-[2px] flex-shrink-0">
                                <circle cx="12" cy="12" r="10" fill="#FFCC35" fillOpacity="0.2" />
                                <path d="M8 12l3 3 5-5" stroke="#FFCC35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-[13px] md:text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-5 pt-5 border-t border-white/10">
                        <div>
                          <h4 className="text-[11px] md:text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">Fleet Options</h4>
                          <ul className="space-y-1">
                            {service.fleet?.map((f: string) => (
                              <li key={f} className="text-[13px] md:text-sm text-white/90">{f}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] md:text-xs uppercase tracking-widest text-brand-yellow mb-2 font-bold">Best For</h4>
                          <p className="text-[13px] md:text-sm text-white/90 leading-relaxed">{service.bestFor}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Scroll Progress Indicator */}
        <div className="container mt-12 hidden md:block">
          <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-yellow"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
