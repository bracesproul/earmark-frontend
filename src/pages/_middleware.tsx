import { NextResponse } from 'next/server'

const ALLOWED_PAGES = ['/', '/auth/signIn', '/auth/signUp'];
const AUTH_PAGES = ['/auth/signIn', '/auth/signUp', '/auth/unauthorized'];

// on redirect to /auth/unauthorized, browser gives error because you were redirected too many times.
// dev tools giving 20-40 redirects to /auth/unauthorized for some reason

export function middleware(req, res) {
    const cookie = req.cookies['user_id'];
    if (cookie) {
        console.log('user logged in, returning')
        return;
    } else if (req.page.name == '/auth/unauthorized') {
        console.log('viewing unauth page, returning')
        return;
    } else if (!cookie && !ALLOWED_PAGES.includes(req.page.name)) {
        console.log('user NOT logged in, page access denied')
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
    }
    /*
    if (cookie && AUTH_PAGES.includes(req.page.name)) {
        console.log('i guess we runnin')
        console.log(req.page.name)
        console.log(cookie)
        return NextResponse.redirect(new URL('/auth/userAuthed', req.url))
    }
    if (!cookie && !ALLOWED_PAGES.includes(req.page.name)) {
        console.log('ye we runnin')
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
    }
    if (!cookie && req.page.name == '/auth/userAuthed') {
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
    }
    */
}