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
import { useFirestore } from '../../src/lib/hooks/useFirestore';
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