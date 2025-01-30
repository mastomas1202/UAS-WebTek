import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecentUsers() {
  const recentUsers = [
    { id: 1, name: "Budi Santoso", email: "budi@example.com" },
    { id: 2, name: "Siti Rahma", email: "siti@example.com" },
    { id: 3, name: "Agus Setiawan", email: "agus@example.com" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anggota Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentUsers.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <span>{user.name}</span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

