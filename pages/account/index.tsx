/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import Head from 'next/head';

import styles from '../../styles/Account/Account.module.css';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    getDoc 
} from "firebase/firestore";

import NotSignedIn from '../../src/components/Auth/NotSignedIn'
import SideNav from '../../src/components/Sidenav';
import ViewAccount from '../../src/components/Account/ViewAccount'
import SetupAccount from '../../src/components/Account/SetupAccount'

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

export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
            <title>Account</title>
            <meta name="description" content="Account overview for Earmark" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            { /* @ts-ignore */ }
                { !auth.user ? 
                <>
                <SideNav />
                <NotSignedIn />
                </>  : 
                <>
                { /* @ts-ignore */ }
                <Account />
                </> }
        </main>
        <footer></footer>
        </div>
    )
};

const Account = ({ }) => {
    const [setup, setSetup] = useState(false);
    const auth = useAuth();

    const checkForSetup = async () => {
        // @ts-ignore
        const docRef = doc(db, "users", auth.user.uid);
        const docSnap = await getDoc(docRef);
    
        if (!docSnap.data().setup) {
            console.log("SETUP:", docSnap.data().setup)
            setSetup(true);
        } else {
            console.log()
            setSetup(false);
        }
    }
    useEffect(() => {
        checkForSetup();
        // @ts-ignore
    }, [auth.user])

    return (
        <>
        { setup ?  
        <>
        { /* @ts-ignore */ }
        <SetupAccount user_id={auth.user.uid} />
        </>
        : 
        <>
        <SideNav />
        <ViewAccount />
        </>
        }
        </>
    )
}