/* eslint-disable */
import EditAccountSettingPopupRow from '../EditAccountSettingPopupRow'
import styles from '../../../styles/Account/Account.module.css';
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';
const auth = getAuth();
console.log(auth.currentUser)

const Security = ({ data, uid }) => {

    return (
        <div className={styles.accountDivContainer}>
            <h1 className={styles.title}>Security</h1>
            <EditAccountSettingPopupRow 
            element="email" 
            user_id={uid} 
            title="Email:" 
            content={auth.currentUser.email} 
            />
            
            <EditAccountSettingPopupRow 
            element="password" 
            user_id={uid} 
            title="Password:" 
            content="********" 
            />
            
            <EditAccountSettingPopupRow 
            element="phone_number" 
            user_id={uid} 
            title="Phone Number:" 
            content={data.phone_number} 
            />
        </div>
    )
};

export default Security;