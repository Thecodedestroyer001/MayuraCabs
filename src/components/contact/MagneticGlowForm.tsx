'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function MagneticGlowForm({ 
  serviceOptions, 
  employeeOptions 
}: { 
  serviceOptions: string[], 
  employeeOptions: string[] 
}) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', company: '', designation: '', phone: '', location: '',
    services: [] as string[], employees: '', details: '',
  })

  // Pointer tracking for background glow
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the pointer movement
  const springConfig = { damping: 30, stiffness: 200 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    // Reset to center when mouse leaves
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(rect.width / 2)
    mouseY.set(rect.height / 2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message = [
      'Hi, I would like to get in touch.',
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Designation: ${form.designation}`,
      `Phone: ${form.phone}`,
      `Location: ${form.location}`,
      `Service: ${form.services.join(', ') || 'Not specified'}`,
      `Employees: ${form.employees || 'Not specified'}`,
      `Details: ${form.details.trim() || 'Not specified'}`,
    ].join('\n')

    window.location.href = `https://wa.me/919686180808?text=${encodeURIComponent(message)}`
    setSubmitted(true)
  }

  const toggleService = (s: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
    }))
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-3xl p-1 bg-white/50 backdrop-blur-xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden"
    >
      {/* The Magnetic Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-brand-yellow/30 blur-[100px] pointer-events-none z-0"
        style={{
          x: useTransform(smoothX, value => value - 300),
          y: useTransform(smoothY, value => value - 300),
        }}
      />

      {/* The Form Container (relative to sit above glow) */}
      <div className="relative z-10 bg-white/80 backdrop-blur-3xl rounded-[23px] p-8 md:p-10 border border-white">
        <h2 className="text-2xl font-black text-brand-black mb-2">Tell Us About Your Requirements</h2>
        <p className="text-brand-gray-500 text-sm mb-8">We&apos;ll respond with a customised proposal.</p>

        {submitted ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-brand-yellow/10 border border-brand-yellow rounded-2xl p-10 text-center"
          >
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-black text-brand-black mb-2">Thank You!</h3>
            <p className="text-brand-gray-500">Our team will contact you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-brand-black text-sm font-semibold mb-2">Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-brand-gray-100/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all"
                  placeholder="Priya Sharma"
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-brand-black text-sm font-semibold mb-2">Company Name *</label>
                <input
                  id="contact-company"
                  type="text"
                  required
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full bg-brand-gray-100/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all"
                  placeholder="Infosys BPM Ltd."
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-designation" className="block text-brand-black text-sm font-semibold mb-2">Designation / Role *</label>
                <input
                  id="contact-designation"
                  type="text"
                  required
                  value={form.designation}
                  onChange={e => setForm(f => ({ ...f, designation: e.target.value }))}
                  className="w-full bg-brand-gray-100/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all"
                  placeholder="Head of HR / Admin Manager"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-brand-black text-sm font-semibold mb-2">Phone Number *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-brand-gray-100/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-location" className="block text-brand-black text-sm font-semibold mb-2">Office Location / Area *</label>
              <input
                id="contact-location"
                type="text"
                required
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className="w-full bg-brand-gray-100/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all"
                placeholder="Whitefield, Bengaluru"
              />
            </div>

            <div>
              <label className="block text-brand-black text-sm font-semibold mb-3">I Need Assistance For *</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleService(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      form.services.includes(s)
                        ? 'bg-brand-yellow border-brand-yellow text-brand-black shadow-md'
                        : 'border-gray-200 text-brand-gray-500 hover:border-brand-yellow bg-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="contact-employees" className="block text-brand-black text-sm font-semibold mb-2">Approximate Number of Employees</label>
              <select
                id="contact-employees"
                value={form.employees}
                onChange={e => setForm(f => ({ ...f, employees: e.target.value }))}
                className="w-full bg-brand-gray-100/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all appearance-none"
              >
                <option value="">Select range</option>
                {employeeOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="contact-details" className="block text-brand-black text-sm font-semibold mb-2">Other Details (Optional)</label>
              <textarea
                id="contact-details"
                rows={4}
                value={form.details}
                onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                className="w-full bg-brand-gray-100/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all resize-none"
                placeholder="Share any additional context about your transport requirements..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-brand-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-xl"
            >
              Get My Transport Consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </motion.button>
          </form>
        )}
      </div>
    </div>
  )
}
