/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../src/components/Nav/SideNav';
import Head from 'next/head';
import NotSignedIn from '../../src/components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Investments.module.css';
import { useAuth } from '../../src/lib/hooks/useAuth';
import HeadTemplate from '../../src/components/Head';
import DatagridAccounts from '../../src/components/DatagridAccounts';

const accountData = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment" },
];

export default function Home() {
    const auth = useAuth();

    return (
        <div className={styles.page}>
        <HeadTemplate title="Institutions" description="List of all linked institutions for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                <SideNav />
            </section>
            <section className={styles.body}>
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : <DatagridAccounts data={accountData} /> }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};