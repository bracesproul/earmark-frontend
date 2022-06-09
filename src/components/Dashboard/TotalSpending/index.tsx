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
  
const TotalSpending = (props) => {
  const [totalSpending, setTotalSpending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const config = {
            params: {
                user_id: props.cookie,
                startDate: '2022-02-28',
                endDate: '2022-06-05',
                queryType: 'totalSpending',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/dashboard',
        }
        const response = await axios(config)
        setTotalSpending(response.data.totalSpending)
    }
    fetchData()
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
        <Grid spacing={2}>
      { totalSpending.length == 3 ? (
        <>
        {totalSpending.map((spending) => (
          <React.Fragment key={spending.timeframe}>
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