/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Sector,
  Treemap,
	ResponsiveContainer,
} from 'recharts';

const TREEMAP_DATA = [
	{
		name: 'axis',
		children: [
			{ name: 'January', size: 100000, fill: "black" },
			{ name: 'Febuary', size: 100000, fill: "Red" },
			{ name: 'March', size: 100000, fill: "Orange" },
			{ name: 'April', size: 100000, fill: "Yellow" },
			{ name: 'May', size: 100000, fill: "Green" },
      { name: 'June', size: 100000, fill: "Blue" },
			{ name: 'July', size: 100000, fill: "Indigo" },
			{ name: 'August', size: 100000, fill: "Violet" },
			{ name: 'September', size: 100000, fill: "grey" },
			{ name: 'October', size: 100000, fill: "pink" },
			{ name: 'November', size: 100000, fill: "purple" },
			{ name: 'December', size: 100000, fill: "brown" },
		],
	},
];

const BAR_CHART_DATA = [
  { name: 'January', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'February', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'March', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'April', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'May', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'June', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'July', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'August', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'September', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'October', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'November', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'December', food: 250, transportation: 300, utilities: 350, leasure: 400 },
];

const PIE_CHART_DATA = [
  { name: "Food", value: 100, fill: "purple" },
  { name: "Transportation", value: 200, fill: "blue" },
  { name: "Utilities", value: 300, fill: "red" },
  { name: "Leasure", value: 400, fill: "green" },
];

const BarReChart = ({ data }) => {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
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
      );
}

const ReTreemap = ({ data }) => {
  return (
  <ResponsiveContainer width="100%" height="100%">
    <Treemap
      data={data}
      dataKey="size"
      stroke="#fff"
      fill="#8884d8"
    />
  </ResponsiveContainer>
  );
}


const SimplePieChart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
				<Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
				<Tooltip />
			</PieChart>
    </ResponsiveContainer>
  )
}

const VisualizeData = ({ bar_chart, tree_map, pie_chart }) => {
    return (
        <div className="testing">
            <div className="bar" >
                <h1>Bar Chart</h1>
                <BarReChart data={bar_chart} />
            </div>
            <div className="tree" >
                <h1>Tree Map </h1>
                <ReTreemap data={tree_map} /> 
            </div>
            <div className="pie" >
                <h1>Pie Chart</h1>
                <SimplePieChart data={pie_chart} />
            </div>
      </div>
    )
}

export default VisualizeData;