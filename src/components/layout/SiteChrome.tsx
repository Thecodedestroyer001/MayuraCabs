'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname().startsWith('/admin')

  useEffect(() => {
    const button = document.querySelector<HTMLElement>('.floating-wa')
    if (button) button.style.setProperty('display', isAdmin ? 'none' : '')
    return () => button?.style.removeProperty('display')
  }, [isAdmin])

  if (isAdmin) return <main>{children}</main>

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
