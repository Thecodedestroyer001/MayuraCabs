import Link from 'next/link'

export default function FooterCTA() {
  return (
    <section className="section-sm bg-brand-black" aria-labelledby="footer-cta-heading">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="footer-cta-heading"
            className="text-3xl sm:text-4xl font-black text-white mb-4"
          >
            Ready to Fix Your Employee
            <br />
            <span style={{ color: '#FFCC35' }}>Transport Programme?</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Join Bengaluru&apos;s most forward-thinking enterprises. Start with a 30-minute discovery call.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-cta-whatsapp"
              className="btn-primary text-base px-8 py-4"
            >
              WhatsApp
            </a>
            <a
              href="tel:+91XXXXXXXXXX"
              id="footer-cta-call"
              className="btn-outline text-base px-8 py-4"
            >
              Call Now
            </a>
            <Link
              href="/contact"
              id="footer-cta-schedule"
              className="btn-outline text-base px-8 py-4"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
