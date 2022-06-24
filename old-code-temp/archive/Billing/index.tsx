/* eslint-disable */
import React, {
    useState,
} from 'react';

import useCollapse from 'react-collapsed'
import { IoIosArrowDown, 
    IoIosArrowUp
} from 'react-icons/io'

import EditAccountSettingPopupRow from '../EditAccountSettingPopupRow'
import EditAccountSettingPopupColumn from '../EditAccountSettingPopupColumn'
import NoBillingAccount from '../NoBillingAccount'

import styles from '../../../../styles/Account/Account.module.css';

const Billing = ({ billing_info, uid }) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    if (!billing_info) return <NoBillingAccount />

    const cardInfo = [
        billing_info.card_type, 
        `${billing_info.first_name} ${billing_info.last_name}`, 
        `**** **** **** ${billing_info.card_last_four}`,
        billing_info.card_exp_date
    ]
    const billingHistory = [
        '01/20 | $12',
        '02/20 | $12',
        '03/20 | $12',
        '04/20 | $12',
        '05/20 | $12',
        '06/20 | $12'
    ]
    const billingAddress = [
        billing_info.billing_address.address_street,
        `${billing_info.billing_address.address_city}, ${billing_info.billing_address.address_state}`,
        billing_info.billing_address.address_zip
    ]

    return (
        <>
        <div className={styles.accountDivContainer}>
            <h1 className={styles.title}>Billing</h1>
            <span className={styles.billingAccountContainer}>
                <h3 className={styles.rowInfo}>Billing Account(s):</h3>
                <span className={styles.billingAccountDropdown} {...getToggleProps({ onClick: () => setExpanded((prevExpanded) => !prevExpanded) })}>
                    <h4 className={styles.accountInfo}>Main Account</h4>
                    {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
                <section {...getCollapseProps()}>
                    <EditAccountSettingPopupRow 
                    element="billing_plan" 
                    user_id={uid} 
                    title="Billing plan:" 
                    content={billing_info.billing_plan} 
                    />

                    <EditAccountSettingPopupColumn 
                    element="billing_card" 
                    user_id={uid} 
                    title="Card:" 
                    content={cardInfo} 
                    />

                    <EditAccountSettingPopupColumn 
                    element="billing_address" 
                    user_id={uid} 
                    title="Billing Address:" 
                    content={billingAddress} 
                    />

                    <EditAccountSettingPopupColumn 
                    element="billing_history" 
                    user_id={uid} 
                    title="Billing History:" 
                    content={billingHistory}
                    />
                </section>
            </span>
        </div>
        
        </>
    )
};

export default Billing;