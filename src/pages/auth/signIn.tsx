/* eslint-disable */
import Head from "next/head";
import { useAuth } from "../../lib/hooks/useAuth";
import AccountExists from '../../components/Auth/AccountExists';
import SignIn from '../../components/Auth/SignIn';
import SideNav from '../../components/Nav/SideNav';
import React from "react";
import styles from '../../styles/Auth/SignIn.module.css'

export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
        <title>Sign Into Earmark</title>
        <meta name="description" content="Sign in page for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <div className="signIn-container">
                {/* @ts-ignore */}
                { !auth.user ? <SignIn /> : <AccountExists /> }
            </div>
        </main>
        <footer></footer>
        </div>
    )
};