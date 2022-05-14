/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import Head from 'next/head';


import styles from '../../styles/Account/Account.module.css';

import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged 
} from "firebase/auth";
import { getFirestore, 
    doc, 
    getDoc 
} from "firebase/firestore";

import NotSignedIn from '../../components/Auth/NotSignedIn'
import SideNav from '../../components/Sidenav';
import ViewAccount from '../../components/Account/ViewAccount'
import SetupAccount from '../../components/Account/SetupAccount'

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

const accountData = [
    {account: {
        account_id: "acc_id_1",
        first_name: "John",
        last_name: "Doe",
        date_of_birth: "01/01/2000",
        address_street: "123 Main St",
        address_city: "Anytown",
        address_state: "CA",
        address_zip: "12345",
        phone_number: "(123)456-7890",
        email: "admin@earmark.com",
        billing_info: {
            billing_account_name: "Main Account",
            billing_plan: "Basic $14/month",
            billing_id: "billing_id_1",
            first_name: "John",
            last_name: "Doe",
            card_last_four: "1234",
            card_type: "Visa",
            card_exp_date: "01/20",
            billing_address: {
                address_street: "123 Main St",
                address_city: "Anytown",
                address_state: "CA",
                address_zip: "12345",
            }
        }
    }}
]

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
            <title>Account</title>
            <meta name="description" content="Account overview for Earmark" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
                { uid === "Unauthorized" ? 
                <>
                <SideNav />
                <NotSignedIn />
                </>  : 
                <>
                <Account user_id={uid} />
                </> }
        </main>
        <footer></footer>
        </div>
    )
};

const Account = ({ user_id }) => {
    const [uid, setUid] = useState("Unauthorized");
    const [setup, setSetup] = useState(false);

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

    const checkForSetup = async () => {
        const docRef = doc(db, "users", user_id);
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
    }, [uid])

    return (
        <>
        { setup ?  
        <SetupAccount user_id={user_id} />
        : 
        <>
        <SideNav />
        <ViewAccount />
        </>
        }
        </>
    )
}