/* eslint-disable */
import Head from "next/head";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import AccountExists from '../../components/Auth/AccountExists';
import SignIn from '../../components/Auth/SignIn';
import SideNav from '../../components/Sidenav';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'

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
const db = getFirestore(app);

const accounts = [
    {accounts: {
        account_id: "acc_id_1",
        name: "Bank of America",
        official_name: "Bank of America",
        pathname: "Bank_of_America",
        type: "depository",
        subtype: "checking",
    }},
    {accounts: {
        account_id: "acc_id_2",
        name: "Chase",
        official_name: "JP Morgan Chase",
        pathname: "Chase",
        type: "depository",
        subtype: "savings",
    }},
    {accounts: {
        account_id: "acc_id_3",
        name: "Fidelity",
        official_name: "Fidelity Investments",
        pathname: "Fidelity",
        type: "investment",
        subtype: "depository",
    }},
    {accounts: {
        account_id: "acc_id_4",
        name: "Plaid IRA",
        official_name: "Plaid IRA",
        pathname: "Plaid_IRA",
        type: "investment",
        subtype: "ira",
    }},
]

export default function Home() {
    const [uid, setUid] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUid(auth.currentUser.uid);
            console.log('signed in', uid);
        } else {
            // User is signed out
            setUid("Unauthorized");
            console.log('signed out');
        }
        });
    }, [auth])
    return (
        <div className="">
        <Head>
        <title>Sign Into Earmark</title>
        <meta name="description" content="Sign in page for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <div className="signIn-container">
                <div className="sideNav-container">
                <SideNav accounts={accounts} />
                </div>
                { uid === "Unauthorized" ? <SignIn /> : <AccountExists /> }
            </div>
        </main>
        <footer></footer>
        </div>
    )
};