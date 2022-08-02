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
  
  const Budgets = () => {
  
    const budgets = [
      {
        name: 'Food',
        amount: 100,
        color: '#FFA500',
        timeFrame: 'Weekly',
      },
      {
        name: 'Transportation',
        amount: 250,
        color: '#FFA500',
        timeFrame: 'Monthly',
      },
      {
        name: 'Utilities',
        amount: 300,
        color: '#FFA500',
        timeFrame: 'Monthly',
      },
      {
        name: 'Spending',
        amount: 500,
        color: '#FFA500',
        timeFrame: 'Monthly',
      },
      {
        name: 'Saving',
        amount: 1000,
        color: '#FFA500',
        timeFrame: 'Monthly',
      }
    ];
  
    const budget = (
      <Grid container spacing={2} sx={{ padding: '10px'}}>
        {budgets.map((budget, index) => (
          <Grid key={index} item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h6" component="div">
              {budget.name}
            </Typography>
            <Typography variant="body1" component="div">
              Goal: ${budget.amount} / {budget.timeFrame}
            </Typography>
          </Grid>
        ))}
  
      </Grid>
    )
  
    const card = (
      <>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
          Budgets
        </Typography>
        <Divider />
        {budget}
      </CardContent>
    </>
    )
    
    return (
        <Box sx={{ padding: '30px' }}>
          <Card
              sx={{
                minWidth: 600,
                minHeight: 300,
              }}
              variant="outlined"
          >
            {card}
          </Card>
        </Box>
    );
}

export default Budgets;