import Link from 'next/link'

export default function PilotOffer() {
  return (
    <section className="section-sm relative overflow-hidden bg-brand-yellow border-y-8 border-brand-black" aria-labelledby="pilot-heading">
      {/* Decorative circles */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-brand-black/10 blur-[50px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal">
            <span className="inline-block bg-brand-black/10 text-brand-black text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              Limited Offer - June 2026
            </span>
          </div>

          <h2
            id="pilot-heading"
            className="reveal text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-tight mb-6"
          >
            Try Mayura Free for 7 Days.
            <br />
            No Commitment. No Risk.
          </h2>

          <p className="reveal text-brand-black/70 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            We&apos;ll run your employee transport programme for a full week - at zero cost. Experience
            the Commute platform, GPS tracking, and our 24/7 command centre before signing anything.
          </p>

          {/* Checklist */}
          <div className="reveal grid sm:grid-cols-2 gap-3 mb-10 text-left max-w-xl mx-auto">
            {[
              'Free route mapping for your office locations',
              'Full fleet deployment - no partial pilots',
              'Live Commute dashboard access for 7 days',
              'Detailed transport audit report at the end',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" fill="#1C1C1B" fillOpacity="0.15" />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="#1C1C1B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-brand-black/80 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%20Mayura%2C%20I%20want%20to%20claim%20the%20free%207-day%20pilot%20for%20my%20company"
              target="_blank"
              rel="noopener noreferrer"
              id="pilot-whatsapp-btn"
              className="bg-brand-black text-white font-bold px-8 py-4 rounded-lg inline-flex items-center gap-2 transition-all hover:opacity-90 hover:-translate-y-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Claim Your Free 7-Day Pilot - WhatsApp Us
            </a>
            <Link
              href="/contact"
              id="pilot-discovery-btn"
              className="text-brand-black font-semibold underline underline-offset-4 text-sm hover:opacity-70 transition-opacity"
            >
              Or Book a 30-Minute Discovery Call →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
