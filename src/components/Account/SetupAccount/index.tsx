/* eslint-disable */
import React, {
    useState,
} from 'react';

import styles from '../../../../styles/Account/Account.module.css';

import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    setDoc 
} from "firebase/firestore";

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


const updateFirestore = async (user_id, dob, street, city, state, zip, userId) => {
    const docRef = doc(db, "users", user_id);
    const docData = {
        date_of_birth: dob,
        address_street: street,
        address_city: city,
        address_state: state,
        address_zip: zip,
        userId: userId,
        setup: true,
    };
    await setDoc(docRef, docData, { merge: true });
}

const SetupAccount = ({ user_id }) => {
    const [dob, setDob] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [userId, setUserId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateFirestore(user_id, dob, street, city, state, zip, userId);
        Router.reload();
    }

    return (
        <div className={styles.accountInfoContainer}>
            <h1 className={styles.title}>Compleete account setup</h1>
            <h1 className={styles.title}>Personal</h1>
            <div className={styles.accountDivContainerSetup}>
                <form onSubmit={handleSubmit} id="personal_info_form">
                <span className={styles.rowContainerInput}>
                    <h3 className={styles.rowInfo}>Date of birth:</h3>
                    <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    />
                </span>
                <span className={styles.rowContainerInput}>
                    <h3 className={styles.rowInfo}>User ID:</h3>
                    <input
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder= "JohnDoe99"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    />
                </span>
                
                <span className={styles.columnContainerInput}>
                    <h3 className={styles.rowInfo}>Address:</h3>
                    <input
                    type="text"
                    id="street"
                    name="street"
                    placeholder="1234 Main Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}  
                    required
                    />
                    <input 
                    id="city" 
                    name="city" 
                    type="text" 
                    placeholder='Albany'
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}  
                    required
                    />
                    <input 
                    id="state" 
                    name="state" 
                    type="text" 
                    placeholder='New York'
                    value={state} 
                    onChange={(e) => setState(e.target.value)}  
                    required
                    />
                    <input 
                    id="zip" 
                    name="zip" 
                    type="text" 
                    pattern="[0-9]{5}" 
                    placeholder='12084'
                    value={zip} 
                    onChange={(e) => setZip(e.target.value)}  
                    required
                    />

                </span>
                <input type="submit" id="submit" name="submit" value="Submit" className={styles.submit} />
                </form>
            </div>
            <hr />
            <div className={styles.accountDivContainer}>
                <h1 className={styles.title}>Security</h1>
                <span className={styles.rowContainerSetup}>
                    <h3 className={styles.rowInfo}>User ID:</h3>
                    <h3 className={styles.rowInfo}>admin@earmark.com</h3>
                </span>
                <span className={styles.rowContainerSetup}>
                    <h3 className={styles.rowInfo}>Email:</h3>
                    <h3 className={styles.rowInfo}>admin@earmark.com</h3>
                </span>
                <span className={styles.rowContainerSetup}>
                    <h3 className={styles.rowInfo}>Password:</h3>
                    <h3 className={styles.rowInfo}>********</h3>
                </span>
                <span className={styles.rowContainerSetup}>
                    <h3 className={styles.rowInfo}>Phone Number:</h3>
                    <h3 className={styles.rowInfo}>(012)-345-6789</h3>
                </span>
            </div>
            <hr />
            <NoBillingAccount />
        </div>
    )
};

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


export default SetupAccount;