/* eslint-disable */
import React from 'react';
import SideNav from '../../components/Nav/SideNav';
import DataGridTransactions from '../../components/NewUIComponents/DataGridTransactions';
import styles from '../../styles/Dashboard/Dashboard.module.css';
import HeadTemplate from '../../components/Head';

const Dashboard = ({ categoryRows, dataGridColumns, dataGridRows, transactionMetadata, cookie }) => {
    return (
        <div className={styles.dashboard}>
        <HeadTemplate title="Dashboard" description="Dashboard overview for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                <SideNav />
            </section>
            <section className={styles.dashboardContainer}>
                <DataGridTransactions/>
            </section>
        </main>
        <footer></footer>
        </div>
    )
}

export default Dashboard;