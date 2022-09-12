/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import RecurringTransactions from '../../components/RecurringTransactions';
import CssBaseline from '@mui/material/CssBaseline';
import {parseCookies} from "../../lib/parseCookies";
import {useRouter} from "next/router";

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

export default function NewHome({ cookie }) {
    const router = useRouter();
    useEffect(() => {
        if (!cookie) {
            router.push("/auth/signin")
        }
    }, [cookie])
    return (
        <>
            <CssBaseline />
            <RecurringTransactions />
        </>
    )

}