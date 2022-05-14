/* eslint-disable */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoIosArrowForward } from 'react-icons/io'
import styles from '../../../styles/Account/Account.module.css';

const EditAccountSettingPopupRow = ({ element, user_id, title, content }) => {
    return (
        <>
        <Popup
        trigger={
            <span className={styles.rowContainer}>
                <h3 className={styles.rowInfo}>{title}</h3>
                <h3 className={styles.rowInfo}>{content}</h3>
                <IoIosArrowForward />
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
                        close modal
                        </button>
                    </div>
                </div>
            )

        }}
        </Popup>
        </>
    )
};

export default EditAccountSettingPopupRow;