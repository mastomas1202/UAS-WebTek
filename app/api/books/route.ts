import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM books ORDER BY id ASC`
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, author, isbn } = await request.json()
    const { rows } = await sql`
      INSERT INTO books (title, author, isbn)
      VALUES (${title}, ${author}, ${isbn})
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, author, isbn } = await request.json()
    const { rows } = await sql`
      UPDATE books
      SET title = ${title}, author = ${author}, isbn = ${isbn}
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }
    await sql`DELETE FROM books WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

