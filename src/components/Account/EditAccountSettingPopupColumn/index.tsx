/* eslint-disable */
import React, {
    useState
} from 'react';

import Popup from 'reactjs-popup';
import { IoIosAddCircleOutline } from 'react-icons/io'

import styles from '../../../../styles/Account/Account.module.css';
import 'reactjs-popup/dist/index.css';

import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    setDoc 
} from "firebase/firestore";

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


const updateFirestore = async (user_id, element, edit) => {
    const docRef = doc(db, "users", user_id);
    const docData = {
        [element]: edit,
    };
    await setDoc(docRef, docData, { merge: true });
}

const EditAccountSettingPopupColumn = ({ element, user_id, title, content }) => {
    return (
        <>
        <Popup
        trigger={
            <span className={styles.columnContainer}>
                <span className={styles.iconContainer}>
                <h3 className={styles.rowInfo}>{title}</h3>
                <IoIosAddCircleOutline />
                </span>
                { content.map((item, index) => <p key={index} className={styles.pInfo}>{item}</p> )}
            </span>
        }
        modal
        nested
        >
        {/* @ts-ignore */ }
        {close => {
            return (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Modal Title </div>
                    <div className="content">
                        {' '}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                        Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                        delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                        commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                        explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                    </div>
                    <div className="actions">
                        <Popup
                        trigger={<button className="button"> Trigger </button>}
                        position="top center"
                        nested
                        >
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                            magni omnis delectus nemo, maxime molestiae dolorem numquam
                            mollitia, voluptate ea, accusamus excepturi deleniti ratione
                            sapiente! Laudantium, aperiam doloribus. Odit, aut.
                        </span>
                        </Popup>
                        <button
                        className="button"
                        onClick={() => {
                            console.log('modal closed ');
                            close();
                        }}
                        >
                        Close
                        </button>
                    </div>
                </div>
            )

        }}
        </Popup>
        </>
    )
};

export default EditAccountSettingPopupColumn;