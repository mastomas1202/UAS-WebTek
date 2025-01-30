import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sql } from '@vercel/postgres'

async function getBooksCount() {
  const { rows } = await sql`SELECT COUNT(*) FROM books`
  return rows[0].count
}

async function getUsersCount() {
  const { rows } = await sql`SELECT COUNT(*) FROM users`
  return rows[0].count
}

async function getBorrowingsCount() {
  const { rows } = await sql`SELECT COUNT(*) FROM borrowings`
  return rows[0].count
}

export default async function Dashboard() {
  const [booksCount, usersCount, borrowingsCount] = await Promise.all([
    getBooksCount(),
    getUsersCount(),
    getBorrowingsCount()
  ])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Buku</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{booksCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{usersCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Peminjaman</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{borrowingsCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

