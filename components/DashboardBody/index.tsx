/* eslint-disable */
import React, { 
    useState,
    useEffect,
} from 'react';
import { useRouter } from 'next/router';

import DatagridTransactions from '../DatagridTransactions';
import DatagridAccounts from '../DatagridAccounts'

const DashboardBody = ({ transactionData, accountData }) => {
    const router = useRouter();
    const [path, setPath] = useState(router.query.transactions as string);
    const [dashLocation, setDashLocation] = useState("transactions")

    useEffect(() => {
        if (router.query.transactions) {
            setDashLocation("transactions")
            let pathBefore = router.query.transactions as string;
            pathBefore = pathBefore.split("?")[0]
            setPath(pathBefore.split("_").join(" "));
        } else if (router.query.accounts === "" ) {
            setDashLocation("accounts")
        } else if (router.query.investments === "") {
            setDashLocation("investments")
        } else if (router.query.transfers === "") {
            setDashLocation("transfers")
        } else {
            setDashLocation("transactions")
        }
        if (!router.query.transactions) {
            setPath("");
            return;
        }
    }, [router.query]);

    return (
        <>
            { dashLocation === "transactions" ? <DatagridTransactions data={transactionData} identifier={path} /> : null}
            { dashLocation === "accounts" ? <DatagridAccounts data={accountData} /> : null}
        </>
        
    )
}

export default DashboardBody;