/* eslint-disable */
import React, { 
    useState,
  } from 'react';
  import { Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
} from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
  
const TotalSpending = () => {
  
    const spending = [
      {
        timeframe: 'Today',
        change: 'more',
        amount: 38,
        text: 'Total spent today',
      },
      {
        timeframe: '7 Days',
        change: 'more',
        amount: 155,
        text: 'Total spent in the last 7 days',
      },
      {
        timeframe: '1 Month',
        change: 'less',
        amount: 632,
        text: 'Total spent in the last month',
      }
    ];
  
    const card = (
      <>
      <CardContent>
        <Typography variant="h5" component="div">
          Total Spending
        </Typography>
        <Divider />
        <Grid spacing={2}>
        {spending.map((spending) => (
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