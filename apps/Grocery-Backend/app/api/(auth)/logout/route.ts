import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_SITE_URL)
  )
  response.cookies.set({
    name: 'token',
    value: '',
    path: '/', // important to clear for all routes
    expires: new Date(0), // set expiry in the past
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  return response
}
