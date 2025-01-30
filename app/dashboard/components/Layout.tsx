'use client'

import { useEffect, useState } from 'react'
import Header from './Header'
import { useRouter } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth')
        if (response.ok) {
          setIsLoggedIn(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {isLoggedIn && <Header />}
      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>
      <footer className="bg-white text-center p-4 shadow-md">
        © 2023 Sistem Manajemen Perpustakaan
      </footer>
    </div>
  )
}

