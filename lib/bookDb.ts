import { sql } from '@vercel/postgres';
import { Book } from './models/book';

export async function getAllBooks(): Promise<Book[]> {
    const { rows } = await sql`SELECT * FROM books ORDER BY id ASC`;
    return rows as Book[]; // Type assertion
}

export async function addBook(book: Book): Promise<Book> {
    const { rows } = await sql`
        INSERT INTO books (title, author, isbn)
        VALUES (${book.title}, ${book.author}, ${book.isbn})
        RETURNING *
    `;
    return rows[0] as Book; // Type assertion
}

export async function updateBook(book: Book): Promise<Book> {
    const { rows } = await sql`
        UPDATE books
        SET title = ${book.title}, author = ${book.author}, isbn = ${book.isbn}
        WHERE id = ${book.id}
        RETURNING *
    `;
    return rows[0] as Book; // Type assertion
}

export async function deleteBook(id: number): Promise<void> {
    await sql`DELETE FROM books WHERE id = ${id}`;
}
