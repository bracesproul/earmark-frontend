/* eslint-disable */
import React, { useEffect } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

// random number generator 1-50
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const barReChartData = [
    { name: 'January', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'February', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'March', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'April', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'May', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'June', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'July', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'August', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'September', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'October', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'November', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
    { name: 'December', food: randomNumber(200, 400), transportation: randomNumber(25, 125), utilities: randomNumber(75, 200), leasure: randomNumber(1, 500) },
];

const ReBarChart = ({ data }) => {

  return (
    <>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="food" stackId="a" fill="purple" stroke="black" />
            <Bar dataKey="transportation" stackId="a" fill="blue" stroke="black" />
            <Bar dataKey="utilities" stackId="a" fill="red" stroke="black" />
            <Bar dataKey="leasure" stackId="a" fill="green" stroke="black" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
    );
}

export default ReBarChart;