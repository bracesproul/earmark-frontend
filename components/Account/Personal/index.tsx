/* eslint-disable */
import EditAccountSettingPopupRow from '../EditAccountSettingPopupRow'
import EditAccountSettingPopupColumn from '../EditAccountSettingPopupColumn'
import styles from '../../../styles/Account/Account.module.css';

const Personal = ({ data, uid }) => {
    const usersAddress = [
        data.address_street,
        `${data.address_city}, ${data.address_state}`,
        data.address_zip
    ]
    return (
        <div className={styles.accountDivContainer}>
        <h1 className={styles.title}>Personal</h1>
        <EditAccountSettingPopupRow 
        element="full_name" 
        user_id={uid} 
        title="Full name:" 
        content={data.full_name} 
        />

        <EditAccountSettingPopupRow 
        element="userId" 
        user_id={uid} 
        title="Username:" 
        content={data.userId} 
        />
        
        <EditAccountSettingPopupRow 
        element="date_of_birth" 
        user_id={uid} 
        title="Date of birth:" 
        content={data.date_of_birth} 
        />

        <EditAccountSettingPopupColumn 
        element="usersAddress" 
        user_id={uid} 
        title="Address:" 
        content={usersAddress}
        />
    </div>
    )
}

export default Personal;