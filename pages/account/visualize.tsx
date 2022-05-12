/* eslint-disable */
import VisualizeData from "../../components/DataVisuals/Charts"
import SideNav from "../../components/Sidenav";
import Head from "next/head";

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

const BAR_CHART_DATA = [
  { name: 'January', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'February', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'March', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'April', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'May', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'June', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'July', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'August', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'September', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'October', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'November', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'December', food: 250, transportation: 300, utilities: 350, leasure: 400 },
];

const PIE_CHART_DATA = [
  { name: "Food", value: 100, fill: "purple" },
  { name: "Transportation", value: 200, fill: "blue" },
  { name: "Utilities", value: 300, fill: "red" },
  { name: "Leasure", value: 400, fill: "green" },
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
        <div className="">
        <Head>
        <title>Visualize Data</title>
        <meta name="description" content="Visualize data for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <div className="visualize-container">
                <div className="sideNav-container">
                <SideNav accounts={accounts} />
                </div>
                <div className="visualize">
                    <VisualizeData bar_chart={BAR_CHART_DATA} tree_map={TREEMAP_DATA} pie_chart={PIE_CHART_DATA} />
                </div>
            </div>
        </main>
        <footer></footer>
        </div>
    )
};