/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import { useRouter } from 'next/router';
import useCollapse from 'react-collapsed'

import { DataGrid, 
    GridRowsProp,
    GridColDef,
 } from '@mui/x-data-grid';

import SideNav from '../components/Sidenav';
import DashboardBody from '../components/DashboardBody';

// DATA FOR STATIC SITE, REPLACE WITH DYNAMIC FETCHED DATA LATER
const accounts = [
    {accounts: {
        account_id: "acc_id_1",
        name: "Bank of America",
        official_name: "Bank of America",
        pathname: "Bank_of_America",
        type: "depository",
        subtype: "checking",
    }},
    {accounts: {
        account_id: "acc_id_2",
        name: "Chase",
        official_name: "JP Morgan Chase",
        pathname: "Chase",
        type: "depository",
        subtype: "savings",
    }},
    {accounts: {
        account_id: "acc_id_3",
        name: "Fidelity",
        official_name: "Fidelity Investments",
        pathname: "Fidelity",
        type: "investment",
        subtype: "depository",
    }},
    {accounts: {
        account_id: "acc_id_4",
        name: "Plaid IRA",
        official_name: "Plaid IRA",
        pathname: "Plaid_IRA",
        type: "investment",
        subtype: "ira",
    }},
]

const transactionData = [
    { id: "ejradyRl9Mt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: "McDonald's", col2: '2021-05-07', col3: "12.01", col4: "Food and Drink" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Apple', col2: "2021-06-01", col3: "2,199.99", col4: "Electronics" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Safeway', col2: "2021-02-08", col3: "19.88", col4: "Grocries" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Oori', col2: "2021-08-22", col3: "8.75", col4: "Food and Drink" },
    { id: "ejradyRl9Mkfdow1fZDnvx4GwKi7wpx7E", col1: 'Target', col2: "2021-01-29", col3: "38.98", col4: "Shopping" },
    { id: "ejKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Home Depot', col2: "2021-12-31", col3: "133.22", col4: "Home Goods" },
];

const accountData = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment" },
];



export default function Home() {
    return (
        <div className="dashboard-container">
            <SideNav accounts={accounts} />
            <DashboardBody transactionData={transactionData} accountData={accountData} />
        </div>
    )
}

