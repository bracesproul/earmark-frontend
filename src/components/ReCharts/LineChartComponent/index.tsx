/* eslint-disable */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    food: 100,
    travel: 200,
    housing: 300,
    misc: 400,
    amt: 1000,
  },
  {
    name: 'Feb',
    food: 125,
    travel: 225,
    housing: 325,
    misc: 425,
    amt: 1100,
  },
  {
    name: 'Mar',
    food: 150,
    travel: 250,
    housing: 350,
    misc: 450,
    amt: 1200,
  },
  {
    name: 'Apr',
    food: 175,
    travel: 275,
    housing: 375,
    misc: 475,
    amt: 1300,
  },
  {
    name: 'May',
    food: 200,
    travel: 300,
    housing: 400,
    misc: 500,
    amt: 1400,
  },
  {
    name: 'Jun',
    food: 225,
    travel: 325,
    housing: 425,
    misc: 525,
    amt: 1500,
  },
  {
    name: 'Jul',
    food: 250,
    travel: 350,
    housing: 450,
    misc: 550,
    amt: 1600,
  },
];

const elements = [
  { dataKey: 'food', stackId: 'a', fill: 'black' },
  { dataKey: 'travel', stackId: 'a', fill: 'red' },
  { dataKey: 'housing', stackId: 'a', fill: 'blue' },
  { dataKey: 'misc', stackId: 'a', fill: 'purple' },
]

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
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
        {elements.map((element, index) => (
        <Line key={index} type="monotone" dataKey={element.dataKey} stroke={element.fill} activeDot={{ r: 8 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};



export default LineChartComponent;