import { NextResponse } from 'next/server'

const NO_ACCESS_ON_AUTH = ['/auth/signIn', '/auth/signUp']
const NO_ACCESS_ON_UNAUTH = ['/dashboard', '/account']
const NO_AUTH_UNLESS_ADMIN = ['/testing', '/admin', '/dashboard/transfers', '/dashboard/investments']

// on redirect to /auth/unauthorized, browser gives error because you were redirected too many times.
// dev tools giving 20-40 redirects to /auth/unauthorized for some reason

export function middleware(req, res) {
    const cookie = req.cookies['user_id'];
    const appTheme = req.cookies['earmark-theme'] || 'dark';

    if (cookie != process.env.ADMIN_TOKEN && NO_AUTH_UNLESS_ADMIN.includes(req.page.name)) {
        console.error('non admin user trying to access admin page')
        return NextResponse.redirect(new URL(`/auth/unauthorized`, req.url))
    } else if (cookie && NO_ACCESS_ON_AUTH.includes(req.page.name)) {
        console.log('user is logged in, redirecting to /auth/unauthorized');
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
    } else if (!cookie && NO_ACCESS_ON_UNAUTH.includes(req.page.name)) {
        console.log('user is logged in, redirecting to /auth/unauthorized');
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
    }
}