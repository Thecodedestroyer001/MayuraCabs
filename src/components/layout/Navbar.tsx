'use client'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(currentScroll > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full transition-all duration-500 z-[50000] ${
          scrolled || menuOpen ? 'bg-[#1C1C1B]/95 backdrop-blur-xl border-b border-white/10 py-2 shadow-lg' : 'bg-brand-black/95 lg:bg-transparent py-3 border-b border-white/10 lg:border-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0 flex items-center" aria-label="Mayura Car Rentals - Home">
            <Image
              src="/logo-custom.png"
              alt="Mayura Car Rentals"
              width={266}
              height={80}
              className="h-7 sm:h-8 md:h-9 w-auto object-contain origin-left"
              style={{ width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav + CTAs — all on the right */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive ? 'text-brand-yellow' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-yellow transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            })}

            {/* Divider */}
            <span className="w-px h-4 bg-white/20" />

            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%20Mayura%2C%20I'm%20interested%20in%20corporate%20transport"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-btn"
              className="btn-primary text-[10px] py-1 px-2.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/contact" id="nav-book-call-btn" className="btn-outline text-[10px] py-1 px-2.5">
              Book a Call
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle menu"
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        inert={!menuOpen}
        ref={menuRef}
        className={`fixed inset-0 bg-brand-black transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 49000 }}
      >
        <div className="flex flex-col items-center justify-center min-h-full gap-5 px-6 pt-24 pb-8 overflow-y-auto max-h-dvh">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={`text-2xl font-bold transition-colors hover:text-brand-yellow ${pathname === link.href ? 'text-brand-yellow' : 'text-white'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center text-sm py-2.5"
              onClick={() => setMenuOpen(false)}
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="btn-outline justify-center text-sm py-2.5"
              onClick={() => setMenuOpen(false)}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
