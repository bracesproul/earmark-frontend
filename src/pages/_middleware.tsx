import { NextResponse } from 'next/server'

const NO_ACCESS_ON_AUTH = ['/auth/signIn', '/auth/signUp']
const NO_ACCESS_ON_UNAUTH = ['/dashboard', '/account']
const NO_AUTH_UNLESS_ADMIN = ['/testing', '/admin', '/dashboard/transfers', '/dashboard/investments']

export function middleware(req, res) {
    const cookie = req.cookies['user_id'];

    if (req.page.name === '/' && cookie) {
        return NextResponse.redirect(new URL(`/dashboard/`, req.url))
    } else if (req.page.name === '/' && !cookie) {
        return NextResponse.redirect(new URL(`/auth/signIn`, req.url))
    }

    if (cookie && (cookie != process.env.ADMIN_TOKEN && NO_AUTH_UNLESS_ADMIN.includes(req.page.name))) {
        return NextResponse.redirect(new URL(`/dashboard/`, req.url))
    } else if (!cookie && NO_ACCESS_ON_UNAUTH.includes(req.page.name)) {
        return NextResponse.redirect(new URL('/auth/signIn', req.url))
    } else if (cookie && NO_ACCESS_ON_AUTH.includes(req.page.name)) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
}