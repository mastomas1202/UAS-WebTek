import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const VALID_USERNAME = 'kelompok4'
const VALID_PASSWORD = 'kelompok4'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    const response = NextResponse.json({ success: true })
    
    // Dalam implementasi nyata, gunakan token yang aman, bukan plaintext
    response.cookies.set('auth_token', 'logged_in', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 jam
    })

    return response
  } else {
    return NextResponse.json(
      { success: false, message: 'Username atau password salah' },
      { status: 401 }
    )
  }
}

