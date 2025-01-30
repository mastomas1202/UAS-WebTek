'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Book {
  id: number
  title: string
  author: string
  isbn: string
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([])
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '' })
  const [editing, setEditing] = useState<Book | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/books', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing || newBook),
      })
      if (response.ok) {
        fetchBooks()
        setNewBook({ title: '', author: '', isbn: '' })
        setEditing(null)
      }
    } catch (error) {
      console.error('Error saving book:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchBooks()
      }
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manajemen Buku</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editing ? 'Edit Buku' : 'Tambah Buku Baru'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Judul"
              value={editing ? editing.title : newBook.title}
              onChange={(e) => editing ? setEditing({...editing, title: e.target.value}) : setNewBook({...newBook, title: e.target.value})}
              required
            />
            <Input
              placeholder="Penulis"
              value={editing ? editing.author : newBook.author}
              onChange={(e) => editing ? setEditing({...editing, author: e.target.value}) : setNewBook({...newBook, author: e.target.value})}
              required
            />
            <Input
              placeholder="ISBN"
              value={editing ? editing.isbn : newBook.isbn}
              onChange={(e) => editing ? setEditing({...editing, isbn: e.target.value}) : setNewBook({...newBook, isbn: e.target.value})}
              required
            />
            <Button type="submit">{editing ? 'Update' : 'Tambah'} Buku</Button>
            {editing && (
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Batal</Button>
            )}
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Penulis:</strong> {book.author}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <div className="mt-4 space-x-2">
                <Button onClick={() => setEditing(book)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(book.id)}>Hapus</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

