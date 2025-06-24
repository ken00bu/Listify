import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const publicRoutes = ['/login', '/callback']

async function decrypt(session) {

    const secretKey = process.env.SESSION_SECRET
    const encodedKey = new TextEncoder().encode(secretKey)

    try {
        const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)
    
    const cookieStore = await cookies()
    const cookie = cookieStore.get('session')?.value
    const session = await decrypt(cookie)

    // Jika route bukan public dan tidak ada session, redirect ke /login
    if (!isPublicRoute && !session) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Jika sudah login dan akses /login, redirect ke /mylist
    if (isPublicRoute && session && path === '/login' || session && path === '/callback') {
        return NextResponse.redirect(new URL('/mylist', req.nextUrl))
    }

    if (path === "/" ){
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    

    const res = NextResponse.next()
    res.headers.set('x-debug-path', path)
    return res
}

export const config = {
    matcher: ['/mylist', '/login', '/callback', '/', ],
}