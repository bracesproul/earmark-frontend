/* eslint-disable */
import React, { useState, useEffect, useContext, createContext } from "react";
import { doc,
  setDoc,
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore'
import { useAuth } from "../useAuth";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import axios from "axios";
import updateFirestoreUser from "../../firestore/updateFirestoreUser"
import { globalVars } from "../../globalVars";

const firebaseConfig = {
    apiKey: "AIzaSyCOnXDWQ369OM1lW0VC5FdYE19q1ug0_dc",
    authDomain: "earmark-8d1d3.firebaseapp.com",
    projectId: "earmark-8d1d3",
    storageBucket: "earmark-8d1d3.appspot.com",
    messagingSenderId: "46302537330",
    appId: "1:46302537330:web:403eac7f28d2a4868944eb",
    measurementId: "G-5474KY2MRV"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const API_URL = globalVars().API_URL;

const firestoreContext = createContext({});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideFirestore({ children }) {
  const auth = useProvideFirestore();
  return <firestoreContext.Provider value={auth}>{children}</firestoreContext.Provider>;
}


function useProvideFirestore() {
  const [success, setSuccess] = useState(false);
  const auth = useAuth();
  const app = firebaseApp;
  let analytics;

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  const test = () => {
    console.log('test func, inside the useFirestore hook')
  }

  // in backend under <createUserEntry>
  const createUserEntry = async (user_id, phoneNumber, email, firstName, lastName) => {
    try {
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          user_id: user_id,
          func: 'createUserEntry',
          params: {
            phoneNumber: phoneNumber,
            email: email,
            firstName: firstName,
            lastName: lastName
          }
        },
        url: '/api/firebase'
      }
      const response = await axios(config)
      setSuccess(true)
    } catch (error) {
      console.error('firebase createUserEntry error: ', error)
    }
  }
  
  // in backend under <updateCategory>
  const updateCategory = async (category, transactionObjects) => {
    // @ts-ignore
    const docRef = doc(db, "users", auth.user.uid, "categories", category);
    const docData = {
      transactions: transactionObjects,
    }
    await setDoc(docRef, docData, { merge: true })
    .then((res) => {
        setSuccess(true);
    })
    .catch((error) => {
      console.error('err updating category, ', error)
    })
  };

  // in backend under <addBillingPlan>
  const addBillingPlan = async (user_id, plan) => {
    // @ts-ignore
    const docRef = doc(db, "users", user_id);
    const docData = {
      billing_info: {
        billing_account_name: "",
        billing_address: {
          address_city: "",
          address_state: "",
          address_street: "",
          address_zip: "",
        },
        billing_id: "",
        billing_plan: plan,
        card_exp_date: "",
        card_last_four: "",
        card_type: "",
        first_name: "",
        last_name: "",
      },
    }
    await setDoc(docRef, docData, { merge: true })
    .then((res) => {
        setSuccess(true);
    })
    .catch((error) => {
      console.error('err updating billing plan, ', error)
    })
  };

  const setupUserAccount = async (user_id, date_of_birth, street, street2, city, state, zip, userId) => {
    try {
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          user_id: user_id,
          func: 'setupUserAccount',
          params: {
            dob: date_of_birth,
            street: street,
            street2: street2,
            city: city,
            state: state,
            zip: zip,
            userId: userId,
            setup: true,
          }
        },
        url: '/api/firebase'
      }
      const response = await axios(config)
      setSuccess(true)
    } catch (error) {
      console.error('firebase createUserEntry error: ', error)
    }
  };

  const logSignIn = (method) => {
    logEvent(analytics, 'signin', { 
        method: method,
    });
  };

  const logLinkInstitution = (institution) => {
    logEvent(analytics, 'link_institution', { 
        institution: institution,
    });
  };

  const logTest = (test) => {
    console.log('clicked test button', test)
    logEvent(analytics, 'test', { 
      test: test,
    });
  };

  useEffect(() => {
    setSuccess(false);
    console.log('set success false')
  }, [success])

  return {
    app,
    success,
    test,
    createUserEntry,
    addBillingPlan,
    updateCategory,
    setupUserAccount,
    logSignIn,
    logLinkInstitution,
    logTest,
  };
}


interface IProvideFirestore {
  app: any;
  success: boolean;
  test: () => void;
  createUserEntry: (user_id: string, phoneNumber: string, email: string, firstName: string, lastName: string) => void;
  addBillingPlan: (user_id: string, plan: string) => void;
  updateCategory: (category: string, transactionObjects: any) => void;
  setupUserAccount: (user_id: string, dob: string, street: string, street2: string, city: string, state: string, zip: string, userId: string) => void;
  logSignIn: (method: string) => void;
  logLinkInstitution: (institution: string) => void;
  logTest: (test: string) => void;
}

export const useFirestore = () => useContext(firestoreContext) as IProvideFirestore;
