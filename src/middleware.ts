import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyToken } from './app/_lib/utils'

export function middleware(request: NextRequest) {
  const cookie = request.cookies
  console.log({cookie})
  if (cookie.has('token')) {
    const token = request.cookies.get('token')?.value
    const pathName = request.nextUrl.origin
    // const isToken=verifyToken(token!)
    if (token && pathName === '/api/login') {
      return NextResponse.next()
    }
  } else {
    request.cookies.clear()
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/:path*',
}
