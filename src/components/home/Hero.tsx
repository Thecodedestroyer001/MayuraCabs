'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const fleetImages = [
    '/sedan-transparent.png',
    '/van-transparent.png',
    '/bus-transparent.png'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % fleetImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timeline = [
      { el: headlineRef.current, delay: 100 },
      { el: subRef.current, delay: 350 },
      { el: ctaRef.current, delay: 550 },
      { el: statsRef.current, delay: 750 },
    ]
    timeline.forEach(({ el, delay }) => {
      if (el) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        setTimeout(() => {
          if (el) {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }
        }, delay)
      }
    })
  }, [])

  return (
    <section
      className="relative min-h-screen bg-brand-black overflow-hidden noise-overlay grid-bg pt-24 lg:pt-28 pb-16 lg:pb-24"
      aria-label="Hero section"
    >


      {/* Animated background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-brand-yellow/10 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-white mb-6"
              style={{ textWrap: 'balance' }}
            >
              Corporate Employee
              <br />
              <span className="text-gradient-yellow">Transport.</span>
            </h1>

            <p
              ref={subRef}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-md"
            >
              AI-powered, reliable corporate mobility for Bengaluru&apos;s top enterprises. 
              Zero operational headaches - guaranteed.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                id="hero-discovery-btn"
                className="btn-primary text-base px-8 py-3.5"
              >
                Book a Discovery Call
              </Link>
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi%20Mayura%2C%20I'm%20interested%20in%20corporate%20transport%20for%20my%20company"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="btn-outline text-base px-8 py-3.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2 inline-block">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10"
            >
              {[
                { num: '6+', label: 'Fleet Types' },
                { num: '24/7', label: 'Operations' },
                { num: '100%', label: 'GPS Tracked' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-black text-brand-yellow">{stat.num}</div>
                  <div className="text-white/50 text-xs mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Car mockup */}
          <div
            ref={carRef}
            className="order-1 lg:order-2 relative flex items-center justify-center"
          >
            <div className="relative">

              {/* Floating car slider */}
              <div className="hero-float translate-y-0 md:-translate-y-8 lg:-translate-y-12 scale-[1.3] sm:scale-[1.35] md:scale-125 lg:scale-125 xl:scale-150 relative h-[250px] sm:h-[350px] md:h-[600px] w-full min-w-[280px] sm:min-w-[320px] md:min-w-[500px] flex items-center justify-center overflow-visible">
                <motion.img
                  key={currentImageIndex}
                  src={fleetImages[currentImageIndex]}
                  alt="Mayura branded corporate vehicle"
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                  className="w-full h-auto max-w-[900px] object-contain drop-shadow-2xl absolute"
                />
              </div>
              {/* Floating badge - Free Pilot */}
              <div
                className="absolute -bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-16 md:left-16 bg-brand-yellow text-brand-black px-4 py-2 rounded-xl shadow-2xl hero-float-delayed"
              >
                <div className="text-xs font-bold uppercase tracking-wide">Enterprise Assessment</div>
                <div className="text-xs font-medium opacity-70">No commitment required</div>
              </div>
              {/* Floating badge - AIS140 */}
              <div
                className="absolute -top-4 right-4 sm:top-4 sm:right-4 md:top-8 md:right-8 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 hero-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="text-xs font-bold">AIS-140 Compliant</div>
                <div className="text-xs opacity-60">Government certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  )
}
