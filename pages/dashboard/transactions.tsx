/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../src/components/Nav/SideNav';
import Head from 'next/head';
import NotSignedIn from '../../src/components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Transactions.module.css';
import { useAuth } from '../../src/lib/hooks/useAuth';
import HeadTemplate from '../../src/components/Head';

export default function Home() {
    const auth = useAuth();

    return (
        <div className={styles.page}>
        <HeadTemplate title="Transactions" description="Transactions overview for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                <SideNav />
            </section>
            <section className={styles.body}>
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : <h1>Transactions</h1> }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};