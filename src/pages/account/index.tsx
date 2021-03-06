/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import Head from 'next/head';
import { useRemoveCache } from '../../lib/hooks/useRemoveCache';
import PageTemplate from '../../components/PageTemplate';
import styles from '../../styles/Account/Account.module.css';
import { useAuth } from '../../lib/hooks/useAuth';
import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    getDoc 
} from "firebase/firestore";

import NotSignedIn from '../../components/Auth/NotSignedIn'
import SideNav from '../../components/Nav/SideNav';
import SeeAccount from '../../components/Account'

function Home() {
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

const AccountPage = () => {
    return (
        <>
        <PageTemplate title="Account" description="Account overview for Earmark">
            <SeeAccount />
        </PageTemplate>
        </>
    )
}

export default AccountPage;