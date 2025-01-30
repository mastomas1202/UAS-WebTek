'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function Transaksi() {
  const [bukuId, setBukuId] = useState('')
  const [penggunaId, setPenggunaId] = useState('')
  const [tanggalPinjam, setTanggalPinjam] = useState('')
  const [tanggalKembali, setTanggalKembali] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi logika untuk menyimpan transaksi
    console.log('Transaksi:', { bukuId, penggunaId, tanggalPinjam, tanggalKembali })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaksi Peminjaman</h1>
      <Card>
        <CardHeader>
          <CardTitle>Form Peminjaman Buku</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="bukuId">Buku</label>
                <Select onValueChange={setBukuId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih buku" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Buku 1</SelectItem>
                    <SelectItem value="2">Buku 2</SelectItem>
                    <SelectItem value="3">Buku 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="penggunaId">Pengguna</label>
                <Select onValueChange={setPenggunaId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pengguna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Pengguna 1</SelectItem>
                    <SelectItem value="2">Pengguna 2</SelectItem>
                    <SelectItem value="3">Pengguna 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tanggalPinjam">Tanggal Pinjam</label>
                <Input
                  id="tanggalPinjam"
                  type="date"
                  value={tanggalPinjam}
                  onChange={(e) => setTanggalPinjam(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tanggalKembali">Tanggal Kembali</label>
                <Input
                  id="tanggalKembali"
                  type="date"
                  value={tanggalKembali}
                  onChange={(e) => setTanggalKembali(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="mt-4">
              Simpan Transaksi
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

