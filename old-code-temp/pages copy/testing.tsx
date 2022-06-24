/* eslint-disable */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../styles/Testing.module.css';
// src\components\Auth\SignUp
import SignUp from '../../src/components/Auth/SignUp';

const LineChartComponent = () => {
  return (
    <div className={styles.visual}>
      <SignUp />
    </div>
  );
};



export default LineChartComponent;

// ----------------------------------------------------------------------------------------------------------------------------------
