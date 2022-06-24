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

const SpendingOverview = (props) => {
  const [dateSelection, setDateSelection] = useState('24 Hours');
  const [spendingOverview, setSpendingOverview] = useState([]);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(true);
  const [reCallTimeFrame, setReCallTimeFrame] = useState('24hrs')

  const fetchData = async () => {
    try {
      const currentTime = Date.now();
      const expTime = currentTime + 86400000;
      const config = {
        params: {
            user_id: props.cookie,
            startDate: '2022-02-28',
            endDate: '2022-06-05',
            spendingStartDate: startDate,
            spendingEndDate: moment().format('YYYY-MM-DD'),
            queryType: 'spendingOverview',
        },
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/api/dashboard',
    }
    const response = await axios(config)
    setSpendingOverview(response.data.spendingOverview)
    localStorage.setItem(`spendingOverviewCachedData${reCallTimeFrame}`, JSON.stringify(response.data.spendingOverview));
    localStorage.setItem(`spendingOverviewCacheExpTime${reCallTimeFrame}`, expTime.toString());
    setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const cacheData = (reCallType) => {
    if (typeof window == "undefined") return;
    const currentTime = Date.now();
    const cacheExpTime = parseInt(localStorage.getItem(`spendingOverviewCacheExpTime${reCallType}`));
    const cachedData = JSON.parse(localStorage.getItem(`spendingOverviewCachedData${reCallType}`));
    if (!cacheExpTime || !cachedData) {
        fetchData();
    } else if (cacheExpTime < currentTime) {
        fetchData();
    } else if (cacheExpTime > currentTime) {
        setSpendingOverview(cachedData);
        setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window == "undefined") return;
    cacheData(reCallTimeFrame);
  }, [startDate])

  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.value === '24 Hours') {
      setStartDate(moment().format('YYYY-MM-DD'));
      setReCallTimeFrame('24hrs')
      setLoading(true);
    } else if (event.target.value === '7 Days') {
      setStartDate(moment().subtract(7, 'days').format('YYYY-MM-DD'));
      setReCallTimeFrame('7days')
      setLoading(true);
    } else if (event.target.value === '2 Weeks') {
      setStartDate(moment().subtract(14, 'days').format('YYYY-MM-DD'));
      setReCallTimeFrame('2weeks')
      setLoading(true);
    } else if (event.target.value === '1 Month') {
      setStartDate(moment().subtract(1, 'months').format('YYYY-MM-DD'));
      setReCallTimeFrame('1mo')
      setLoading(true);
    }
    setDateSelection(event.target.value as string);
  }


  const spendingTimeframe = {
    '24 Hours': 'Showing spending from the last 24 Hours',
    '7 Days': 'Showing spending from the last 7 Days',
    '2 Weeks': 'Showing spending from the last 2 Weeks',
    '1 Month': 'Showing spending from the last month',
    'custom': 'Custom spending date range'
  }

  const select = (
    <FormControl sx={{ minWidth: '200px'}}>
      <InputLabel sx={{ fontWeight: 'bold'}} id="select-date-label">Time Period</InputLabel>
      <Select
        labelId="select-date-label"
        id="select-date"
        value={dateSelection}
        label="Time Period"
        onChange={handleSelectChange}
      >
        <MenuItem value={'24 Hours'}>24 Hours</MenuItem>
        <MenuItem value={'7 Days'}>7 Days</MenuItem>
        <MenuItem value={'2 Weeks'}>2 Weeks</MenuItem>
        <MenuItem value={'1 Month'}>1 Month</MenuItem>
        <MenuItem value={'custom'}>Custom</MenuItem>
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

  const noData = (
    <>
    <Typography variant="h6">No Data</Typography>
    </>
  )

  function BasicTable() {
    const [rowColor, setRowColor] = useState([]);

    useEffect(() => {
      spendingOverview.forEach((row, index) => {
        if (row.amount < 0) {
          setRowColor(prevState => [...prevState, {[row.id]: 'bold'}])
        } else {
          setRowColor(prevState => [...prevState, {[row.id]: 'normal'}])
        }
    });
    }, [])

    const checkTransactionAmount = (row: any) => {
      let totalSpent: any = row.amount;
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
      { !loading ? (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold'}} align="left">Merchant</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}} align="left">Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}} align="left">Amount&nbsp;($)</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}} align="left">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spendingOverview ? (
              spendingOverview.map((row, index) => {
                let bgColor;
                rowColor.forEach((color) => {
                  const colorKey = Object.keys(color)[0];
                  if (colorKey === row.id) {
                    bgColor = color[row.id];
                  }
                })
                  return (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{ fontWeight: `${bgColor}` }} component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ fontWeight: `${bgColor}` }} align="left">{row.date}</TableCell>
                      <TableCell sx={{ fontWeight: `${bgColor}` }} align="left">{checkTransactionAmount(row)}</TableCell>
                      <TableCell sx={{ fontWeight: `${bgColor}` }} align="left">{row.category}</TableCell>
                    </TableRow>
                  )
              })
            ) : <h1>No data</h1>}
          </TableBody>
        </Table>
      </TableContainer>
      ) : skeleton }
    </>
    );
  }
  
  
  const card = (
    <>
    <CardContent>
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
        Spending Overview
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

export default SpendingOverview;