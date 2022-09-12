/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import Head from 'next/head';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Investments.module.css';
import { useAuth } from '../../lib/hooks/useAuth';
import HeadTemplate from '../../components/Head';
import { useFirestore } from '../../lib/hooks/useFirestore';
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


export default function Home({ cookie }) {
    const auth = useAuth();
    const firestore = useFirestore();
    const router = useRouter();
    useEffect(() => {
        if (!cookie) {
            router.push("/auth/signIn")
        }
    }, [cookie])

    return (
        <div className={styles.page}>
        <HeadTemplate title="Investments" description="Data on investments for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.body}>
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : (
                    <>
                    <h1>Investments</h1>
                    <button onClick={e => firestore.logTest('dashclick')}>click to log test</button>
                    </>
                ) }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};