/* eslint-disable */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

// Paramater ordering: user_id, phone_number?, email?, first_name?, last_name?, account_id?, dob?, street?, city?, state?, zip?, username?, setup?
const updateFirestoreUser = async (user_id, phone_number, email, first_name, last_name, account_id, dob, street, city, state, zip, username, setup) => {
    const docRef = doc(db, "users", user_id);
    const docData = {
        phone_number: phone_number,
        email: email,
        first_name: first_name,
        last_name: last_name,
        full_name: `${first_name} ${last_name}`,
        account_id: account_id,
        date_of_birth: dob,
        address_street: street,
        address_city: city,
        address_state: state,
        address_zip: zip,
        userId: username,
        setup: setup,
    }
    await setDoc(docRef, docData, { merge: true });
}

export default updateFirestoreUser;