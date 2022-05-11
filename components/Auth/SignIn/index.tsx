/* eslint-disable */

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import styled from "styled-components"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/router';

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

const StyledLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const auth = getAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setEmail("");
                setPassword("");
                router.push('/account/dashboard');
            });
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div>
            <h2>Sign in</h2>
            <form id="signIn" onSubmit={e => handleSignIn(e)}>
                <label>Email</label>
                <input
                    id="current-email"
                    name="current-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="current-email"
                    required
                />
                <br />
                <label>Password</label>
                <input
                    id="current-password"
                    name="current-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />
                <br />
                <button type="submit" id="submitSignIn">Sign In</button>
            </form>
            <p>Don't have an account? Click <Link href="/auth/signUp">
                    <StyledLink>here</StyledLink>
                </Link> to sign up.</p>
        </div>
    )
}

export default SignIn;