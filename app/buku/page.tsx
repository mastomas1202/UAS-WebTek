'use client'

import { useState, useEffect } from 'react'
import Layout from '../dashboard/components/Layout'
import { buku as dataBuku } from '../../lib/contohData'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Buku() {
  const [buku, setBuku] = useState(dataBuku)
  const [formData, setFormData] = useState({ id: 0, judul: '', penulis: '', tersedia: true })
  const [editMode, setEditMode] = useState(false)
  const [pencarian, setPencarian] = useState('')
  const [halamanSaatIni, setHalamanSaatIni] = useState(1)
  const [itemPerHalaman] = useState(6)

  useEffect(() => {
    setHalamanSaatIni(1)
  }, [pencarian])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editMode) {
      setBuku(prev => prev.map(b => b.id === formData.id ? formData : b))
    } else {
      setBuku(prev => [...prev, { ...formData, id: Date.now() }])
    }
    setFormData({ id: 0, judul: '', penulis: '', tersedia: true })
    setEditMode(false)
  }

  const handleEdit = (book: typeof formData) => {
    setFormData(book)
    setEditMode(true)
  }

  const handleDelete = (id: number) => {
    setBuku(prev => prev.filter(b => b.id !== id))
  }

  const bukuTerfilter = buku.filter(book =>
    book.judul.toLowerCase().includes(pencarian.toLowerCase()) ||
    book.penulis.toLowerCase().includes(pencarian.toLowerCase())
  )

  const indexTerakhir = halamanSaatIni * itemPerHalaman
  const indexPertama = indexTerakhir - itemPerHalaman
  const bukuSaatIni = bukuTerfilter.slice(indexPertama, indexTerakhir)

  const totalHalaman = Math.ceil(bukuTerfilter.length / itemPerHalaman)

  const nomorHalaman = []
  for (let i = 1; i <= totalHalaman; i++) {
    nomorHalaman.push(i)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Manajemen Buku</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleInputChange}
            placeholder="Judul Buku"
            required
          />
          <Input
            type="text"
            name="penulis"
            value={formData.penulis}
            onChange={handleInputChange}
            placeholder="Penulis"
            required
          />
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="tersedia"
                checked={formData.tersedia}
                onChange={handleInputChange}
                className="mr-2"
              />
              Tersedia
            </label>
          </div>
        </div>
        <Button type="submit" className="mt-4">
          {editMode ? 'Update Buku' : 'Tambah Buku'}
        </Button>
      </form>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Cari buku..."
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          className="w-full md:w-1/2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {bukuSaatIni.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{book.judul}</h2>
            <p className="mb-2">Penulis: {book.penulis}</p>
            <p className={`font-semibold ${book.tersedia ? 'text-green-600' : 'text-red-600'}`}>
              {book.tersedia ? 'Tersedia' : 'Dipinjam'}
            </p>
            <div className="mt-4">
              <Button onClick={() => handleEdit(book)} variant="outline" className="mr-2">
                Edit
              </Button>
              <Button onClick={() => handleDelete(book.id)} variant="destructive">
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>

      {totalHalaman > 1 && (
        <div className="flex justify-center mt-4">
          {nomorHalaman.map((nomor) => (
            <Button
              key={nomor}
              onClick={() => setHalamanSaatIni(nomor)}
              variant={nomor === halamanSaatIni ? "default" : "outline"}
              className="mx-1"
            >
              {nomor}
            </Button>
          ))}
        </div>
      )}
    </Layout>
  )
}

