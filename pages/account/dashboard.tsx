/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useCollapse from 'react-collapsed'
import styles from '../../styles/Dashboard/Dashboard.module.css'
import axios from 'axios';
import { globalVars } from '../../lib/globalVars';
import { useAuth } from '../../lib/hooks/useAuth';

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { DataGrid, 
    GridRowsProp,
    GridColDef,
 } from '@mui/x-data-grid';

import SideNav from '../../components/Sidenav';
import DashboardBody from '../../components/DashboardBody';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import { unstable_ownerWindow } from '@mui/utils';

const FRONTEND_URL = globalVars().FRONTEND_URL;
const API_URL = globalVars().API_URL;

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
const auth = getAuth();

// DATA FOR STATIC SITE, REPLACE WITH DYNAMIC FETCHED DATA LATER

const transactionData = [
    { id: "ejradyRl9Mt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: "McDonald's", col2: '2021-05-07', col3: "12.01", col4: "Food and Drink" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Apple', col2: "2021-06-01", col3: "2,199.99", col4: "Electronics" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Safeway', col2: "2021-02-08", col3: "19.88", col4: "Grocries" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Oori', col2: "2021-08-22", col3: "8.75", col4: "Food and Drink" },
    { id: "ejradyRl9Mkfdow1fZDnvx4GwKi7wpx7E", col1: 'Target', col2: "2021-01-29", col3: "38.98", col4: "Shopping" },
    { id: "ejKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Home Depot', col2: "2021-12-31", col3: "133.22", col4: "Home Goods" },
];

const accountData = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment" },
];

const TREEMAP_DATA = [
	{
		name: 'axis',
		children: [
			{ name: 'January', size: 100000, fill: "black" },
			{ name: 'Febuary', size: 100000, fill: "Red" },
			{ name: 'March', size: 100000, fill: "Orange" },
			{ name: 'April', size: 100000, fill: "Yellow" },
			{ name: 'May', size: 100000, fill: "Green" },
            { name: 'June', size: 100000, fill: "Blue" },
			{ name: 'July', size: 100000, fill: "Indigo" },
			{ name: 'August', size: 100000, fill: "Violet" },
			{ name: 'September', size: 100000, fill: "grey" },
			{ name: 'October', size: 100000, fill: "pink" },
			{ name: 'November', size: 100000, fill: "purple" },
			{ name: 'December', size: 100000, fill: "brown" },
		],
	},
];

const BAR_CHART_DATA = [
  { name: 'January', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'February', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'March', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'April', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'May', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'June', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'July', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'August', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'September', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'October', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'November', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'December', food: 250, transportation: 300, utilities: 350, leasure: 400 },
];

const PIE_CHART_DATA = [
  { name: "Food", value: 100, fill: "purple" },
  { name: "Transportation", value: 200, fill: "blue" },
  { name: "Utilities", value: 300, fill: "red" },
  { name: "Leasure", value: 400, fill: "green" },
];

export async function getServerSideProps({ req, res }) {
    const config = {
        method: "GET",
        url: API_URL + '/api/earmark/allTransactions',
        params: {
            // @ts-ignore
            user_id: 'A9kohZbP3WRB1qdr3CqEd9GOLi33',
            startDate: '2021-01-01',
            endDate: '2022-01-01',
        },
        headers: {
            'Content-Type': 'application/json',
            'earmark-api-key': process.env.EARMARK_API_KEY,
        },
    };
    const axiosResponse = await axios(config);
    console.log(axiosResponse.data)
    return {
      props: { dataGridTransactions: axiosResponse.data.dataGridTransactions, 
        transactionMetadata: axiosResponse.data.transactionMetadata 
    },
    }
}

export default function Home({ dataGridTransactions, transactionMetadata }) {
    const auth = useAuth();
    console.log(dataGridTransactions)

    return (
        <div className="">
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="Dashboard overview for Earmark" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <div className="dashboard-container">
                
                <div className="data-container">
                    {/* @ts-ignore */}
                    { !auth.user ? <NotSignedIn /> : <DashboardBody transactionData={transactionData} accountData={accountData} bar_chart={BAR_CHART_DATA} tree_map={TREEMAP_DATA} pie_chart={PIE_CHART_DATA} /> }
                </div>
            </div>
        </main>
        <footer></footer>
        </div>
    )
}