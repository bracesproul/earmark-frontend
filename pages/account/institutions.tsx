/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import DatagridAccounts from '../../components/DatagridAccounts';
import SideNav from '../../components/Sidenav';
import Head from 'next/head';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import { useAuth } from '../../lib/hooks/useAuth';
import { initializeApp } from "firebase/app";
import styles from '../../styles/Institutions/Institutions.module.css';

const firebaseConfig = {
    apiKey: "AIzaSyCOnXDWQ369OM1lW0VC5FdYE19q1ug0_dc",
    authDomain: "earmark-8d1d3.firebaseapp.com",
    projectId: "earmark-8d1d3",
    storageBucket: "earmark-8d1d3.appspot.com",
    messagingSenderId: "46302537330",
    appId: "1:46302537330:web:403eac7f28d2a4868944eb",
    measurementId: "G-5474KY2MRV"
};
const app = initializeApp(firebaseConfig);

const accountData = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment" },
];


export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
        <title>Institutions</title>
        <meta name="description" content="List of all linked institutions for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <div className="institutions-container">
                    
                <div className="institutions-datagrid">
                    {/* @ts-ignore */}
                    { !auth.user ? <NotSignedIn /> : <DatagridAccounts data={accountData} /> }
                </div>
            </div>
        </main>
        <footer></footer>
        </div>
    )
};