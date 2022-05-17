/* eslint-disable */
import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore'
import { useAuth } from "../useAuth";

// Paramater ordering: user_id, phone_number?, email?, first_name?, last_name?, account_id?, dob?, street?, city?, state?, zip?, username?, setup?
import updateFirestoreUser from "../../firestore/updateFirestoreUser"

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

const firestoreContext = createContext({});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideFirestore({ children }) {
  const auth = useProvideFirestore();
  return <firestoreContext.Provider value={auth}>{children}</firestoreContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useFirestore = () => {
  return useContext(firestoreContext);
};

function useProvideFirestore() {
  const [success, setSuccess] = useState(false);
  const auth = useAuth();

  const test = () => {
    console.log('test func, inside the useFirestore hook')
  }
  
  const updateCategory = async (category, transactionObjects) => {
    // @ts-ignore
    const docRef = doc(db, "users", auth.user.uid, "categories", category);
    const docData = {
      transactions: transactionObjects,
    }
    await setDoc(docRef, docData, { merge: true })
    .then((res) => {
        console.log('updated category');
        setSuccess(true);
    })
    .catch((err) => {
      console.log('err updating category, ', err)
    })
  };

  useEffect(() => {
    setSuccess(false);
    console.log('set success false')
  }, [success])

  return {
    success,
    test,
    updateCategory
  };
}

// TODO: setup interface so I don't need to add @ts-ignore above every call of this hook
/*
interface AuthContextType {
  user: IUser;
  signOut: () => void;
  signIn: () => void;
}

export const useAuth = () => React.useContext(AuthContext) as AuthContextType;
*/