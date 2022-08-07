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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from '../../../lib/hooks/useBackgroundFetch';
  
const TotalSpending = (props) => {
  const callApi = useBackgroundFetch();
  const auth = useAuth();
  const [totalSpending, setTotalSpending] = useState([]);
  const [fatalError, setFatalError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => !mounted ? setMounted(true) : null, [mounted]);

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

  console.log(totalSpending)

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
          <Typography sx={{ fontSize: '18px' }} variant="h6" component="div">
            {spending.timeFrame}
          </Typography>
          <Grid container direction='row' alignItems='center' key={spending.timeFrame}>
            <Grid item>
              <Typography variant="body1" component="div">
                  {spending.text} - ${spending.amount}
              </Typography>
            </Grid>
            <Grid item alignItems='right'>
                { spending.change === 'more' && <ArrowCircleUpIcon color='secondary' /> }
                { spending.change === 'less' && <ArrowCircleDownIcon color='primary' /> }
                { spending.change === 'zero_spending' && <RemoveCircleOutlineIcon color='primary' />  }
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
        <Box sx={{ padding: '30px', margin: 'auto' }}>
          <Card
              sx={{
                  width: {sm: '95%', md: 'none'},
                  minWidth: {sm: 'none', md: 350},
                  maxWidth: {sm: 'none', md: 550},
                  minHeight: 350,
              }}
              variant="outlined"
          >
            {card}
          </Card>
        </Box>
    );
}

export default TotalSpending;