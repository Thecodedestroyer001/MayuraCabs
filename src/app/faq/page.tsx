import type { Metadata } from 'next'
import FooterCTA from '@/components/shared/FooterCTA'

const faqCategories = [
  {
    category: 'About Mayura',
    questions: [
      {
        q: 'What is Mayura Car Rentals?',
        a: 'Mayura Car Rentals is a B2B corporate mobility company based in Bengaluru. We provide end-to-end employee transport management for enterprises - combining a professional fleet with our proprietary Commute platform to give HR and admin teams full visibility and control.',
      },
      {
        q: 'How is Mayura different from aggregator apps like Ola or Uber for Business?',
        a: 'Aggregators provide on-demand cab bookings - they don\'t manage your transport programme. Mayura is an integrated transport partner: we design routes, deploy dedicated fleet, provide a command centre, handle driver management, and give you consolidated billing. We\'re accountable for your entire programme, not individual rides.',
      },
      {
        q: 'Which areas in Bengaluru does Mayura cover?',
        a: 'We cover all major IT corridors and business districts in Bengaluru: Whitefield, Electronic City, Manyata Tech Park, Hebbal, Outer Ring Road, Marathahalli, Sarjapur Road, Koramangala, and more. We design routes based on your employee locations.',
      },
    ],
  },
  {
    category: 'Services & Fleet',
    questions: [
      {
        q: 'What vehicle types are available?',
        a: 'We have 6 vehicle categories: Hatchbacks (4-seater), Sedans (4-seater), SUVs/MUVs (6–7 seater), Mini Vans (9-seater), Buses (20–54 seater), and EV Fleet (Tata Nexon EV, Tigor EV). The fleet mix is customised based on your employee distribution and route design.',
      },
      {
        q: 'Do you offer EV fleet options?',
        a: 'Yes. We have Tata Nexon EV and Tigor EV in our fleet. EV trips come with zero-emission reporting for your ESG dashboards and sustainability goals. There is no additional premium for choosing EV vehicles over our standard fleet.',
      },
      {
        q: 'Can you handle night shift transport?',
        a: 'Absolutely. Night shift transport is one of our core specialisations. We have enhanced safety protocols for night operations: mandatory SOS button usage, live monitoring at our 24/7 command centre, and escort protocols for female employees as per regulatory requirements.',
      },
      {
        q: 'What is the minimum fleet size you deploy?',
        a: 'Our programmes typically start at a minimum of 10–15 vehicles or 200+ employee trips per day to ensure route optimisation is effective. However, we evaluate each enterprise\'s needs individually - contact us for a specific assessment.',
      },
    ],
  },
  {
    category: 'The Commute Platform',
    questions: [
      {
        q: 'What does the Commute platform do?',
        a: 'Commute is our proprietary enterprise mobility software. It handles: automated route generation, real-time GPS tracking of all vehicles, employee app for pickup ETA and driver details, admin dashboard for cost and SLA tracking, automated billing, and driver performance monitoring.',
      },
      {
        q: 'Does the Commute platform cost extra?',
        a: 'No. The Commute platform is included as standard with all Mayura transport programmes. There is no additional SaaS fee or platform charge.',
      },
      {
        q: 'Can my employees track their pickup in real time?',
        a: 'Yes. Employees receive a notification when their vehicle is dispatched, with the driver\'s name, photo, vehicle number, and a live tracking link. The Commute employee app (Android and iOS) gives a real-time ETA.',
      },
    ],
  },
  {
    category: 'Pricing & Contracts',
    questions: [
      {
        q: 'How is Mayura\'s pricing structured?',
        a: 'We use a monthly fixed-cost model based on your route design, fleet mix, and trip volume. You receive one consolidated invoice per month, itemised by employee, route, and vehicle type. No surge pricing, no hidden costs.',
      },
      {
        q: 'What is the minimum contract period?',
        a: 'Our standard contracts are 12 months, reflecting the investment we make in route design, fleet deployment, and staff training. We offer a free 7-day pilot before any contract commitment.',
      },
      {
        q: 'Do you offer SLA guarantees with penalty clauses?',
        a: 'Yes. Every Mayura contract includes a written SLA with defined on-time thresholds and financial penalties for repeated SLA breaches. We hold ourselves accountable - not just verbally.',
      },
      {
        q: 'What happens if a vehicle breaks down mid-trip?',
        a: 'Our 24/7 command centre is notified immediately via GPS. A replacement vehicle is dispatched within 20 minutes as per our breakdown SLA. Employees receive a notification update in the app.',
      },
    ],
  },
  {
    category: 'Safety & Compliance',
    questions: [
      {
        q: 'Are your drivers background-verified?',
        a: 'Yes. All Mayura drivers undergo a comprehensive background check: police verification, driving history review, reference checks, and safety training certification before they drive a single trip. Ongoing performance monitoring happens via the Commute platform.',
      },
      {
        q: 'Are your vehicles AIS-140 compliant?',
        a: 'Yes. All vehicles in our fleet meet AIS-140 compliance requirements including the vehicle location tracking device (VLTD), emergency button, and speed governor. We maintain all compliance documentation and regulatory renewals.',
      },
      {
        q: 'What safety features are available for female employees on late shifts?',
        a: 'We follow all Transport Department guidelines for female employee safety: co-traveller protocols, mandatory SOS button activation, live monitoring at our 24/7 command centre, and real-time alerts to a designated admin contact for any route deviation.',
      },
    ],
  },
]

import MorphingFAQ from '@/components/faq/MorphingFAQ'
export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-20 noise-overlay">
        <div className="container max-w-3xl">
          <span className="section-tag mb-6 block w-fit">FAQ</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-xl">
            Everything enterprises need to know about Mayura&apos;s transport services, technology, and process.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-brand-gray-100">
        <div className="container max-w-3xl mx-auto space-y-12">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black text-brand-black">{cat.category}</h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <MorphingFAQ questions={cat.questions} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-sm bg-brand-black">
        <div className="container text-center max-w-xl mx-auto">
          <h2 className="reveal text-3xl font-black text-white mb-4">
            Have a Question Not Listed Here?
          </h2>
          <p className="reveal text-white/60 mb-8">
            Our team responds within 2 business hours on WhatsApp.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              id="faq-wa-btn"
              className="btn-primary px-8 py-4"
            >
              WhatsApp Us
            </a>
            <a href="mailto:contact@mayuracabs.com" id="faq-email-btn" className="btn-outline px-8 py-4">
              Email Us
            </a>
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  )
}
