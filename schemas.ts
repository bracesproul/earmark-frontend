/* eslint-disable */
const transactionData = [
    { id: "ejradyRl9Mt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: "McDonald's", col2: '2021-05-07', col3: "12.01", col4: "Food and Drink" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Apple', col2: "2021-06-01", col3: "2,199.99", col4: "Electronics" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Safeway', col2: "2021-02-08", col3: "19.88", col4: "Grocries" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Oori', col2: "2021-08-22", col3: "8.75", col4: "Food and Drink" },
    { id: "ejradyRl9Mkfdow1fZDnvx4GwKi7wpx7E", col1: 'Target', col2: "2021-01-29", col3: "38.98", col4: "Shopping" },
    { id: "ejKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Home Depot', col2: "2021-12-31", col3: "133.22", col4: "Home Goods" },
];

const accountData_datagrid = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings" },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment" },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment" },
];

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

const accountData_viewAccount = [
    {account: {
        account_id: "acc_id_1",
        first_name: "John",
        last_name: "Doe",
        date_of_birth: "01/01/2000",
        address_street: "123 Main St",
        address_city: "Anytown",
        address_state: "CA",
        address_zip: "12345",
        phone_number: "(123)456-7890",
        email: "admin@earmark.com",
        billing_info: {
            billing_account_name: "Main Account",
            billing_plan: "Basic $14/month",
            billing_id: "billing_id_1",
            first_name: "John",
            last_name: "Doe",
            card_last_four: "1234",
            card_type: "Visa",
            card_exp_date: "01/20",
            billing_address: {
                address_street: "123 Main St",
                address_city: "Anytown",
                address_state: "CA",
                address_zip: "12345",
            }
        }
    }}
]

// transactions for datagrid on dashboard
// components\DataVisuals\Datagrid
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

// accounts list inside datagrid 
// components\DatagridAccounts
const rows = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking", col4: "9900009606", col5: "011401533" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings", col4: "4521459658", col5: "114586254"  },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment", col4: "4785123658", col5: "411123589"  },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment", col4: "9658741256", col5: "125563288"  },
  ];

    const columns = [
      { field: 'col1', headerName: 'Name', width: 150 },
      { field: 'col2', headerName: 'Balance', width: 150 },
      { field: 'col3', headerName: 'Type', width: 150 },
      { field: 'col4', headerName: 'Account Number', width: 150 },
      { field: 'col5', headerName: 'Routing Number', width: 150 },
    ];

// account info for sidebar accounts
// components\Sidenav
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










// get rid of error
export {}