'use client'

import { useState } from 'react'
import Layout from '../dashboard/components/Layout'
import { buku, pengguna } from '../../lib/contohData'

export default function Peminjaman() {
  const [bukuTerpilih, setBukuTerpilih] = useState('')
  const [penggunaTerpilih, setPenggunaTerpilih] = useState('')
  const [pesan, setPesan] = useState('')

  const handlePeminjaman = (e: React.FormEvent) => {
    e.preventDefault()
    if (bukuTerpilih && penggunaTerpilih) {
      setPesan(`Buku "${bukuTerpilih}" berhasil dipinjam oleh ${penggunaTerpilih}`)
      setBukuTerpilih('')
      setPenggunaTerpilih('')
    } else {
      setPesan('Silakan pilih buku dan pengguna')
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Peminjaman Buku</h1>
      <form onSubmit={handlePeminjaman} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="buku" className="block mb-2">Pilih Buku:</label>
          <select
            id="buku"
            value={bukuTerpilih}
            onChange={(e) => setBukuTerpilih(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih buku</option>
            {buku.filter(book => book.tersedia).map((book) => (
              <option key={book.id} value={book.judul}>{book.judul}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="pengguna" className="block mb-2">Pilih Pengguna:</label>
          <select
            id="pengguna"
            value={penggunaTerpilih}
            onChange={(e) => setPenggunaTerpilih(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih pengguna</option>
            {pengguna.map((user) => (
              <option key={user.id} value={user.nama}>{user.nama}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Pinjam Buku
        </button>
      </form>
      {pesan && <p className="mt-4 text-center font-semibold">{pesan}</p>}
    </Layout>
  )
}

