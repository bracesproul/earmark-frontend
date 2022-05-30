/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import Router from 'next/router';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoIosAddCircleOutline } from 'react-icons/io'
import styles from '../../../../styles/Account/Account.module.css';

import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    setDoc 
} from "firebase/firestore";
import { getAuth, updatePassword, updateEmail, sendPasswordResetEmail, reauthenticateWithCredential } from "firebase/auth";

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
const auth = getAuth();
const user = auth.currentUser;

// in backend under <updateAccountElement>
const updateFirestore = async (user_id, element, edit) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        params: {
            user_id: user_id,
            element: element,
            edit: edit
        },
        url: '/api/updateAccount',
        method: "GET"
    }
    const response = await axios(config);
    /*
    const docRef = doc(db, "users", user_id);
    const docData = {
        [element]: edit,
    };
    await setDoc(docRef, docData, { merge: true });
    */
};

const updateUserPassword = async (user_id, password) => {
    await updatePassword(user, password).then(async () => {
        await securityChangeLogUpdate(user_id, "Password");
        console.log("Password updated successfully");
      }).catch((error) => {
        console.log("Error changing password:", error);
      });
};

const updateUserEmail = async (user_id, email) => {
    updateEmail(user, email).then(async () => {
        await securityChangeLogUpdate(user_id, "Email");
        console.log("Email updated successfully");
      }).catch((error) => {
        console.log("Error changing email:", error);
      });
};

// in backend under <addSecurityChangelog>
const securityChangeLogUpdate = async (user_id, changeType) => {
    const docRef = doc(db, "users", user_id);
    const docData = {
        securityChangelog: [
            {change: changeType, date: new Date().toLocaleString(), user_id: user_id},
        ]
    };
    await setDoc(docRef, docData, { merge: true });
};

const sendPasswordResetEmailV = async (email) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log("Password reset email sent successfully");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}


const EditAccountSettingPopupRowV = ({ element, user_id, title, content }) => {
    const [edit, setEdit] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [toChange, setToChange] = useState("");
    
    const fullNameInput = {
        input: 
            (<input
            id="new-name"
            name="new-name"
            type="name"
            placeholder="Full Name"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            autoComplete="name"
            required
            />)
        ,
        title: "Change Name",
        toChange: `Current name: ${`PLACEHOLDER`}`,
    };
    const dateOfBirth = {
        input: (
            <input
            id="birthday"
            name="birthday"
            type="date"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            autoComplete="bday"
            required
            />
        ),
        title: "Change Birthday",
        toChange: `Current birthday: ${`PLACEHOLDER`}`,
    };
    const emailInput = {
        input: (
            <input
            id="new-email"
            name="new-email"
            type="email"
            placeholder="Email"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            autoComplete="email"
            required
            />
        ),
        title: "Change Email",
        toChange: `Current email: ${`PLACEHOLDER`}`,
    };
    const phoneInput = {
        input: (
            <input
            id="new-phone"
            name="new-phone"
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            autoComplete="phone"
            required
            />
        ),
        title: "Change Phone Number",
        toChange: `Current phone number: ${`PLACEHOLDER`}`,
    };
    const addressInput = {
        input: <></>,
        title: "Change Address",
        toChange: `Current address: ${`PLACEHOLDER`}`,
    };
    const usernameInput = {
        input: (
            <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            autoComplete="username"
            required
            />
        ),
        title: "Change Username",
        toChange: `Current username: ${`PLACEHOLDER`}`,
    };
    const passwordInput = {
        input: (
            <input
            id="new-password"
            name="new-password"
            type="password"
            placeholder="Password"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            autoComplete="new-password"
            required
            />
        ),
        inputV: (
            <button onClick={() => sendPasswordResetEmailV(content)}>Send Password Reset Email</button>
        ),
        title: "Change Password",
        toChange: ``,
    };
    const billingPlan = {
        input: <></>,
        title: "Change Billing Plan",
        toChange: `Current billing plan: ${`PLACEHOLDER`}`,
    }



    useEffect(() => {
        switch (element) {
            case "full_name":
                setPopupTitle(fullNameInput.title);
                setToChange(fullNameInput.toChange);
                console.log(fullNameInput.title);
                break;
            case "userId":
                setPopupTitle(usernameInput.title);
                setToChange(usernameInput.toChange);
                console.log(usernameInput.title);
                break;
            case "date_of_birth":
                setPopupTitle(dateOfBirth.title);
                setToChange(dateOfBirth.toChange);
                console.log(dateOfBirth.title);
                break;
            case "usersAddress":
                setPopupTitle(addressInput.title);
                setToChange(addressInput.toChange);
                console.log(addressInput.title);
                break;
            case "billing_plan":
                setPopupTitle(billingPlan.title);
                setToChange(billingPlan.toChange);
                console.log(billingPlan.title);
                break;
            case "email":
                setPopupTitle(emailInput.title);
                setToChange(emailInput.toChange);
                console.log(emailInput.title);
                break;
            case "phone_number":
                setPopupTitle(phoneInput.title);
                setToChange(phoneInput.toChange);
                console.log(phoneInput.title);
                break;
            case "password":
                setPopupTitle(passwordInput.title);
                setToChange(passwordInput.toChange);
                console.log(passwordInput.title);
                break;
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (element === "password") {
            await updateUserPassword(user_id, edit);
            setEdit("");
            // Router.reload();
            return;
        } else if (element === "email") {
            // await updateUserEmail(user_id, edit);
            setEdit("");
            // Router.reload();
            return;
        } else {
            console.log('handleSubmit-not password');
            await updateFirestore(user_id, element, edit);
            setEdit("");
            Router.reload();
        }

    };

    return (
        <Popup
        trigger={
            <span className={styles.rowContainer}>
                <h3 className={styles.rowInfo}>{title}</h3>
                <h3 className={styles.rowInfo}>{content}</h3>
                <IoIosAddCircleOutline />
            </span>
        }
        modal
        nested
      >
        {/* @ts-ignore */ }
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"><h3>{popupTitle}</h3></div>
            <div className="content">
            <h4>{toChange}</h4>
            <form id="updateSetting" onSubmit={(e) => {
                handleSubmit(e);
                close();
            }}>
                { element === "full_name" ? fullNameInput.input : null}
                { element === "userId" ? usernameInput.input : null}
                { element === "date_of_birth" ? dateOfBirth.input : null}
                { element === "usersAddress" ? addressInput.input : null}
                { element === "billing_plan" ? billingPlan.input : null}
                { element === "email" ? emailInput.input : null}
                { element === "phone_number" ? phoneInput.input : null}
                { element === "password" ? passwordInput.input : null}
                <button id="submit" value="submit" type="submit">Submit</button>
            </form>
            </div>
            <div className="actions">
                <button
                className="button"
                onClick={() => {
                  console.log('modal closed ');
                  close();
                }}
                >
                Exit
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
};

export default EditAccountSettingPopupRowV;


// --------------------------------------------------
