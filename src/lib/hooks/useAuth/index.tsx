/* eslint-disable */
import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import { getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

// Paramater ordering: user_id, phone_number?, email?, first_name?, last_name?, account_id?, dob?, street?, city?, state?, zip?, username?, setup?
import updateFirestoreUser from "../../firestore/updateFirestoreUser"

// Add your Firebase credentials
firebase.initializeApp({
    apiKey: "AIzaSyCOnXDWQ369OM1lW0VC5FdYE19q1ug0_dc",
    authDomain: "earmark-8d1d3.firebaseapp.com",
    projectId: "earmark-8d1d3",
    storageBucket: "earmark-8d1d3.appspot.com",
    messagingSenderId: "46302537330",
    appId: "1:46302537330:web:403eac7f28d2a4868944eb",
    measurementId: "G-5474KY2MRV"
});

const firebaseAuth = getAuth();

const authContext = createContext({});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  
  const signin = async (email, password) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signup = async (email, password, phoneNumber, firstName, lastName) => {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then( async (response) => {
        await updateFirestoreUser(response.user.uid, phoneNumber, email, firstName, lastName, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return signOut(firebaseAuth)
      .then(() => {
        setUser(false);
      });
  };

  const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        return true;
      });
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any
  // component that utilizes this hook to re-render with the
  // latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    passwordResetEmail,
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