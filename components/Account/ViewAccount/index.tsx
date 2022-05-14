/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';

import styles from '../../../styles/Account/Account.module.css';

import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged 
} from "firebase/auth";
import { getFirestore, 
    doc, 
    getDoc,
} from "firebase/firestore";


import { IoIosArrowDown, 
    IoIosArrowUp, 
    IoIosArrowForward, 
    IoIosArrowBack 
} from 'react-icons/io'
import useCollapse from 'react-collapsed'
import Router from 'next/router'

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


const ViewAccount = () => {
    const [uid, setUid] = useState("Unauthorized");
    const [docData, setDocData] = useState(null);
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

    const getUserInfo = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const data = [
                {account: docSnap.data()}
            ]
            setDocData(data);
            // console.log(docData);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserInfo();
        console.log(docData);
    }, [uid]);


    console.log('inside mapped view account')
    if (!docData) return <h1>Loading...</h1>

    return (
        <>
            {docData.map((account, index) => (
            <div className={styles.accountInfoContainer} key={index}>
                <h1 className={styles.title}>Personal</h1>
                <div className={styles.accountDivContainer}>
                    <span className={styles.rowContainer}>
                        <h3 className={styles.rowInfo}>Full name:</h3>
                        <h3 className={styles.rowInfo}>{account.account.first_name} {account.account.last_name}</h3>
                        <IoIosArrowForward />
                    </span>
                    <span className={styles.rowContainer}>
                        <h3 className={styles.rowInfo}>Date of birth:</h3>
                        <h3 className={styles.rowInfo}>{account.account.date_of_birth}</h3>
                        <IoIosArrowForward />
                    </span>
                    <span className={styles.columnContainer}>
                        <h3 className={styles.rowInfo}>Address:</h3>
                        <span className={styles.iconContainer}>
                            <IoIosArrowForward />
                        </span>
                        <p className={styles.pInfo}>{account.account.address_street}</p>
                        <p className={styles.pInfo}>{account.account.address_city}, {account.account.address_state}.</p>
                        <p className={styles.pInfo}>{account.account.address_zip}</p>
                    </span>
                </div>
                <hr />
                <div className={styles.accountDivContainer}>
                    <h1 className={styles.title}>Security</h1>
                    <span className={styles.rowContainer}>
                        <h3 className={styles.rowInfo}>User ID:</h3>
                        <h3 className={styles.rowInfo}>{account.account.email}</h3>
                    </span>
                    <span className={styles.rowContainer}>
                        <h3 className={styles.rowInfo}>Email:</h3>
                        <h3 className={styles.rowInfo}>{account.account.email}</h3>
                        <IoIosArrowForward />
                    </span>
                    <span className={styles.rowContainer}>
                        <h3 className={styles.rowInfo}>Password:</h3>
                        <h3 className={styles.rowInfo}>********</h3>
                        <IoIosArrowForward />
                    </span>
                    <span className={styles.rowContainer}>
                        <h3 className={styles.rowInfo}>Phone Number:</h3>
                        <h3 className={styles.rowInfo}>{account.account.phone_number}</h3>
                        <IoIosArrowForward />
                    </span>
                </div>
                <hr />
                {!account.account.billing_info ? <NoBillingAccount /> : <BillingCollapse billing_info={account.account.billing_info} />}
            </div>
            ))}
        </>
    )
}

const NoBillingAccount = () => {
    return (
        <div className={styles.accountDivContainer}>
            <h1 className={styles.title}>No billing account linked</h1>
            <span className={styles.billingOptionContainer}>
                <section className={styles.billingOptionCard}>
                    <h1 className={styles.rowInfo}>Basic</h1>
                    <h3 className={styles.rowInfo}>$14/month</h3>
                    <h3 className={styles.rowInfo}>Features</h3>
                    <p className={styles.pInfo}>Feature 1</p>
                    <p className={styles.pInfo}>Feature 2</p>
                    <p className={styles.pInfo}>Feature 3</p>
                    <p className={styles.pInfo}>Feature 4</p>
                    <p className={styles.pInfo}>Feature 5</p>
                </section>
                <section className={styles.billingOptionCard}>
                    <h1 className={styles.rowInfo}>Profesional</h1>
                    <h3 className={styles.rowInfo}>$29/month</h3>
                    <h3 className={styles.rowInfo}>Features</h3>
                    <p className={styles.pInfo}>Feature 1</p>
                    <p className={styles.pInfo}>Feature 2</p>
                    <p className={styles.pInfo}>Feature 3</p>
                    <p className={styles.pInfo}>Feature 4</p>
                    <p className={styles.pInfo}>Feature 5</p>
                </section>
            </span>
        </div>
    )
}

const BillingCollapse = ({ billing_info }) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    if (!billing_info) return <NoBillingAccount />

    return (
        <>
        <div className={styles.accountDivContainer}>
            <h1 className={styles.title}>Billing</h1>
            <span className={styles.billingAccountContainer}>
                <h3 className={styles.rowInfo}>Billing Account:</h3>
                <span className={styles.billingAccountDropdown} {...getToggleProps({ onClick: () => setExpanded((prevExpanded) => !prevExpanded) })}>
                    <h4 className={styles.accountInfo}>Main Account</h4>
                    {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
                <section {...getCollapseProps()}>
                    <span className={styles.rowContainer}>
                            <h3 className={styles.rowInfo}>Billing plan:</h3>
                            <h3 className={styles.rowInfo}>{billing_info.billing_plan}</h3>
                            <IoIosArrowForward />
                        </span>
                        <span className={styles.columnContainer}>
                            <h3 className={styles.rowInfo}>Card:</h3>
                            <span className={styles.iconContainer}>
                                <IoIosArrowForward />
                            </span>
                            <p className={styles.pInfo}>{billing_info.card_type}</p>
                            <p className={styles.pInfo}>{billing_info.first_name} {billing_info.last_name}</p>
                            <p className={styles.pInfo}>**** **** **** {billing_info.card_last_four}</p>
                            <p className={styles.pInfo}>{billing_info.card_exp_date}</p>
                        </span>
                        <span className={styles.columnContainer}>
                            <h3 className={styles.rowInfo}>Billing Address:</h3>
                            <span className={styles.iconContainer}>
                                <IoIosArrowForward />
                            </span>
                            <p className={styles.pInfo}>{billing_info.billing_address.address_street}</p>
                            <p className={styles.pInfo}>{billing_info.billing_address.address_city}, {billing_info.billing_address.address_state}.</p>
                            <p className={styles.pInfo}>{billing_info.billing_address.address_zip}</p>
                        </span>
                        <span className={styles.columnContainer}>
                            <h3 className={styles.rowInfo}>Billing History:</h3>
                            <p className={styles.pInfo}>01/20 | $12</p>
                            <p className={styles.pInfo}>02/20 | $12</p>
                            <p className={styles.pInfo}>03/20 | $12</p>
                            <p className={styles.pInfo}>04/20 | $12</p>
                            <p className={styles.pInfo}>05/20 | $12</p>
                        </span>
                </section>
            </span>
        </div>
        
        </>
    )
};

export default ViewAccount;