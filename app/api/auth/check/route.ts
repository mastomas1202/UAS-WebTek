import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('auth_token')

  if (authToken && authToken.value === 'logged_in') {
    return NextResponse.json({ isLoggedIn: true })
  } else {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 })
  }
}

