/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../components/Nav/SideNav';
import HeadTemplate from '../../components/Head';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Transfers.module.css';
import { useAuth } from '../../lib/hooks/useAuth';

export default function Home() {
    const auth = useAuth();

    return (
        <div className={styles.page}>
        <HeadTemplate title="Transfers" description="Page for account transfers for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <SideNav />
            <section className={styles.body}>
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : <h1>Transfers</h1> }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};