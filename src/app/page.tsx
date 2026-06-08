'use client'
import { useEffect } from 'react'
import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import ProblemSection from '@/components/home/ProblemSection'
import SolutionSection from '@/components/home/SolutionSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import IndustriesSection from '@/components/home/IndustriesSection'
import PilotOffer from '@/components/home/PilotOffer'
import FooterCTA from '@/components/shared/FooterCTA'
import ScrollCarAnimation from '@/components/home/ScrollCarAnimation'

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero />
      <ScrollCarAnimation />
      <TrustBar />
      <ProblemSection />
      <PilotOffer />
      <SolutionSection />
      <ServicesOverview />
      <IndustriesSection />
      <FooterCTA />
    </>
  )
}
