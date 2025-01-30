import { sql } from '@vercel/postgres'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'

async function getBuku() {
  const { rows } = await sql`SELECT * FROM buku ORDER BY id ASC`
  return rows
}

async function getPengguna() {
  const { rows } = await sql`SELECT * FROM pengguna ORDER BY id ASC`
  return rows
}

export default async function DataMaster() {
  const [buku, pengguna] = await Promise.all([getBuku(), getPengguna()])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Master</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Buku</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buku.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.judul}</TableCell>
                <TableCell>{book.penulis}</TableCell>
                <TableCell>{book.tersedia ? 'Tersedia' : 'Dipinjam'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link href="/data-master/buku/tambah">
          <Button className="mt-4">Tambah Buku</Button>
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Pengguna</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pengguna.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nama}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link href="/data-master/pengguna/tambah">
          <Button className="mt-4">Tambah Pengguna</Button>
        </Link>
      </section>
    </div>
  )
}

