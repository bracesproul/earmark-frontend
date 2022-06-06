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
    CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
  
const Goals = () => {
  
    const useStyles = makeStyles({
      goalTitle: {
        fontSize: '50px',
      }
    });
  
    const Progress = (props) => (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress color={props.color} variant="determinate" value={props.value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props.text)}%`}
        </Typography>
      </Box>
    </Box>
    )
  
    const goals = [
      {
        goal: 'Monthly Saving',
        goalId: 'vzeNDwK7KQsefsefseGRLEFXGK98D',
        goalAmount: 1000,
        goalCompleted: false,
        color: 'secondary',
        goalProgress: 665,
        goalProgressPercentage: 66.5,
        goalPercentageText: 66.5,
        goalKeyword: 'Saved',
      },
      {
        goal: 'Monthly Spending',
        goalId: 'vzeNDwK7KeeefsefseGRLEFXGK98D',
        goalAmount: 400,
        goalCompleted: false,
        color: 'success',
        goalProgress: 400,
        goalProgressPercentage: 100,
        goalPercentageText: 100,
        goalKeyword: 'Spent',
      },
      {
        goal: 'Weekly Spending',
        goalId: 'vzeNDwefeeseGRLEFXGK98D',
        goalAmount: 100,
        goalCompleted: false,
        color: 'error',
        goalProgress: 120,
        goalProgressPercentage: 100,
        goalKeyword: 'Spent',
        goalPercentageText: 120,
      },
    ]
  
    const newGoal = (
      <Grid container spacing={2} sx={{ padding: '10px'}}>
        {goals.map((goal, index) => (
          <Grid key={index} item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h6" component="div">
              {goal.goal}
            </Typography>
            <Typography variant="body1" component="div">
              Goal: ${goal.goalAmount}
              <br />
              {goal.goalKeyword} ${goal.goalProgress}
            </Typography>
            <Progress color={goal.color} value={goal.goalProgressPercentage} text={goal.goalPercentageText} />
          </Grid>
        ))}
  
      </Grid>
    )
  
    const card = (
      <>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
          Goals
        </Typography>
        <Divider />
        {newGoal}
      </CardContent>
    </>
    )
    
    return (
        <Box sx={{ padding: '30px', minWidth: '500px', maxWidth: '600px' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}

export default Goals;