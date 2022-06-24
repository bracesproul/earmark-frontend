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

// in backend under <updateAccountElement>
const updateUserAccount = async (user_id, element, edit) => {
    const docRef = doc(db, "users", user_id);
    const docData = {
        [element]: edit,
    };
    await setDoc(docRef, docData, { merge: true });
}

export default updateUserAccount;