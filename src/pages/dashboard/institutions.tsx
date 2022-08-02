/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../components/Nav/SideNav';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Investments.module.css';
import { useAuth } from '../../lib/hooks/useAuth';
import HeadTemplate from '../../components/Head';
import DatagridAccounts from '../../components/DatagridAccounts';

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
                { !auth.user ? (
                    <>
                    <NotSignedIn />
                    </>
                ) : (
                    <>
                    <DatagridAccounts />
                    </>
                ) }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};