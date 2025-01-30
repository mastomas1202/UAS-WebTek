import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecentBooks() {
  const recentBooks = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata" },
    { id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer" },
    { id: 3, title: "Pulang", author: "Tere Liye" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buku Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentBooks.map((book) => (
            <li key={book.id} className="flex justify-between items-center">
              <span>{book.title}</span>
              <span className="text-gray-500 text-sm">{book.author}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

