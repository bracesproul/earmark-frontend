/* eslint-disable */
import React, { 
    useState,
    useEffect,
} from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { globalVars } from '../../src/lib/globalVars';
import { parseCookies } from '../../src/lib/parseCookies';
import SideNav from '../../src/components/Nav/SideNav';
import NotSignedIn from '../../src/components/Auth/NotSignedIn';
import DataGridTransactions from '../../src/components/NewUIComponents/DataGridTransactions';
import styles from '../../styles/Dashboard/Dashboard.module.css';
import HeadTemplate from '../../src/components/Head';

const API_URL = globalVars().API_URL;


export async function getServerSideProps({ req, res }) {
    const cookie = parseCookies(req).user_id
    if (res) {
        if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
          res.writeHead(301, { Location: "/" })
          res.end()
        }
    }

    const byCategoryConfig = {
        method: "GET",
        url: API_URL + '/api/earmark/allTransactionsByCategory',
        params: {
            // @ts-ignore
            user_id: cookie,
            startDate: '2021-01-01',
            endDate: '2022-01-01',
        },
        headers: {
            'Content-Type': 'application/json',
            'earmark-api-key': process.env.EARMARK_API_KEY,
        },
    };
    const categoryResponse = await axios(byCategoryConfig);

    const config = {
        method: "GET",
        url: API_URL + '/api/earmark/allTransactions',
        params: {
            // @ts-ignore
            user_id: cookie,
            startDate: '2021-01-01',
            endDate: '2022-01-01',
            queryType: 'datagrid',
        },
        headers: {
            'Content-Type': 'application/json',
            'earmark-api-key': process.env.EARMARK_API_KEY,
        },
    };
    const axiosResponse = await axios(config);
    console.log('axiosResponse', axiosResponse.data.dataGridTransactions)
    const allTransactionsColumns = [
        { field: 'col1', headerName: 'Name', width: 150 },
        { field: 'col2', headerName: 'Date', width: 150 },
        { field: 'col3', headerName: 'Amount', width: 150 },
        { field: 'col4', headerName: 'Category', width: 150 },
    ];
    return {
      props: { 
        dataGridColumns: allTransactionsColumns,
        categoryRows: categoryResponse.data.transactions,
        dataGridRows: axiosResponse.data.dataGridTransactions,
        transactionMetadata: axiosResponse.data.transactionMetadata,
        cookie: cookie,
       },
    }
}


const Dashboard = ({ categoryRows, dataGridColumns, dataGridRows, transactionMetadata, cookie }) => {
    const auth = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        // @ts-ignore
        if (!auth.user) return;
        // @ts-ignore
        router.push(`?user_id=${auth.user.uid}`);
        // @ts-ignore
    }, [auth.user])
    
    /* @ts-ignore */
    if (!auth.user) return <NeedAuth />;

    console.log(dataGridRows);
    return (
        <div className={styles.dashboard}>
        <HeadTemplate title="Dashboard" description="Dashboard overview for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                <SideNav />
            </section>
            <section className={styles.dashboardContainer}>
                <DataGridTransactions categoryRows={categoryRows} dataGridColumns={dataGridColumns} dataGridRows={dataGridRows} transactionMetadata={transactionMetadata} identifier="test" />
            </section>
        </main>
        <footer></footer>
        </div>
    )
}

const NeedAuth = () => {
    return (
        <div className={styles.dashboard}>
        <HeadTemplate title="Dashboard" description="Dashboard overview for Earmark" iconPath="/favicon.ico" />
        <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                <SideNav />
            </section>
            <section className={styles.dashboardContainer}>
                <NotSignedIn />
            </section>
        </main>
        <footer></footer>
        </div>
    )
};

export default Dashboard;

