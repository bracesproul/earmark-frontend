/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import DatagridAccounts from '../../components/DatagridAccounts';
import SideNav from '../../components/Sidenav';
import Head from 'next/head';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import { 
    getAuth, 
    onAuthStateChanged 
} from "firebase/auth";
import { initializeApp } from "firebase/app";

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

const accountData = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment" },
];


export default function Home() {
    const [uid, setUid] = useState("Unauthorized");
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUid(auth.currentUser.uid);
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
        <title>Institutions</title>
        <meta name="description" content="List of all linked institutions for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <div className="institutions-container">
                <div className="sideNav-container">
                    <SideNav />
                </div>
                <div className="institutions-datagrid">
                    { uid === "Unauthorized" ? <NotSignedIn /> : <DatagridAccounts data={accountData} /> }
                </div>
            </div>
        </main>
        <footer></footer>
        </div>
    )
};