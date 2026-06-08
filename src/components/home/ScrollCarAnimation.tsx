'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function ScrollCarAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Car drives from far left (offscreen) to far right (offscreen)
  const carX = useTransform(scrollYProgress, [0, 1], ['-100vw', '100vw'])

  // Feature 1
  const f1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0])
  const f1Y = useTransform(scrollYProgress, [0.05, 0.15], [50, 0])

  // Feature 2
  const f2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0])
  const f2Y = useTransform(scrollYProgress, [0.35, 0.45], [50, 0])

  // Feature 3
  const f3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0])
  const f3Y = useTransform(scrollYProgress, [0.65, 0.75], [50, 0])

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-brand-black" aria-label="Animated features">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Subtle Elements */}
        <div className="absolute inset-0 noise-overlay opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Features popups */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-32 md:pt-48 z-20 pointer-events-none">
          
          <motion.div 
            style={{ opacity: f1Opacity, y: f1Y }}
            className="absolute top-12 md:top-20 lg:top-24 max-w-2xl text-center px-4"
          >
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-brand-yellow mb-6">AI-Powered Routing</h3>
            <p className="text-xl md:text-2xl text-white/70">Dynamic dispatch guarantees zero wait times and optimal efficiency for every shift.</p>
          </motion.div>

          <motion.div 
            style={{ opacity: f2Opacity, y: f2Y }}
            className="absolute top-12 md:top-20 lg:top-24 max-w-2xl text-center px-4"
          >
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-brand-yellow mb-6">24/7 Command Centre</h3>
            <p className="text-xl md:text-2xl text-white/70">Real-time GPS tracking and dedicated support teams ensure complete safety and visibility.</p>
          </motion.div>

          <motion.div 
            style={{ opacity: f3Opacity, y: f3Y }}
            className="absolute top-12 md:top-20 lg:top-24 max-w-2xl text-center px-4"
          >
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-brand-yellow mb-6">EV-Ready Fleet</h3>
            <p className="text-xl md:text-2xl text-white/70">Slash your corporate carbon footprint with our premium fleet of electric vehicles.</p>
          </motion.div>

        </div>

        {/* The Animated Car Container */}
        <motion.div 
          style={{ x: carX }}
          className="absolute z-30 mt-32 w-[300px] sm:w-[450px] md:w-[900px] lg:w-[1100px] max-w-none flex items-center justify-center"
        >
          <div className="relative w-full">
            {/* Speed lines effect behind car to make it look like it's driving */}
            <div className="absolute top-1/2 -left-20 md:-left-40 w-40 md:w-64 h-1 bg-gradient-to-r from-transparent to-brand-yellow/60 blur-[2px] transform -translate-y-1/2" />
            <div className="absolute top-2/3 -left-32 md:-left-64 w-32 md:w-48 h-0.5 bg-gradient-to-r from-transparent to-white/40 blur-[1px]" />
            
            <Image
              src="/car-mockup-transparent.png"
              alt="Mayura Fleet Vehicle"
              width={1100}
              height={738}
              style={{ width: '100%', height: 'auto' }}
              className="drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
        
        {/* Ground Line */}
        <div className="absolute top-[65%] md:top-[70%] w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  )
}
