/* eslint-disable */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import styled from 'styled-components';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import uniqid from 'uniqid';

const StyledLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`

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

const updateFirestore = async (user_id, phone_number, email, first_name, last_name) => {
    const docRef = doc(db, "users", user_id);
    const docData = {
        phone_number: phone_number,
        email: email,
        first_name: first_name,
        last_name: last_name,
        full_name: `${first_name} ${last_name}`,
        account_id: uniqid(),
    }
    await setDoc(docRef, docData);
}

const SignUp = () => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const router = useRouter();

    const handleSubmitCreateAccount = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateFirestore(userCredential.user.uid, phoneNumber, email, firstName, lastName);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhoneNumber("");
                setPassword("");
                setFirstName("");
                setLastName("");
                router.push('/account');
            })
        } catch (error) {
            console.log(error);
        }
    }

    const checkPasswords = (e) => {
        if (password === e.target.value) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }


    return (
        <div>
            <h2>Create an account</h2>
            <form id="createAccount" onSubmit={e => handleSubmitCreateAccount(e)}>
                <label>First Name</label>
                <input
                    id="new-first-name"
                    name="new-name"
                    type="name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                />
                <br />
                <label>Last Name</label>
                <input
                    id="new-last-name"
                    name="new-name"
                    type="name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    required
                />
                <br />
                <label>Email</label>
                <input
                    id="new-email"
                    name="new-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />
                <br />
                <label>Phone Number</label>
                <input
                    id="new-phone"
                    name="new-phone"
                    type="tel"
                    placeholder="Phone Number"
                    pattern="[0-9]{10}" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="phone"
                    required
                />
                <br />
                <label>Password</label>
                <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />
                <br />
                <label>Confirm Password</label>
                <input
                    id="new-password-confirm"
                    name="new-password-confirm"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        checkPasswords(e)
                    }}
                    autoComplete="new-password"
                    required
                />
                <br />
                <button disabled={disabled} type="submit" id="submitCreateAccount">Create Account</button>
            </form>
            <p>Have an account? Click <Link href="/auth/signIn">
                    <StyledLink>here</StyledLink>
                </Link> to sign in.</p>
        </div>
    )
}

export default SignUp;