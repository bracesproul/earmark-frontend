/* eslint-disable */
import React, {
    useState,
    useEffect, useRef,
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
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from '../../../lib/hooks/useBackgroundFetch';
import FatalErrorComponent from "../../FatalError";
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import moment from 'moment';
import {bool} from "@inovua/reactdatagrid-community/filterTypes";

function createData(
    name: string,
    totalSpent: number,
    totalTransactions: number,
    category: string,
) {
    return { name, totalSpent, totalTransactions, category };
}

const TopMerchants = (props) => {
    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const [dateSelection, setDateSelection] = useState('7 Days');
    const [topMerchants, setTopMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fatalError, setFatalError] = useState(false);
    const topMerchants7days = useRef(null);
    const topMerchants2weeks = useRef(null);
    const topMerchants30days = useRef(null);
    const topMerchants6mo = useRef(null);


    const fetchData = async (forceRetry:boolean) => {
        const apiCall = await callApi.fetchTopMerchants(forceRetry);
        if (apiCall.fatalError) {
            setFatalError(apiCall.fatalError);
            setLoading(false);
            console.error('fatal error, inside spendingOverview component')
            return;
        }
        if (apiCall.topMerchants7daysRes[0].startDate) {
            setDateSelection('7 Days');
            setTopMerchants(apiCall.topMerchants7daysRes);
        }
        if (apiCall.topMerchants2weeksRes[0].startDate && !apiCall.topMerchants7daysRes[0].startDate) {
            setDateSelection('2 Weeks');
            setTopMerchants(apiCall.topMerchants2weeksRes);
        }
        if (apiCall.topMerchants30daysRes[0].startDate && !apiCall.topMerchants2weeksRes[0].startDate && !apiCall.topMerchants7daysRes[0].startDate) {
            setDateSelection('30 Days');
            setTopMerchants(apiCall.topMerchants30daysRes);
        }
        if (apiCall.topMerchants6moRes[0].startDate && !apiCall.topMerchants30daysRes[0].startDate && !apiCall.topMerchants2weeksRes[0].startDate && !apiCall.topMerchants7daysRes[0].startDate) {
            setDateSelection('6 Months');
            setTopMerchants(apiCall.topMerchants6moRes);
        }
        topMerchants7days.current = apiCall.topMerchants7daysRes
        topMerchants2weeks.current = apiCall.topMerchants2weeksRes
        topMerchants30days.current = apiCall.topMerchants30daysRes
        topMerchants6mo.current = apiCall.topMerchants6moRes
        setFatalError(apiCall.fatalError);
        setLoading(false);
    }


    useEffect(() => {
        if (typeof window == "undefined") return;
        if (!auth.user) return
        fetchData(false);
    }, [auth.user])

    const handleForceRetry = () => {
        setFatalError(false);
        setLoading(true);
        fetchData(true);
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        console.log('yer im runnin')
        if (event.target.value === '7 Days') {
            setTopMerchants(topMerchants7days.current);
        } else if (event.target.value === '2 Weeks') {
            setTopMerchants(topMerchants2weeks.current);
        } else if (event.target.value === '30 Days') {
            setTopMerchants(topMerchants30days.current);
        } else if (event.target.value === '6 Months') {
            setTopMerchants(topMerchants6mo.current);
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
        <FormControl sx={{ minWidth: {sm: 140, md: 200} }}>
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
                <Table sx={{ minWidth: {sm: 'none', md: 650}, width: {sm: '95%', md: 'none'} }} aria-label="simple table">
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

    const topMerchantsComponent = (
      <>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {spendingTimeframe[dateSelection]}
          </Typography>
          <CardActions>
              {select}
          </CardActions>
          <BasicTable />
      </>
    )

    const ContentToDisplay = () => {
        if (!loading && fatalError) {
            return <FatalErrorComponent handleForceRetry={handleForceRetry} />
        } else if (!loading && !fatalError) {
            return topMerchantsComponent
        } else if (!fatalError && loading) {
            return skeleton;
        }
    }


    const card = (
        <>
        <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
                Top Merchants
            </Typography>
            <ContentToDisplay />
        </CardContent>
    </>
    )

    return (
        <>
            <Box sx={{ padding: '30px', margin: 'auto' }}>
                <Card
                    sx={{
                        minWidth: {sm: 'none', md: 650},
                        width: {sm: '95%', md: 'none'},
                        height: 500,
                    }}
                    variant="outlined"
                >
                    {card}
                </Card>
            </Box>
        </>
    );
}

export default TopMerchants;