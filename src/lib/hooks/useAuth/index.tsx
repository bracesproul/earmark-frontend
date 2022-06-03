/* eslint-disable */
import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import { getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  UserProfile,
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  TwitterAuthProvider,
  linkWithRedirect,
  getRedirectResult,
  sendEmailVerification
} from "firebase/auth";
import { useCookies } from "react-cookie";
import { useFirestore } from "../useFirestore";
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
/*
const useAuth = () => {
  return useContext(authContext);
};
*/

const useProvideAuth = () => {
  const firestore = useFirestore();
  const [user, setUser] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user_id"]);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const signin = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((response) => {
        setUser(response.user);
        setCookie("user_id", response.user.uid, {
          path: "/",
          maxAge: 604800,
          sameSite: true,
        });
        console.log('cookie set');
        firestore.logSignIn('custom')
        return response.user;
      });
    } catch(error) {
      if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).') {
        console.log(error);
        return 'FirebaseError: Firebase: Error (auth/wrong-password).'
        // setPasswordError(true);
      } else if (error == 'FirebaseError: Firebase: Error (auth/user-not-found).') {
        console.log(error)
        return 'FirebaseError: Firebase: Error (auth/user-not-found).'
        // setLoginError(true);
      }
    }
  };

  const signup = async (email, password, phoneNumber, firstName, lastName) => {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then( async (response) => {
        setUser(response.user);
        setCookie("user_id", response.user.uid, {
          path: "/",
          maxAge: 604800,
          sameSite: true,
        });
        return response.user;
      })
      .catch((error) => {
        if (error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
          return 'FirebaseError: Firebase: Error (auth/email-already-in-use).'
        } else {
          return 'unexpected error'
        }
      })
  };

  const linkOtherProvider = async (provider) => {
    if (provider === 'google') {
      linkWithRedirect(firebaseAuth.currentUser, googleProvider)
      .then(async (response) => {
        getRedirectResult(firebaseAuth).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            // Accounts successfully linked.
            const user = result.user;
            console.log('NEW USER CRED', user);
          }
        }).catch((error) => {
          console.error(error)
        });
      })
      .catch((error) => {
        console.error(error)
      });
    } else if (provider === 'facebook') {
      linkWithRedirect(firebaseAuth.currentUser, facebookProvider)
      .then(async (response) => {
        getRedirectResult(firebaseAuth).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            // Accounts successfully linked.
            const user = result.user;
            console.log('NEW USER CRED', user);
          }
        }).catch((error) => {
          console.error(error)
        });
      })
      .catch((error) => {
        console.error(error)
      });
    } else if (provider === 'twitter') {
      linkWithRedirect(firebaseAuth.currentUser, twitterProvider)
      .then(async (response) => {
        getRedirectResult(firebaseAuth).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            // Accounts successfully linked.
            const user = result.user;
            console.log('NEW USER CRED', user);
          }
        }).catch((error) => {
          console.error(error)
        });
      })
      .catch((error) => {
        console.error(error)
      });
    }
  };

  const signout = () => {
    return signOut(firebaseAuth)
      .then(() => {
        setUser(false);
        removeCookie("user_id")
      });
  };

  const passwordResetEmail = async (email) => {
      return await sendPasswordResetEmail(firebaseAuth, email)
      .then( async () => {
        return 'success';
      })
      .catch((error) => {
        console.error(error)
        return error;
      });
  };

  const sendVerificationEmail = async () => {
    return await sendEmailVerification(firebaseAuth.currentUser)
    .then(() => {
      return 'success';
    })
    .catch((error) => {
      console.error(error)
      return error;
    })
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setCookie("user_id", user.uid, {
          path: "/",
          maxAge: 604800,
          sameSite: true,
        });
      } else {
        setUser(false);
        removeCookie("user_id")
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
    linkOtherProvider,
    sendVerificationEmail
  };
}
interface IUseProvideAuth {
  user: any;
  signin: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, phoneNumber: string, firstName: string, lastName: string) => Promise<any>;
  signout: () => Promise<any>;
  passwordResetEmail: (email: string) => Promise<any>;
  useContext: () => any;
  useAuth: () => any;
  ProvideAuth: any;
  linkOtherProvider,
  sendVerificationEmail: () => Promise<any>;
}

export const useAuth = () => useContext(authContext) as IUseProvideAuth;