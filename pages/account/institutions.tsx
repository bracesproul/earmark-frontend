/* eslint-disable */
import DatagridAccounts from '../../components/DatagridAccounts';
import SideNav from '../../components/Sidenav';

const accountData = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment" },
];

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

export default function Home() {
    return (
        <div className="institutions-container">
            <div className="sideNav-container">
            <SideNav accounts={accounts} />
            </div>
            <div className="institutions-datagrid">
            <DatagridAccounts data={accountData} />
            </div>
        </div>
    )
};