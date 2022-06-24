/* eslint-disable */
import React, { 
    useState,
    useEffect,
  } from 'react';
  import { Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Skeleton,
} from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import axios from 'axios';
import moment from 'moment'
  
const TotalSpending = (props) => {
  const [totalSpending, setTotalSpending] = useState([]);

  const fetchData = async () => {
    try {
      const endDate = moment().format('YYYY-MM-DD');
      const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      const currentTime = Date.now();
      const expTime = currentTime + 86400000;
      const config = {
        params: {
            user_id: props.cookie,
            startDate: startDate,
            endDate: endDate,
            queryType: 'totalSpending',
        },
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/api/dashboard',
        method: 'GET'
    }
    const response = await axios(config)
    setTotalSpending(response.data.totalSpending)
    localStorage.setItem(`totalSpendingCacheExpTime`, expTime.toString());
    localStorage.setItem(`totalSpendingCachedData`, JSON.stringify(response.data.totalSpending));
    } catch (error) {
      console.error(error);
    };
  };

  const cacheData = () => {
    if (typeof window == "undefined") return;
    console.log('TOTAL SPENDING CHECK CACHE RUNNING');
    const currentTime = Date.now();
    const cacheExpTime = parseInt(localStorage.getItem(`totalSpendingCacheExpTime`));
    const cachedData = JSON.parse(localStorage.getItem(`totalSpendingCachedData`));
    if (!cacheExpTime || !cachedData) {
        fetchData();
    } else if (cacheExpTime < currentTime) {
        fetchData();
    } else if (cacheExpTime > currentTime) {
        setTotalSpending(cachedData);
    }
  };

  useEffect(() => {
    cacheData()
  }, [])

  const skeleton = (
    <>
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    </>
  )
  
    const card = (
      <>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
          Total Spending
        </Typography>
        <Divider />
        <Grid>
      { totalSpending.length == 3 ? (
        <>
        {totalSpending.map((spending, index) => (
          <React.Fragment key={index}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              {spending.timeframe}
            </Typography>
            <Grid container direction='row' alignItems='center' key={spending.timeframe}>
              <Grid item>
                <Typography variant="body1" component="div">
                {`${spending.text} - $${spending.amount}`}
                </Typography>
              </Grid>
              <Grid item alignItems='right'>
                { spending.change === 'more' ? <ArrowCircleUpIcon color='secondary' /> : <ArrowCircleDownIcon color='primary' /> }
              </Grid>
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
        </>
      ) : skeleton}
        </Grid>
      </CardContent>
    </>
    )
    
    return (
        <Box sx={{ padding: '30px', minWidth: '500px', maxWidth: '600px' }}>
          <Card variant="outlined">{card}</Card>
        </Box>
    );
}

export default TotalSpending;