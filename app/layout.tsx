import { inter } from './fonts'
import './globals.css'

export const metadata = {
  title: 'Sistem Manajemen Perpustakaan',
  description: 'Aplikasi manajemen perpustakaan modern',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}

