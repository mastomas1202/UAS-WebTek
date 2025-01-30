import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      })

      if (response.ok) {
        router.push('/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo Perpustakaan" width={40} height={40} />
          <Link href="/" className="text-2xl font-bold">
            Sistem Manajemen Perpustakaan
          </Link>
        </div>
        <ul className="flex space-x-4 items-center">
          <li><Link href="/" className="hover:underline">Beranda</Link></li>
          <li><Link href="/buku" className="hover:underline">Buku</Link></li>
          <li><Link href="/pengguna" className="hover:underline">Pengguna</Link></li>
          <li><Link href="/peminjaman" className="hover:underline">Peminjaman</Link></li>
          <li>
            <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

