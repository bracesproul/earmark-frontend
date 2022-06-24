/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../components/Nav/SideNav';
import Head from 'next/head';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Investments.module.css';
import { useAuth } from '../../lib/hooks/useAuth';
import HeadTemplate from '../../components/Head';
import { useFirestore } from '../../lib/hooks/useFirestore';
export default function Home() {
    const auth = useAuth();
    const firestore = useFirestore();
    return (
        <div className={styles.page}>
        <HeadTemplate title="Investments" description="Data on investments for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                <SideNav />
            </section>
            <section className={styles.body}>
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : (
                    <>
                    <h1>Investments</h1>
                    <button onClick={e => firestore.logTest('dashclick')}>click to log test</button>
                    </>
                ) }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};