import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { LinearProgress, LinearProgressProps , Typography, Box } from '@mui/material';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel(props) {
  const startDate = Date.now() * 0.001;
  let progress = 0;
  const [change, setChange] = useState(progress);
  const stopProgress = useRef(props.stop);

  useEffect(() => {
    console.log('stop inside component', props.stop)
    stopProgress.current = props.stop;
    if (change == 93) setChange(100);
  }, [props.stop])

  const getPercentToIncrease = (baseNum: number) => {
    const randomNum = Math.floor(Math.random() * 9);
    if (randomNum % 2 == 0) {
      return baseNum + 1
    } else return baseNum;
  }

  const increasePercent = (continueRunning: boolean) => {
    if (continueRunning) return 100;
    if (progress < 15) {
      return progress += getPercentToIncrease(3);
    } else if (progress < 30 && progress >= 15) {
      return progress += getPercentToIncrease(2);
    } else if (progress < 50 && progress >= 30) {
      return progress += getPercentToIncrease(1);
    } else if (progress >= 50 && progress <= 92) {
      return progress += getPercentToIncrease(0);
    }
    else if (progress >= 93) {
      return progress;
    }
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setChange(increasePercent(stopProgress.current));
      if (stopProgress.current || progress >= 93) {
        const endSec = Date.now() * 0.001;
        console.log('clearing interval...', progress);
        console.log('startSec', startDate);
        console.log('endSec', endSec);
        console.log('duration in seconds', (endSec - startDate))
        clearInterval(timer);
        return undefined;
      }
    }, 200)
  }, []);


  return (
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      <LinearProgressWithLabel value={change} />
    </Box>
  );
}

export default LinearWithValueLabel