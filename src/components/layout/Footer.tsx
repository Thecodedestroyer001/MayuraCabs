import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: 'mailto:careers@mayuracabs.com' },
  ],
  services: [
    { label: 'Employee Daily Commute', href: '/services#daily-commute' },
    { label: 'Fixed-Route Shuttle', href: '/services#shuttle' },
    { label: 'Corporate Car Rentals', href: '/services#car-rentals' },
    { label: 'EV Fleet', href: '/services#ev-fleet' },
    { label: 'Commute Platform', href: '/services#platform' },
    { label: 'Airport & Outstation', href: '/services#airport' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'FAQ', href: '/faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white" role="contentinfo">
      {/* Main footer */}
      <div className="container section-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src="/logo-white.png"
              alt="Mayura Car Rentals"
              width={160}
              height={48}
              style={{ height: '40px', width: 'auto' }}
              className="object-contain mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Bengaluru&apos;s integrated corporate mobility company. AI-powered routing, 24/7 command centre, 6 fleet types.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contact@mayuracabs.com"
                className="flex items-center gap-2 text-white/60 hover:text-brand-yellow text-sm transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                contact@mayuracabs.com
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 text-white/60 hover:text-brand-yellow text-sm transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +91-XXXXXXXXXX
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-yellow text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-yellow text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Get Started</h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Ready to transform your employee transport? Talk to us today.
            </p>
            <div className="space-y-3">
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi%20Mayura%2C%20I'm%20interested%20in%20corporate%20transport"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp-btn"
                className="btn-primary text-sm w-full justify-center"
              >
                WhatsApp Us Now
              </a>
              <Link
                href="/contact"
                id="footer-book-call-btn"
                className="btn-outline text-sm w-full justify-center"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 Mayura Car Rentals LLP. All rights reserved. | CIN: [to be updated] | GST: [to be updated]
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
