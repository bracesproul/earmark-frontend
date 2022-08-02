/* eslint-disable */
import React from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';

const data = [
  {
    name: "Jan",
    children: [
      { name: "Food", size: 100, fill: "brown" },
      { name: "Transport", size: 200, fill: "brown" },
      { name: "Clothes", size: 300, fill: "brown" },
      { name: "Entertainment", size: 400, fill: "brown" },
      { name: "Education", size: 500, fill: "brown" },
      { name: "Health", size: 600, fill: "brown" },
    ]
  },
  {
    name: "Feb",
    children: [
      { name: "Food", size: 125, fill: "purple" },
      { name: "Transport", size: 225, fill: "purple" },
      { name: "Clothes", size: 325, fill: "purple" },
      { name: "Entertainment", size: 425, fill: "purple" },
      { name: "Education", size: 525, fill: "purple" },
      { name: "Health", size: 625, fill: "purple" },
    ]
  },
  {
    name: "Mar",
    children: [
      { name: "Food", size: 150, fill: "green" },
      { name: "Transport", size: 250, fill: "green" },
      { name: "Clothes", size: 350, fill: "green" },
      { name: "Entertainment", size: 450, fill: "green" },
      { name: "Education", size: 550, fill: "green" },
      { name: "Health", size: 650, fill: "green" },
    ]
  },
  {
    name: "Apr",
    children: [
      { name: "Food", size: 175, fill: "red" },
      { name: "Transport", size: 275, fill: "red" },
      { name: "Clothes", size: 375, fill: "red" },
      { name: "Entertainment", size: 475, fill: "red" },
      { name: "Education", size: 575, fill: "red" },
      { name: "Health", size: 675, fill: "red" },
    ]
  },
  {
    name: "May",
    children: [
      { name: "Food", size: 2000, fill: 'blue' },
      { name: "Transport", size: 300, fill: 'blue' },
      { name: "Clothes", size: 400, fill: 'blue' },
      { name: "Entertainment", size: 500, fill: 'blue' },
      { name: "Education", size: 600, fill: 'blue' },
      { name: "Health", size: 700, fill: 'blue' },
    ]
  }
];
const TreeMapComponent = () => {

  return (
    <ResponsiveContainer width="100%" height="100%">
        {/* @ts-ignore */}
      <Treemap width={400} height={200} data={data} dataKey="size" ratio={4 / 3} stroke="#fff" fill="#8884d8" />
    </ResponsiveContainer>
  );
};



export default TreeMapComponent;

// ----------------------------------------------------------------------------------------------------------------------------------
