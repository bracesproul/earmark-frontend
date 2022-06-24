/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import Head from 'next/head';


import styles from '../../styles/Account/Account.module.css';
import { useAuth } from '../../../src/lib/hooks/useAuth';
import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    getDoc 
} from "firebase/firestore";

import NotSignedIn from '../../../src/components/Auth/NotSignedIn'
import SideNav from '../../../src/components/Nav/SideNav';
import SeeAccount from '../../../src/components/Account'

export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
            <title>Account</title>
            <meta name="description" content="Account overview for Earmark" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            { /* @ts-ignore */ }
                { !auth.user ? 
                <>
                <SideNav />
                <NotSignedIn />
                </>  
                : 
                <>
                <SideNav />
                <SeeAccount />
                </>
                }
        </main>
        <footer></footer>
        </div>
    )
};