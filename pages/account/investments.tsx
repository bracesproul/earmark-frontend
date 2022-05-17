/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../components/Sidenav';
import Head from 'next/head';
import { useAuth } from '../../lib/hooks/useAuth';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import styles from '../../styles/Investments/Investments.module.css';

export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
        <title>Investments</title>
        <meta name="description" content="Data on investments for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <div className="institutions-container">
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : <h1>Investments</h1> }
            </div>
        </main>
        <footer></footer>
        </div>
    )
};