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
import RecurringTransactions from '../../components/RecurringTransactions';
import PageTemplate from '../../components/PageTemplate';

function Home() {
    const auth = useAuth();

    return (
        <div className={styles.page}>
        <HeadTemplate title="Investments" description="Data on investments for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                <SideNav />
            </section>
            <section className={styles.recurringBody}>
                {/* @ts-ignore */}
                { !auth.user ? <NotSignedIn /> : <RecurringTransactions /> }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};

export default function NewHome() {
    return (
        <PageTemplate title="Recurring" description="Recurring transactions">
            <RecurringTransactions />
        </PageTemplate>
    )

}