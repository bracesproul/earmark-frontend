import SignIn from '../../components/Auth/SignIn';
import React, {useEffect} from "react";
import {parseCookies} from "../../lib/parseCookies";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, res }) {
    const cookie = parseCookies(req).user_id
    console.log('cookie', cookie)
    if (res) {
        if (!cookie) {
            return {
                props: {
                    cookie: null,
                },
            }
        }
        if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }
    return {
        props: {
            cookie: cookie,
        },
    }
}


export default function SignInComponent({ cookie }) {
    const router = useRouter();
    useEffect(() => {
        if (cookie) {
            router.push("/account")
        }
    }, [cookie])

    return (
        <>
            <SignIn />
        </>
    )
}