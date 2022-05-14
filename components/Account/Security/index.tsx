/* eslint-disable */
import EditAccountSettingPopupRow from '../EditAccountSettingPopupRow'
import styles from '../../../styles/Account/Account.module.css';

const Security = ({ data, uid }) => {
    return (
        <div className={styles.accountDivContainer}>
            <h1 className={styles.title}>Security</h1>
            <EditAccountSettingPopupRow 
            element="userId" 
            user_id={uid} 
            title="User ID:" 
            content={data.userId} 
            />
            
            <EditAccountSettingPopupRow 
            element="email" 
            user_id={uid} 
            title="Email:" 
            content={data.email} 
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