'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ClientWrapper({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {!isHome && <Navbar />}
      {children}
    </>
  )
}
