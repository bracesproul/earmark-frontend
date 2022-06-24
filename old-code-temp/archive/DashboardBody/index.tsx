/* eslint-disable */
import React, { 
    useState,
    useEffect,
} from 'react';
import { useRouter } from 'next/router';

import DatagridTransactions from '../../../src/components/DatagridTransactions';
import DatagridAccounts from '../../../src/components/DatagridAccounts'
import Datagrid from '../DataVisuals/Datagrid';
import ReBarChart from '../DataVisuals/ReBarChart';
import RePieChart from '../DataVisuals/RePieChart';
import VisualizeData from '../DataVisuals/Charts';

// TODO:
// Get all transactions based on user account
// Get requested account based off of user_id && 

const gridData = {
    rows: [
        { id: "ejradyRl9Mt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: "McDonald's", col2: '2021-05-07', col3: "12.01", col4: "Food and Drink" },
        { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Apple', col2: "2021-06-01", col3: "2,199.99", col4: "Electronics" },
        { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Safeway', col2: "2021-02-08", col3: "19.88", col4: "Grocries" },
        { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Oori', col2: "2021-08-22", col3: "8.75", col4: "Food and Drink" },
        { id: "ejradyRl9Mkfdow1fZDnvx4GwKi7wpx7E", col1: 'Target', col2: "2021-01-29", col3: "38.98", col4: "Shopping" },
        { id: "ejKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Home Depot', col2: "2021-12-31", col3: "133.22", col4: "Home Goods" },
    ],
    columns: [
        { field: 'col1', headerName: 'Name', width: 150 },
        { field: 'col2', headerName: 'Date', width: 150 },
        { field: 'col3', headerName: 'Amount', width: 150 },
        { field: 'col4', headerName: 'Category', width: 150 },
    ]
}

const TREEMAP_DATA = [
	{
		name: 'axis',
		children: [
			{ name: 'January', size: 100000, fill: "black" },
			{ name: 'Febuary', size: 100000, fill: "Red" },
			{ name: 'March', size: 100000, fill: "Orange" },
			{ name: 'April', size: 100000, fill: "Yellow" },
			{ name: 'May', size: 100000, fill: "Green" },
      { name: 'June', size: 100000, fill: "Blue" },
			{ name: 'July', size: 100000, fill: "Indigo" },
			{ name: 'August', size: 100000, fill: "Violet" },
			{ name: 'September', size: 100000, fill: "grey" },
			{ name: 'October', size: 100000, fill: "pink" },
			{ name: 'November', size: 100000, fill: "purple" },
			{ name: 'December', size: 100000, fill: "brown" },
		],
	},
];

// random number generator 1-50
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BAR_CHART = [
    { name: 'January', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'February', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'March', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'April', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'May', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'June', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'July', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'August', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'September', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'October', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'November', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'December', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
];

const PIE_DATA = [
    { name: "Food", value: randomNumber(200, 400), fill: "purple" },
    { name: "Transportation", value: randomNumber(25, 125), fill: "blue" },
    { name: "Utilities", value: randomNumber(75, 200), fill: "red" },
    { name: "Leasure", value: randomNumber(1, 500), fill: "green" },
];

const DashboardBody = ({ transactionData, accountData, bar_chart, tree_map, pie_chart }) => {
    const router = useRouter();
    const [path, setPath] = useState(router.query.transaction);
    const [dashLocation, setDashLocation] = useState("transactions")

    useEffect(() => {
        if (router.query.transactions) {
            setDashLocation("transactions")
            let pathBefore = router.query.transactions;
            /* @ts-ignore */
            pathBefore = pathBefore.split("?")[0]
            /* @ts-ignore */
            setPath(pathBefore.split("_").join(" "));
        } else if (router.query.accounts === "" ) {
            setDashLocation("accounts")
        } else if (router.query.investments === "") {
            setDashLocation("investments")
        } else if (router.query.transfers === "") {
            setDashLocation("transfers")
        } else if (router.query.transfers === "visualize-data") {
            setDashLocation("visualize-data")
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
            { dashLocation === "transactions" ? <Transactions gridData={gridData} barChartData={BAR_CHART} account={path} /> : null}
            { dashLocation === "accounts" ? <DatagridAccounts data={accountData} /> : null}
            { dashLocation === "visualize-data" ? <VisualizeData bar_chart={bar_chart} tree_map={tree_map} pie_chart={pie_chart} /> : null}
        </>
        
    )
}

const Transactions = ({ gridData, barChartData, account }) => {
    return (
        <>
        <div className="data-container">
            <Datagrid gridData={gridData} account={account} />
            <ReBarChart data={barChartData} />
        </div>
        </>

    )
}

export default DashboardBody;