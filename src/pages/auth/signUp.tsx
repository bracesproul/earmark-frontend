/* eslint-disable */
import Head from "next/head";
import { useAuth } from "../../lib/hooks/useAuth";
import AccountExists from '../../components/Auth/AccountExists';
import App from '../../components/Auth/SignUp';
import SideNav from '../../components/Nav/SideNav';
import React from "react";
import styles from '../../styles/Auth/SignUp.module.css'

export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
        <title>Sign Up for Earmark</title>
        <meta name="description" content="Sign up page for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <div className="signUp-container">
                {/* @ts-ignore */}
                {/*!auth.user ? <App /> : <AccountExists /> */  }
                <App />
            </div>
        </main>
        <footer></footer>
        </div>
    )
};
