/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import SideNav from '../../components/Sidenav';
import Head from 'next/head';
import { initializeApp } from "firebase/app";
import { getAuth, 
    onAuthStateChanged 
} from "firebase/auth";
import NotSignedIn from '../../components/Auth/NotSignedIn';
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
        <title>Transfers</title>
        <meta name="description" content="Page for account transfers for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <div className="institutions-container">
                <div className="sideNav-container">
                <SideNav />
                </div>
                { uid === "Unauthorized" ? <NotSignedIn /> : <h1>Transfers</h1> }
            </div>
        </main>
        <footer></footer>
        </div>
    )
};