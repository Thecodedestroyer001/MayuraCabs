import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import FooterCTA from '@/components/shared/FooterCTA'
import TimeTunnel from '@/components/about/TimeTunnel'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Built in Bengaluru. Built for Bengaluru\'s enterprises. Learn about Mayura Car Rentals\' story, mission, and values.',
}

import { Zap, ShieldCheck, Search, Leaf, Handshake, Target } from 'lucide-react'

const values = [
  { icon: Zap, title: 'Technology First', desc: 'Our Commute platform is the backbone of everything we do. Every decision is data-driven.' },
  { icon: ShieldCheck, title: 'Safety Always', desc: 'Background-verified drivers, panic buttons, live tracking, and AIS-140 compliance - non-negotiable.' },
  { icon: Search, title: 'Total Transparency', desc: 'No hidden costs. Itemised billing, open dashboards, honest SLA reporting.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Actively growing our EV fleet. ESG reporting for every enterprise client.' },
  { icon: Handshake, title: 'Partnership', desc: 'We act as an extension of your HR and Admin team, not just a vendor.' },
  { icon: Target, title: 'Customisation', desc: 'No two enterprises are alike. Every programme is built to your specific requirements.' },
]

const comparisons = [
  { label: 'Point of contact', traditional: 'Multiple vendors, fragmented comms', mayura: 'Single dedicated account manager' },
  { label: 'Technology', traditional: 'Manual WhatsApp coordination', mayura: 'Full Commute platform with dashboard' },
  { label: 'Billing', traditional: 'Multiple invoices, disputes common', mayura: 'One consolidated monthly invoice' },
  { label: 'Fleet visibility', traditional: 'No real-time tracking', mayura: 'Live GPS on every vehicle, always' },
  { label: 'SLA compliance', traditional: 'Verbal assurances only', mayura: 'Written SLA with penalty clauses' },
  { label: 'ESG reporting', traditional: 'Not available', mayura: 'EV fleet data + emission reports' },
]

const storyTimeline = [
  { year: '2021', text: 'Mayura Car Rentals was founded in Bengaluru with a simple, powerful belief: enterprise employees deserve transport that actually works. Not transport managed through WhatsApp forwards and late-night driver calls.' },
  { year: '2022', text: 'Our founders spent years working in India\'s largest tech and BFSI enterprises, witnessing HR managers spending hours managing transport chaos instead of their actual job. They saw finance teams struggling to reconcile bills.' },
  { year: '2024', text: 'So they built Mayura - a company that combines a professional, safety-first fleet with proprietary technology to give enterprises total visibility and accountability over their employee transport operations.' },
  { year: 'Today', text: 'Mayura serves enterprises across IT/ITES, GCCs, BPO, BFSI, and consulting sectors in Bengaluru, managing thousands of trips per month with a 99.2% on-time delivery rate.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag mb-6 block w-fit">About Mayura</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Built in Bengaluru.
              <br />
              <span style={{ color: '#FFCC35' }}>Built for Bengaluru&apos;s Enterprises.</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              We started Mayura because we experienced the chaos of broken corporate transport first-hand.
              Today we&apos;re on a mission to make enterprise mobility seamless, safe, and sustainable.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Time Tunnel */}
      <TimeTunnel timeline={storyTimeline} />

      {/* Mission & Vision */}
      <section className="section bg-brand-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-black rounded-3xl overflow-hidden flex flex-col">
              <div className="h-64 w-full relative">
                <Image src="/images/command_center.png" alt="Mayura Command Center" fill className="object-cover" />
              </div>
              <div className="p-10 flex-1">
                <div className="w-12 h-1 bg-brand-yellow rounded mb-6" />
                <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  To make enterprise employee transport in Bengaluru safe, reliable, and effortless - by
                  combining best-in-class fleet operations with technology that puts HR and Admin teams
                  back in control.
                </p>
              </div>
            </div>
            <div className="bg-brand-yellow rounded-3xl overflow-hidden flex flex-col">
              <div className="h-64 w-full relative">
                <Image src="/images/premium_ev_fleet.png" alt="Mayura Premium EV Fleet" fill className="object-cover" />
              </div>
              <div className="p-10 flex-1">
                <div className="w-12 h-1 bg-brand-black rounded mb-6" />
                <h2 className="text-3xl font-black text-brand-black mb-4">Our Vision</h2>
                <p className="text-brand-black/70 text-lg leading-relaxed">
                  To be the most trusted corporate mobility partner for every enterprise operating in
                  India&apos;s top technology and business hubs - with zero-emission fleets by 2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-tag-dark mb-4 block w-fit mx-auto">What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-black">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-hover bg-brand-gray-100 rounded-2xl p-7">
                <div className="mb-4 text-brand-black">
                  <v.icon className="w-8 h-8" />
                </div>
                <h3 className="font-black text-brand-black text-lg mb-2">{v.title}</h3>
                <p className="text-brand-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-brand-gray-100">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag-dark mb-4 block w-fit mx-auto">Why We&apos;re Different</span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-black">
              Traditional Vendor vs. Mayura
            </h2>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            {/* Header */}
            <div className="grid grid-cols-3 bg-brand-black text-white text-sm font-bold">
              <div className="p-4 pl-6">Feature</div>
              <div className="p-4 text-center border-l border-white/10">Traditional Vendor</div>
              <div className="p-4 text-center border-l border-white/10 text-brand-yellow">Mayura</div>
            </div>
            {comparisons.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gray-100'} border-b border-gray-100 last:border-none`}
              >
                <div className="p-4 pl-6 font-semibold text-brand-black">{row.label}</div>
                <div className="p-4 text-center text-brand-gray-500 border-l border-gray-100">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-red-400">✗</span> {row.traditional}
                  </span>
                </div>
                <div className="p-4 text-center text-brand-black font-medium border-l border-gray-100">
                  <span className="inline-flex items-center gap-1">
                    <span style={{ color: '#FFCC35' }}>✓</span> {row.mayura}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  )
}
