/* eslint-disable */
import React, {
    useState,
    useEffect,
} from 'react';

import styles from '../../styles/SideNav/SideNav.module.css'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import Link from 'next/link';

import useCollapse from 'react-collapsed'

import PlaidLink from '../PlaidLink';
const DynamicPlaidLink = dynamic(() => import('../PlaidLink'))

import { initializeApp } from "firebase/app";
import { getAuth, 
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

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


const Sidenav = ({ }) => {
    const [uid, setUid] = useState("Unauthorized");
    const auth = getAuth();

    const router = useRouter()
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

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

    const handleClick = (e) => {
        let id;
        if (e === "transactions") {
            id = "transactions"
            const currentPath = router.query
            if (currentPath && currentPath.transactions) {
                router.push(`/account/dashboard?transactions=${currentPath.transactions}`)
            } else return
        } else {
            id = e.target.id
            router.push(`/account/dashboard?${id}`)
            return;
        }
        
    }

    // TODO: Fix bug where onClick all transactions, account name above txn list doesn't update

    const handleAccountClick = (bank_name, account_id) => {
        if (bank_name && account_id === "null") {
            setExpanded(false)
            return router.push(`/account/dashboard`)
        }
        router.push(`/account/dashboard?transactions=${bank_name}?id=${account_id}`)
        setExpanded(false)
    }


    return (
        <div className={styles.sideNavContainer}>
            <a onClick={e => handleClick("transactions")}>
                <h3 id="transactions" className={styles.sideNavOption} {...getToggleProps({ 
                    onClick: () => setExpanded((prevExpanded) => !prevExpanded) 
                    })}>
                    {isExpanded ? 'Transactions' : 'Transactions'}
                </h3>
            </a>
            <section {...getCollapseProps()}>
                {uid === "Unauthorized" ? 
                    <a onClick={e => handleAccountClick("null", "null")}>
                        <p className={styles.accountDropdownList}>All Transactions</p>
                    </a>
                    :
                    <>
                    <a onClick={e => handleAccountClick("null", "null")}>
                        <p className={styles.accountDropdownList}>All Transactions</p>
                    </a>
                    {accounts.map((acc, index) => {
                    return (
                        <a onClick={e => handleAccountClick(acc.accounts.pathname, acc.accounts.account_id)} key={index}>
                            <p className={styles.accountDropdownList} key={index}>{acc.accounts.name}</p>
                        </a>
                    ) 
                    })}
                    </> 
                }
            </section>
            <Link href="/account/visualize">
                <h3 id="visualize" className={styles.sideNavOption}>Visualize Data</h3>
            </Link>

            <Link href="/account/institutions">
                <h3 id="accounts" className={styles.sideNavOption}>Institutions</h3>
            </Link>


            <Link href="/account/investments">
                <h3 id="investments" className={styles.sideNavOption}>Investments</h3>
            </Link>

            <Link href="/account/transfers">
                <h3 id="transfers" className={styles.sideNavOption}>Transfers</h3>
            </Link>

            { uid === "Unauthorized" ? null : <DynamicPlaidLink user_id={uid} /> }
            <hr />

        <Auth />
        </div>
    )
}

const Auth = () => {

    const [uid, setUid] = useState('Unauthorized')

    const auth = getAuth();
    const signOutAuth = () => {
        signOut(auth).then(() => {
            console.log('signed out')
        }).catch((error) => {
            console.log('error signing out', error)
        });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const user_id = user.uid;
            setUid(user_id)
        } else {
            setUid('Unauthorized')
        }
        });
    }, [auth])

    return (
        <div className={styles.sideNavAuthContainer}>
            <Link href="/account">
                <h3 id="account" className={styles.authOption}>Account</h3>
            </Link>
            { uid === 'Unauthorized' ? 
                <>
                <Link href="/auth/signIn">
                    <h3 id="signOut" className={styles.authOption}>Sign In</h3>
                </Link>
                <Link href="/auth/signUp">
                    <h3 id="signOut" className={styles.authOption}>Sign Up</h3>
                </Link>
                </>
            : 
            <Link href="/auth/signIn">
                <h3 onClick={signOutAuth} id="signIn" className={styles.authOption}>Sign Out</h3>
            </Link>
            }


        </div>
    )
}

export default Sidenav;