'use client'

import { useState } from 'react'
import Layout from '@/app/dashboard/components/Layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Buku {
  id: number
  judul: string
}

interface Anggota {
  id: number
  nama: string
}

const dummyBuku: Buku[] = [
  { id: 1, judul: 'Laskar Pelangi' },
  { id: 2, judul: 'Bumi Manusia' },
  { id: 3, judul: 'Pulang' },
]

const dummyAnggota: Anggota[] = [
  { id: 1, nama: 'Budi Santoso' },
  { id: 2, nama: 'Siti Rahma' },
  { id: 3, nama: 'Agus Setiawan' },
]

export default function PeminjamanForm() {
  const [bukuId, setBukuId] = useState('')
  const [anggotaId, setAnggotaId] = useState('')
  const [tanggalPinjam, setTanggalPinjam] = useState('')
  const [tanggalKembali, setTanggalKembali] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Di sini Anda akan mengirim data ke backend atau menyimpannya ke state global
    console.log('Data Peminjaman:', { bukuId, anggotaId, tanggalPinjam, tanggalKembali })
    // Reset form
    setBukuId('')
    setAnggotaId('')
    setTanggalPinjam('')
    setTanggalKembali('')
  }

  return (
    <Layout>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Form Peminjaman Buku</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="buku" className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Buku
              </label>
              <Select value={bukuId} onValueChange={setBukuId}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih buku" />
                </SelectTrigger>
                <SelectContent>
                  {dummyBuku.map((buku) => (
                    <SelectItem key={buku.id} value={buku.id.toString()}>
                      {buku.judul}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="anggota" className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Anggota
              </label>
              <Select value={anggotaId} onValueChange={setAnggotaId}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih anggota" />
                </SelectTrigger>
                <SelectContent>
                  {dummyAnggota.map((anggota) => (
                    <SelectItem key={anggota.id} value={anggota.id.toString()}>
                      {anggota.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="tanggalPinjam" className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Pinjam
              </label>
              <Input
                type="date"
                id="tanggalPinjam"
                value={tanggalPinjam}
                onChange={(e) => setTanggalPinjam(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="tanggalKembali" className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Kembali
              </label>
              <Input
                type="date"
                id="tanggalKembali"
                value={tanggalKembali}
                onChange={(e) => setTanggalKembali(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Simpan Peminjaman
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  )
}

