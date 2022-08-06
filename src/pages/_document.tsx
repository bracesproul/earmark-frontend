import { Html, Head, Main, NextScript } from 'next/document'

/*
* Keeping this for when I want to add things such as:
* - custom fonts from Google Fonts
* - google analytics
* - other CDNs
* */

export async function getServerSideProps({ req, res }) {
    const cookieTheme = req.cookies['earmark-theme'] || 'dark';
    console.log('theme-cookieeee', cookieTheme);
    return { props: { cookieTheme } }
}

export default function Document({ cookieTheme }) {
    console.log('cookieTheme', cookieTheme);
    return (
        <Html lang="en">
            <Head/>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}