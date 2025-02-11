'use client'

import { useState } from 'react'
import Layout from '@/app/dashboard/components/Layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Kategori {
  id: number
  nama: string
}

export default function KategoriMaster() {
  const [kategori, setKategori] = useState<Kategori[]>([])
  const [namaKategori, setNamaKategori] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (namaKategori.trim()) {
      const newKategori: Kategori = {
        id: Date.now(),
        nama: namaKategori.trim()
      }
      setKategori([...kategori, newKategori])
      setNamaKategori('')
    }
  }

  return (
    <Layout>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Data Master Kategori Buku</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Nama Kategori"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                required
              />
              <Button type="submit">Tambah Kategori</Button>
            </div>
          </form>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Daftar Kategori</h3>
            <ul className="space-y-2">
              {kategori.map((kat) => (
                <li key={kat.id} className="bg-gray-100 p-2 rounded">
                  {kat.nama}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

