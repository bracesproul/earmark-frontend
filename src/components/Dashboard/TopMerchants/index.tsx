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
    const [startDate, setStartDate] = useState(moment().subtract(7, 'days').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
    const [loading, setLoading] = useState(true);
    const [reCallTimeFrame, setReCallTimeFrame] = useState('7days')

    const fetchData = async () => {
        console.log('fetch data running');
        try {
            const currentTime = Date.now();
            const expTime = currentTime + 86400000;
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
            const { data } = await axios(config)
            console.log('DATA RESPONSE TOP MERCHANTS', data);
            setTopMerchants(data.topMerchants);
            localStorage.setItem(`topMerchantsCachedData${reCallTimeFrame}`, JSON.stringify(data.topMerchants));
            localStorage.setItem(`topMerchantsCacheExpTime${reCallTimeFrame}`, expTime.toString());
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const cacheData = (reCallType) => {
        if (typeof window == "undefined") return;
        const currentTime = Date.now();
        const cacheExpTime = parseInt(localStorage.getItem(`topMerchantsCacheExpTime${reCallType}`));
        const cachedData = JSON.parse(localStorage.getItem(`topMerchantsCachedData${reCallType}`));
        if (!cacheExpTime || !cachedData) {
            fetchData();
        } else if (cacheExpTime < currentTime) {
            fetchData();
        } else if (cacheExpTime > currentTime) {
            setTopMerchants(cachedData);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window == "undefined") return;
        cacheData(reCallTimeFrame);
    }, [startDate])

    const handleSelectChange = (event: SelectChangeEvent) => {
        if (event.target.value === '7 Days') {
            let startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
            setStartDate(startDate);
            setReCallTimeFrame('7days');
            setLoading(true);
        } else if (event.target.value === '2 Weeks') {
            let startDate = moment().subtract(14, 'days').format('YYYY-MM-DD');
            setStartDate(startDate);
            setReCallTimeFrame('2weeks');
            setLoading(true);
        } else if (event.target.value === '30 Days') {
            let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
            setStartDate(startDate);
            setReCallTimeFrame('30days');
            setLoading(true);
        } else if (event.target.value === '6 Months') {
            let startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
            setStartDate(startDate);
            setReCallTimeFrame('6mo');
            setLoading(true);
        }
        setDateSelection(event.target.value as string);
    }

    const spendingTimeframe = {
        '7 Days': 'Most frequent merchants used in the last 7 days',
        '2 Weeks': 'Most frequent merchants used in the last 2 weeks',
        '30 Days': 'Most frequent merchants used in the last month',
        '6 Months': 'Most frequent merchants used in the last 6 months',
        'Custom': 'Custom date range for top merchants'
    }

    const select = (
        <FormControl sx={{ minWidth: '200px'}}>
        <InputLabel id="select-date-label" sx={{ fontWeight: 'bold'}}>Time Period</InputLabel>
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
        const [rowColor, setRowColor] = useState([]);

        useEffect(() => {
            topMerchants.forEach((row, index) => {
            if (row.totalSpent < 0) {
              setRowColor(prevState => [...prevState, {[row.id]: 'bold'}])
            } else {
              setRowColor(prevState => [...prevState, {[row.id]: 'normal'}])
            }
        });
        }, [])

        const checkTransactionAmount = (row: any) => {
            let totalSpent: any = row.totalSpent;
            if (Math.sign(totalSpent) === -1) {
              const amountString = totalSpent.toString();
              totalSpent = `-$${amountString.split('-')[1]}`
              return totalSpent;
            } else {
              totalSpent = `$${totalSpent}`
              return totalSpent;
            }
          };
        return (
            <>
            {!loading ? (
                <TableContainer component={Paper} sx={{ minWidth: '50%' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 'bold'}} align="left">Merchant</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}} align="left">Total Spent&nbsp;($)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}} align="left">Total Transactions</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}} align="left">Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topMerchants.map((row) => {
                        let bgColor;
                        rowColor.forEach((color) => {
                            const colorKey = Object.keys(color)[0];
                            if (colorKey === row.id) {
                                bgColor = color[row.id];
                            }
                        })
                        return (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ fontWeight: `${bgColor}` }}  component="th" scope="row">
                                {row.name}
                                </TableCell>
                                <TableCell sx={{ fontWeight: `${bgColor}` }}  align="left">{checkTransactionAmount(row)}</TableCell>
                                <TableCell sx={{ fontWeight: `${bgColor}` }}  align="left">{row.totalTransactions}</TableCell>
                                <TableCell sx={{ fontWeight: `${bgColor}` }}  align="left">{row.category}</TableCell>
                            </TableRow>
                            )
                    })}
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
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
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
        <>
        <Box sx={{ padding: '30px', flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <Card variant="outlined">{card}</Card>
        </Box>
        </>
    );
}

export default TopMerchants;