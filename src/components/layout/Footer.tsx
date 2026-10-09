'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSiteContent } from '@/components/shared/SiteContentProvider'

export default function Footer() {
  const year = new Date().getFullYear()
  const description = useSiteContent('global.footer_description', "Bengaluru's integrated corporate mobility company — AI-powered routing, 24/7 command centre, multi-fleet solution.")
  const email = useSiteContent('global.email', 'contact@mayuracabs.com')
  const phone = useSiteContent('global.phone', '+91-9686180808')

  return (
    <footer className="site-footer" style={{ backgroundColor: '#111111', color: '#ffffff', marginTop: 0, padding: 0 }}>

      {/* Yellow top accent line */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #FFCC35, transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 40px 60px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', justifyContent: 'space-between' }}>

          {/* Brand */}
          <div style={{ flex: '1 1 260px', minWidth: '220px', maxWidth: '300px' }}>
            <Image
              src="/logo-white.png"
              alt="Mayura Car Rentals"
              width={140}
              height={42}
              style={{ height: '38px', width: 'auto', marginBottom: '24px', display: 'block' }}
            />
            <p data-content-key="global.footer_description" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.8', marginBottom: '28px' }}>
              {description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                data-content-key="global.email"
                href={`mailto:${email}`}
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span style={{ color: '#FFCC35' }}>✉</span> {email}
              </a>
              <a
                data-content-key="global.phone"
                href={`tel:${phone.replace(/\s/g, '')}`}
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span style={{ color: '#FFCC35' }}>☎</span> {phone}
              </a>
            </div>
          </div>

          {/* Company */}
          <div style={{ flex: '1 1 140px', minWidth: '140px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
              Company
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                ['About Us', '/about'],
                ['Our Team', '/team'],
                ['How We Work', '/how-we-work'],
                ['Blog', '/blog'],
                ['Careers', 'mailto:careers@mayuracabs.com'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div style={{ flex: '1 1 180px', minWidth: '180px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
              Services
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                ['Employee Commute', '/services#daily-commute'],
                ['Fixed-Route Shuttle', '/services#shuttle'],
                ['Corporate Car Rentals', '/services#car-rentals'],
                ['EV Fleet', '/services#ev-fleet'],
                ['Commute Platform', '/services#platform'],
                ['Airport & Outstation', '/services#airport'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ flex: '1 1 200px', minWidth: '200px', maxWidth: '240px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
              Get Started
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              Ready to transform your employee transport? Let&apos;s talk.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#FFCC35',
                color: '#111111',
                fontWeight: 700,
                fontSize: '14px',
                padding: '14px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Book a Discovery Call
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
            © {year} Mayura Car Rentals LLP. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[['Privacy Policy', '#'], ['Terms of Service', '#'], ['FAQ', '/faq']].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
