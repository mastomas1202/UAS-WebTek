'use client'

import { useState, useEffect } from 'react'
import Layout from './dashboard/components/Layout'
import { buku, pengguna } from '../lib/contohData'

export default function Beranda() {
  const [totalBuku, setTotalBuku] = useState(0)
  const [bukuTersedia, setBukuTersedia] = useState(0)
  const [totalPengguna, setTotalPengguna] = useState(0)

  useEffect(() => {
    setTotalBuku(buku.length)
    setBukuTersedia(buku.filter(b => b.tersedia).length)
    setTotalPengguna(pengguna.length)
  }, [])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Dashboard Sistem Manajemen Perpustakaan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Buku</h2>
          <p className="text-3xl font-bold">{totalBuku}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Buku Tersedia</h2>
          <p className="text-3xl font-bold">{bukuTersedia}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Pengguna</h2>
          <p className="text-3xl font-bold">{totalPengguna}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Buku Terbaru</h2>
          <ul>
            {buku.slice(-3).map((b) => (
              <li key={b.id} className="mb-2">{b.judul} - {b.penulis}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Pengguna Terbaru</h2>
          <ul>
            {pengguna.slice(-3).map((p) => (
              <li key={p.id} className="mb-2">{p.nama}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

