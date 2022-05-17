/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../src/components/Sidenav';
import Head from 'next/head';
import NotSignedIn from '../../src/components/Auth/NotSignedIn';
import styles from '../../styles/Transfers/Transfers.module.css';
import { useAuth } from '../../src/lib/hooks/useAuth';

export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
        <title>Transfers</title>
        <meta name="description" content="Page for account transfers for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <div className="institutions-container">
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : <h1>Transfers</h1> }
            </div>
        </main>
        <footer></footer>
        </div>
    )
};