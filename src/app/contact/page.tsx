'use client'

import MagneticGlowForm from '@/components/contact/MagneticGlowForm'
import { Map, RefreshCw, Car, FileText } from 'lucide-react'
import { useSiteContent } from '@/components/shared/SiteContentProvider'

const contactOptions = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366' }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    title: 'WhatsApp Us',
    value: '+91-XXXXXXXXXX',
    sub: 'Message us on WhatsApp',
    href: 'https://wa.me/91XXXXXXXXXX',
    id: 'contact-wa',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFCC35" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Call Us',
    value: '+91-XXXXXXXXXX',
    sub: 'Mon–Sat, 9AM–7PM IST',
    href: 'tel:+91XXXXXXXXXX',
    id: 'contact-call',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFCC35" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Book a Discovery Call',
    value: 'Schedule via Calendly',
    sub: '30-minute call with our team',
    href: '#',
    id: 'contact-calendly',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFCC35" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Email Us',
    value: 'contact@mayuracabs.com',
    sub: 'Detailed enquiries and proposals',
    href: 'mailto:contact@mayuracabs.com',
    id: 'contact-email',
  },
]


const incentives = [
  { icon: Map, title: 'Transport Audit', desc: 'Full analysis of your current setup, cost, and inefficiencies.' },
  { icon: RefreshCw, title: 'Route Optimisation Analysis', desc: 'AI-powered route design for your employee addresses.' },
  { icon: Car, title: 'Enterprise Assessment', desc: 'Full fleet deployment at transparent terms. Contact us for details.' },
  { icon: FileText, title: 'SLA Template', desc: 'Our proven transport SLA - adapt it for any vendor you work with.' },
]

const serviceOptions = [
  'Employee Daily Commute', 'Fixed-Route Shuttle', 'Corporate Car Rentals',
  'EV Fleet', 'Commute Platform Demo', 'Airport & Outstation', 'Enterprise Assessment',
]

const employeeOptions = [
  '50–200 employees', '200–500 employees', '500–1000 employees', '1000+ employees',
]

export default function ContactPage() {
  const heroTitle = useSiteContent('contact.hero_title', "Let's Talk About Your Transport Requirements")
  const heroDescription = useSiteContent('contact.hero_description', 'Fill in the form below and our team will contact you with a customised proposal for your enterprise.')
  const email = useSiteContent('global.email', 'contact@mayuracabs.com')
  const phone = useSiteContent('global.phone', '+91-9686180808')
  const whatsapp = useSiteContent('global.whatsapp', '919686180808')

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container max-w-3xl">
          <span className="section-tag mb-6 block w-fit">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            <span style={{ color: '#FFCC35' }}>{heroTitle}</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Contact options grid */}
      <section className="section-sm bg-brand-gray-100">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactOptions.map((opt) => {
              const value = opt.id === 'contact-wa' || opt.id === 'contact-call' ? phone : opt.id === 'contact-email' ? email : opt.value
              const href = opt.id === 'contact-wa' ? `https://wa.me/${whatsapp}` : opt.id === 'contact-call' ? `tel:${phone.replace(/\s/g, '')}` : opt.id === 'contact-email' ? `mailto:${email}` : opt.href
              return (
              <a
                key={opt.id}
                href={href}
                id={opt.id}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card-hover bg-brand-black rounded-2xl p-6 flex flex-col gap-3"
              >
                <div>{opt.icon}</div>
                <div>
                  <div className="font-black text-white text-base">{opt.title}</div>
                  <div className="text-brand-yellow text-sm font-semibold mt-1">{value}</div>
                  <div className="text-white/40 text-xs mt-1">{opt.sub}</div>
                </div>
              </a>
            )})}
          </div>
        </div>
      </section>

      {/* Lead form + incentives */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <MagneticGlowForm 
                serviceOptions={serviceOptions} 
                employeeOptions={employeeOptions} 
              />
            </div>

            {/* Incentives */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-brand-black mb-6">When You Contact Us, You Get:</h3>
              {incentives.map((inc) => (
                <div key={inc.title} className="bg-brand-gray-100 rounded-2xl p-5">
                  <div className="mb-3 text-brand-black">
                    <inc.icon className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-brand-black text-sm mb-1">{inc.title}</div>
                  <div className="text-brand-gray-500 text-xs leading-relaxed">{inc.desc}</div>
                </div>
              ))}

              {/* Office info */}
              <div className="bg-brand-black rounded-2xl p-5 mt-4">
                <h3 className="font-bold text-brand-yellow text-sm mb-3">Office</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Mayura Car Rentals LLP<br />
                  Bengaluru, Karnataka - 560001<br />
                  India
                </p>
                <p className="text-white/40 text-xs mt-3">
                  CIN: [to be updated]<br />
                  GST: [to be updated]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
