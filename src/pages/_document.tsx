import { Html, Head, Main, NextScript } from 'next/document'

/*
* Keeping this for when I want to add things such as:
* - custom fonts from Google Fonts
* - google analytics
* - other CDNs
* */

export async function getServerSideProps({ req, res }) {
    const cookieTheme = req.cookies['earmark-theme'] || 'dark';
    return { props: { cookieTheme } }
}

export default function Document({ cookieTheme }) {
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