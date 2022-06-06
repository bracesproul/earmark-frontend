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

const SpendingOverview = (props) => {
  const [dateSelection, setDateSelection] = useState('24 Hours');
  const [dataRows, setdataRows] = useState(null);
  const [spendingOverview, setSpendingOverview] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const config = {
            params: {
                user_id: props.cookie,
                startDate: '2022-02-28',
                endDate: '2022-06-05',
                queryType: 'spendingOverview',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/dashboard',
        }
        const response = await axios(config)
        console.log(response.data)
        setSpendingOverview(response.data.spendingOverview)
    }
    fetchData()
  }, [])

  const handleSelectChange = (event: SelectChangeEvent) => {
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
      <InputLabel id="select-date-label">Time Period</InputLabel>
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
    return (
      <>
      { spendingOverview.length >= 1 ? (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Merchant</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Amount&nbsp;($)</TableCell>
              <TableCell align="left">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spendingOverview.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">${row.amount}</TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                </TableRow>
              ))}

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
      <Typography variant="h5" component="div">
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