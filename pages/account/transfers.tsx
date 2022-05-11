/* eslint-disable */
import SideNav from '../../components/Sidenav';

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
            <h1>Transfers</h1>
        </div>
    )
};