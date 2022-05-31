/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import { globalVars } from '../../src/lib/globalVars';
import { parseCookies } from '../../src/lib/parseCookies';
import SideNav from '../../src/components/Nav/SideNav';
import Head from 'next/head';
import NotSignedIn from '../../src/components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Investments.module.css';
import { useAuth } from '../../src/lib/hooks/useAuth';
import HeadTemplate from '../../src/components/Head';
import DatagridAccounts from '../../src/components/DatagridAccounts';
import { Suspense } from "react";
import dynamic from "next/dynamic";

const SuspenseDatagridAccounts = dynamic(
    () => import('../../src/components/DatagridAccounts'),
    { suspense: true }
);

const API_URL = globalVars().API_URL;
export async function getServerSideProps({ req, res }) {
    const cookie = parseCookies(req).user_id
    if (res) {
        if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
          res.writeHead(301, { Location: "/" })
          res.end()
        }
    }
    console.log('COOKIE', cookie)
    const config = {
        method: "GET",
        url: API_URL + '/api/earmark/allAccountInfo',
        params: {
            user_id: cookie,
        },
        headers: {
            'Content-Type': 'application/json',
            'earmark-api-key': process.env.EARMARK_API_KEY,
        },
    };
    const response = await axios(config);
    const accounts = response.data.accounts

    return {
      props: { 
        accounts: accounts,
        cookie: cookie,
       },
    }
}



export default function Home({ accounts, cookie }) {
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
                    <DatagridAccounts data={accounts} />
                    </>
                ) }
            </section>
        </main>
        <footer></footer>
        </div>
    )
};