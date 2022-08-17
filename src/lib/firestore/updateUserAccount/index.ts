/* eslint-disable */
import { app } from '../../firebaseConfig';
import { getFirestore, doc, setDoc } from "firebase/firestore";

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