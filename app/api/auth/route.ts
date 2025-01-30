import { NextResponse } from "next/server"

const VALID_EMAIL = process.env.AUTH_EMAIL
const VALID_PASSWORD = process.env.AUTH_PASSWORD

export async function POST(request: Request) {
  const { email, password, action } = await request.json()

  if (action === "login") {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const response = NextResponse.json({ success: true })
      response.cookies.set("auth_token", "logged_in", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1 hour
      })
      return response
    } else {
      return NextResponse.json({ success: false, message: "Email atau password salah" }, { status: 401 })
    }
  } else if (action === "logout") {
    const response = NextResponse.json({ success: true })
    response.cookies.set("auth_token", "", { maxAge: 0 })
    return response
  } else {
    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
  }
}

