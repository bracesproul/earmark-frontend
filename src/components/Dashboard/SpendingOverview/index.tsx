/* eslint-disable */
import React, {
  useState,
  useEffect,
  useRef,
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
import FatalErrorComponent from "../../FatalError";
import { useBackgroundFetch } from "../../../lib/hooks/useBackgroundFetch";
import { SelectChangeEvent } from '@mui/material/Select';

const SpendingOverview = (props) => {
  const callApi = useBackgroundFetch();
  const auth = useAuth();
  const [dateSelection, setDateSelection] = useState('24 Hours');
  const [spendingOverview, setSpendingOverview] = useState([]);
  const [fatalError, setFatalError] = useState(false);
  const [loading, setLoading] = useState(true);
  const overview24hrs = useRef(null);
  const overview7days = useRef(null);
  const overview2weeks = useRef(null);
  const overview1mo = useRef(null);


  const fetchData = async (forceRetry:boolean) => {
    const apiCall = await callApi.fetchSpendingOverview(forceRetry)
    if (apiCall.fatalError) {
      setFatalError(apiCall.fatalError);
      setLoading(false);
      console.error('fatal error, inside spendingOverview component')
      return;
    }
    if (apiCall.spendingOverview24hrs[0].account_id) {
      console.log('24 hrs')
      setSpendingOverview(apiCall.spendingOverview24hrs);
      setDateSelection('24 Hours');
    }
    if (apiCall.spendingOverview7days[0].account_id && !apiCall.spendingOverview24hrs[0].account_id) {
      console.log('7 days')
      setSpendingOverview(apiCall.spendingOverview7days);
      setDateSelection('7 Days');
    }
    if (apiCall.spendingOverview2weeks[0].account_id && !apiCall.spendingOverview7days[0].account_id && !apiCall.spendingOverview24hrs[0].account_id) {
      console.log('2 weeks')
      setSpendingOverview(apiCall.spendingOverview2weeks);
      setDateSelection('2 Weeks');
    }
    if (apiCall.spendingOverview1mo[0].account_id && !apiCall.spendingOverview2weeks[0].account_id && !apiCall.spendingOverview7days[0].account_id && !apiCall.spendingOverview24hrs[0].account_id) {
      console.log('1 mo')
      setSpendingOverview(apiCall.spendingOverview1mo);
      setDateSelection('1 Month');
    } else if (!apiCall.spendingOverview1mo[0].account_id && !apiCall.spendingOverview2weeks[0].account_id && !apiCall.spendingOverview7days[0].account_id && !apiCall.spendingOverview24hrs[0].account_id) {
      console.log('else?')
      setLoading(false);
      setSpendingOverview([]);
    }
    overview24hrs.current = apiCall.spendingOverview24hrs;
    overview7days.current = apiCall.spendingOverview7days;
    overview2weeks.current = apiCall.spendingOverview2weeks;
    overview1mo.current = apiCall.spendingOverview1mo;
    setLoading(false);
    setFatalError(apiCall.fatalError);
  }

  const handleForceRetry = () => {
    fetchData(true);
  }

  useEffect(() => {
    if (typeof window == "undefined") return undefined;
    if (!auth.user) return undefined;
    fetchData(false);
  }, [auth.user]);


  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.value === '24 Hours') {
      setSpendingOverview(overview24hrs.current);
    } else if (event.target.value === '7 Days') {
      setSpendingOverview(overview7days.current);
    } else if (event.target.value === '2 Weeks') {
      setSpendingOverview(overview2weeks.current);
    } else if (event.target.value === '1 Month') {
      setSpendingOverview(overview1mo.current);
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
    <FormControl sx={{ minWidth: {sm: 140, md: 200} }}>
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
        <Table sx={{ minWidth: {sm: 'none', md: 650}, width: {sm: '100%', md: 'none'} }} aria-label="simple table">
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

  const spendingOverviewComponent = (
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
      return spendingOverviewComponent
    } else if (!fatalError && loading) {
      return skeleton;
    }
  }
  
  const card = (
    <CardContent>
      <Typography variant="h5" sx={{ fontWeight: 'bold'}}>
        Spending Overview
      </Typography>
      <ContentToDisplay />
    </CardContent>
  )
  
  return (
      <Box sx={{ padding: '30px', margin: 'auto' }}>
          <Card
              sx={{
                minWidth: {sm: 'none', md: 650},
                width: {sm: '100%', md: 'none'},
                height: 500,
                overflowY: 'scroll',
              }}
              variant="outlined"
          >
            {card}
          </Card>
      </Box>
  );
}

export default SpendingOverview;