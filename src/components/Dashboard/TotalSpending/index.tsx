/* eslint-disable */
import React, { 
    useState,
    useEffect,
} from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Skeleton,
} from '@mui/material';
import FatalErrorComponent from '../../FatalError';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from '../../../lib/hooks/useBackgroundFetch';
  
const TotalSpending = (props) => {
  const callApi = useBackgroundFetch();
  const auth = useAuth();
  const [totalSpending, setTotalSpending] = useState([]);
  const [fatalError, setFatalError] = useState(false);
  const [loading, setLoading] = useState(true);

/*  const fetchData = async () => {
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
      const { data } = await axios(config)
      if (data.totalSpending) {
        setTotalSpending(data.totalSpending)
        setLoading(false);
        localStorage.setItem(`totalSpendingCacheExpTime`, expTime.toString());
        localStorage.setItem(`totalSpendingCachedData`, JSON.stringify(data.totalSpending));
        return;
      } else {
        setLoading(false);
        setFatalError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setFatalError(true);
      console.error(error);
    }
  };

  const cacheData = () => {
    if (typeof window == "undefined") return;
    try {
      const currentTime = Date.now();
      const cacheExpTime = parseInt(localStorage.getItem(`totalSpendingCacheExpTime`));
      if (!cacheExpTime || cacheExpTime < currentTime) {
        fetchData();
      } else if (cacheExpTime > currentTime) {
        const cachedData = JSON.parse(localStorage.getItem(`totalSpendingCachedData`));
        setTotalSpending(cachedData);
        setLoading(false);
      }
    } catch (error) {
      setFatalError(true);
      setLoading(false);
      console.error('the below error occurred in `components/Dashboard/SpendingOverview` - line 67 - method: cachedData()')
      console.error(error)
    }
  };*/

  const fetchData = async (forceRefresh:boolean) => {
    const apiCall = await callApi.fetchTotalSpending(forceRefresh);
    if (apiCall.fatalError) {
      setFatalError(true);
      setLoading(false);
      return;
    }
    setTotalSpending(apiCall.totalSpending);
    setLoading(false);
  }

  useEffect(() => {
    if (typeof window == "undefined") return;
    if (!auth.user) return;
    fetchData(false)
  }, [auth.user])

  const handleForceRetry = () => {
    fetchData(true);
    setLoading(true);
    setFatalError(false);
  }

  const skeleton = (
    <>
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    </>
  )

  const totalSpendingComponent = (
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
  )

  const ContentToDisplay = () => {
    if (!loading && fatalError) {
      return <FatalErrorComponent handleForceRetry={handleForceRetry} />
    } else if (!loading && !fatalError) {
      return totalSpendingComponent
    } else if (!fatalError && loading) {
      return skeleton;
    }
  }
  
    const card = (
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
          Total Spending
        </Typography>
        <Divider />
        <Grid>
          <ContentToDisplay />
        </Grid>
      </CardContent>
    )
    
    return (
        <Box sx={{ padding: '30px', }}>
          <Card
              sx={{
                minWidth: 600,
                minHeight: 'fitContent'
              }}
              variant="outlined"
          >
            {card}
          </Card>
        </Box>
    );
}

export default TotalSpending;