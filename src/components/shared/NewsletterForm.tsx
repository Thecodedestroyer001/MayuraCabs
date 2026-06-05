'use client'
export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing! We\'ll be in touch.') }}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="Your work email"
        id="blog-email-input"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow"
        required
      />
      <button
        type="submit"
        id="blog-subscribe-btn"
        className="btn-primary text-sm px-6 py-3 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  )
}
