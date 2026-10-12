'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSiteContent } from '@/components/shared/SiteContentProvider'

export default function Hero() {
  const heroTitle = useSiteContent('home.hero_title_primary', 'Enterprise Mobility.')
  const heroTitleAccent = useSiteContent('home.hero_title_accent', 'Redefined for Bengaluru.')
  const heroDescription = useSiteContent('home.hero_description_v2', "Mayura Car Rentals provides end-to-end transport management, premium fleet solutions, and route optimization for Bengaluru’s top enterprises.")
  const primaryCta = useSiteContent('home.primary_cta', 'Book a Discovery Call')
  const secondaryCta = useSiteContent('home.secondary_cta', 'WhatsApp Us')
  const badgeTitle = useSiteContent('home.badge_title', 'Enterprise Assessment')
  const badgeSubtitle = useSiteContent('home.badge_subtitle', 'No commitment required')
  const whatsapp = useSiteContent('global.whatsapp', '917619196161')
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const fleetImages = [
    '/sedan-yellow-top.png',
    '/van-yellow-top.png',
    '/bus-yellow-top.png',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((previousIndex) => (previousIndex + 1) % fleetImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [fleetImages.length])

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
      className="relative min-h-screen bg-brand-black overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-24 flex items-center"
      aria-label="Hero section"
    >
      <Image
        src="/home-hero.png"
        alt="Modern corporate campus at sunset"
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />

      <div className="container relative z-10">
        <div className="relative -top-6 sm:-top-8 lg:-top-12 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center py-12 sm:py-16 lg:py-24">
          {/* Text */}
          <div className="order-1">
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-white mb-4 sm:mb-6"
              style={{ textWrap: 'balance' }}
            >
              <span data-content-key="home.hero_title_primary" className="block text-white">{heroTitle}</span>
              <span data-content-key="home.hero_title_accent" className="block text-brand-yellow">{heroTitleAccent}</span>
            </h1>

            <p
              data-content-key="home.hero_description"
              ref={subRef}
              className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md"
            >
              {heroDescription}
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link
                data-content-key="home.primary_cta"
                href="/contact"
                id="hero-discovery-btn"
                className="btn-primary text-base px-8 py-3.5"
              >
                {primaryCta}
              </Link>
              <a
                data-content-key="home.secondary_cta"
                href={`https://wa.me/${whatsapp}?text=Hi%20Mayura%2C%20I'm%20interested%20in%20corporate%20transport%20for%20my%20company`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="btn-outline text-base px-8 py-3.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2 inline-block">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                {secondaryCta}
              </a>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-white/10"
            >
              {[
                { num: '6+', label: 'Fleet Types' },
                { num: '24/7', label: 'Operations' },
                { num: '100%', label: 'GPS Tracked' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-3xl font-black text-brand-yellow">{stat.num}</div>
                  <div className="text-white/50 text-xs mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={carRef} className="relative order-2 flex items-center justify-center">
            <div className="relative -top-8 sm:-top-12 lg:-top-16 w-full max-w-[620px] lg:max-w-none">
              <div className="hero-float relative h-[240px] sm:h-[350px] md:h-[460px] lg:h-[520px] w-full flex items-center justify-center overflow-visible">
                <motion.img
                  key={currentImageIndex}
                  src={fleetImages[currentImageIndex]}
                  alt="Mayura branded corporate vehicle"
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
                  className="absolute w-[135%] sm:w-[125%] lg:w-[140%] h-auto max-w-[1100px] object-contain drop-shadow-2xl"
                />
              </div>

              <div className="absolute bottom-0 left-0 sm:bottom-8 sm:left-8 bg-brand-yellow text-brand-black px-3 sm:px-4 py-2 rounded-xl shadow-2xl hero-float-delayed">
                <div data-content-key="home.badge_title" className="text-xs font-bold uppercase tracking-wide">{badgeTitle}</div>
                <div data-content-key="home.badge_subtitle" className="text-xs font-medium opacity-70">{badgeSubtitle}</div>
              </div>

              <div className="absolute top-0 right-0 sm:top-4 sm:right-4 bg-black/45 backdrop-blur-md text-white px-3 sm:px-4 py-2 rounded-xl border border-white/20 hero-float">
                <div className="text-xs font-bold">AIS-140 Compliant</div>
                <div className="text-xs opacity-60">Government certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  )
}
