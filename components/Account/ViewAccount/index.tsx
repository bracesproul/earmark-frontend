/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';

import styles from '../../../styles/Account/Account.module.css';
import { useAuth } from "../../../lib/hooks/useAuth";

import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    getDoc,
} from "firebase/firestore";

import Security from '../Security'
import Personal from '../Personal'
import Billing from '../Billing'

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


const ViewAccount = () => {
    const [docData, setDocData] = useState(null);
    const auth = useAuth();


    const getUserInfo = async () => {
        /* @ts-ignore */
        const docRef = doc(db, "users", auth.user.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const data = [
                {account: docSnap.data()}
            ]
            setDocData(data);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserInfo();
        /* @ts-ignore */
    }, [auth.user.uid]);

    if (!docData) return <h1>Loading...</h1>

    return (
        <>
        {docData.map((account, index) => {
        const data = account.account;
        return (
        <div className={styles.accountInfoContainer} key={index}>
            {/* @ts-ignore */}
            <Personal data={data} uid={auth.user.uid} />
            <hr />
            {/* @ts-ignore */}
            <Security uid={auth.user.uid} data={data} />
            <hr />
            {/* @ts-ignore */}
            <Billing uid={auth.user.uid} billing_info={account.account.billing_info} />
        </div>
        )
        })}
        </>
    )
}

export default ViewAccount;