/* eslint-disable */
import React, { 
    useState,
    useEffect,
} from 'react';
import { Paper,
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Skeleton,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import moment from 'moment';

function createData(
    name: string,
    totalSpent: number,
    totalTransactions: number,
    category: string,
) {
    return { name, totalSpent, totalTransactions, category };
}

const TopMerchants = (props) => {
    const [dateSelection, setDateSelection] = useState('7 Days');
    const [topMerchants, setTopMerchants] = useState([]);
    const [startDate, setStartDate] = useState('2022-04-28');
    const [endDate, setEndDate] = useState('2022-06-05');
    const [reCallData, setReCallData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                params: {
                    user_id: props.cookie,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'topMerchants',
                    merchantsStartDate: startDate,
                    merchantsEndDate: endDate,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            }
            const response = await axios(config)
            console.log(response.data)
            setTopMerchants(response.data.topMerchants);
            setLoading(false)
        }
        fetchData()
    }, [startDate])

    const handleSelectChange = (event: SelectChangeEvent) => {
        if (event.target.value === '7 Days') {
            let startDate = moment();
            let endDate = moment();
            setStartDate(startDate.subtract(7, 'days').format('YYYY-MM-DD'));
            setEndDate(endDate.format('YYYY-MM-DD'));
            setLoading(true);
        } else if (event.target.value === '2 Weeks') {
            let startDate = moment();
            let endDate = moment();
            setStartDate(startDate.subtract(14, 'days').format('YYYY-MM-DD'));
            setEndDate(endDate.format('YYYY-MM-DD'));
            setLoading(true);
        } else if (event.target.value === '30 Days') {
            let startDate = moment();
            let endDate = moment();
            setStartDate(startDate.subtract(30, 'days').format('YYYY-MM-DD'));
            setEndDate(endDate.format('YYYY-MM-DD'));
            setLoading(true);
        } else if (event.target.value === '6 Months') {
            let startDate = moment();
            let endDate = moment();
            setStartDate(startDate.subtract(6, 'months').format('YYYY-MM-DD'));
            setEndDate(endDate.format('YYYY-MM-DD'));
            setLoading(true);
        }
        setDateSelection(event.target.value as string);
    }


    const rows = [
        createData('Uber', 121, 6, 'Transportation'),
        createData('Gordos', 338, 9, 'Food'),
        createData('United Airlines', 829, 1, 'Travel'),
        createData('PG&E', 405, 3, 'Utilities'),
        createData('Sliver Pizza', 693, 12, 'Food'),
    ];

    const spendingTimeframe = {
        '7 Days': 'Most frequent merchants used in the last 7 days',
        '2 Weeks': 'Most frequent merchants used in the last 2 weeks',
        '30 Days': 'Most frequent merchants used in the last month',
        '6 Months': 'Most frequent merchants used in the last 6 months',
        'Custom': 'Custom date range for top merchants'
    }

    const select = (
        <FormControl sx={{ minWidth: '200px'}}>
        <InputLabel id="select-date-label">Time Period</InputLabel>
        <Select
            labelId="select-date-label"
            id="select-date"
            value={dateSelection}
            label="Time Period"
            onChange={handleSelectChange}
        >
            <MenuItem value={'7 Days'}>7 Days</MenuItem>
            <MenuItem value={'2 Weeks'}>2 Weeks</MenuItem>
            <MenuItem value={'30 Days'}>30 Days</MenuItem>
            <MenuItem value={'6 Months'}>6 Months</MenuItem>
            <MenuItem value={'Custom'}>Custom</MenuItem>
        </Select>
        </FormControl>
    )

    const skeleton = (
        <>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        </>
      )

    function BasicTable() {

        return (
            <>
            {!loading ? (
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Merchant</TableCell>
                    <TableCell align="left">Total Spent&nbsp;($)</TableCell>
                    <TableCell align="left">Total Transactions</TableCell>
                    <TableCell align="left">Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topMerchants.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="left">${row.totalSpent}</TableCell>
                        <TableCell align="left">{row.totalTransactions}</TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            ) : skeleton}
            </>
        );
    }


    const card = (
        <>
        <CardContent>
        <Typography variant="h5" component="div">
            Top Merchants
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {spendingTimeframe[dateSelection]}
        </Typography>
        <CardActions>
            {select}
        </CardActions>
        <BasicTable />
        </CardContent>
    </>
    )

    return (
        <Box sx={{ padding: '30px', minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}

export default TopMerchants;