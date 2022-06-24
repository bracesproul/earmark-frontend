/* eslint-disable */
import React, {
    useState
} from 'react';

import Popup from 'reactjs-popup';
import { IoIosAddCircleOutline } from 'react-icons/io'

import styles from '../../../../styles/Account/Account.module.css';
import 'reactjs-popup/dist/index.css';

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