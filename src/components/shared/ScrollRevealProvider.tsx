'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    
    // Slight delay to ensure DOM is updated after navigation
    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      )
      
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      elements.forEach((el) => observer?.observe(el))
    }, 150)
    
    return () => {
      clearTimeout(timeout)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [pathname])

  return <>{children}</>
}
