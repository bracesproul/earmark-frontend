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
import Datagrid from "../src/components/NewUIComponents/DataGridTransactions"
import { globalVars } from '../src/lib/globalVars';
import axios from 'axios';
const API_URL = globalVars().API_URL;

export async function getServerSideProps({ req, res }) {
  const config = {
      method: "GET",
      url: API_URL + '/api/earmark/allTransactions',
      params: {
          // @ts-ignore
          user_id: 'A9kohZbP3WRB1qdr3CqEd9GOLi33',
          startDate: '2021-01-01',
          endDate: '2022-01-01',
      },
      headers: {
          'Content-Type': 'application/json',
          'earmark-api-key': process.env.EARMARK_API_KEY,
      },
  };
  const axiosResponse = await axios(config);
  const allTransactionsColumns = [
      { field: 'col1', headerName: 'Name', width: 150 },
      { field: 'col2', headerName: 'Date', width: 150 },
      { field: 'col3', headerName: 'Amount', width: 150 },
      { field: 'col4', headerName: 'Category', width: 150 },
  ];
  return {
    props: { 
      dataGridColumns: allTransactionsColumns,
      dataGridRows: axiosResponse.data.dataGridTransactions,
      transactionMetadata: axiosResponse.data.transactionMetadata
     },
  }
}


export default function Home({ dataGridColumns, dataGridRows, transactionMetadata }) {
  return (
    <div className="testing">
      <div className="datagrid-testing-container">
        {/* @ts-ignore */}
        <Datagrid dataGridColumns={dataGridColumns} dataGridRows={dataGridRows} transactionMetadata={transactionMetadata} identifier="test" />
      </div>
    </div>

  )
}









/*
      <div className="bar" >
        <h1>Bar Chart</h1>
      <BarReChart data={BAR_CHART_DATA} />
      </div>
      <div className="tree" >
      <h1>Tree Map </h1>
      <ReTreemap data={TREEMAP_DATA} /> 
      </div>
      <div className="pie" >
      <h1>Pie Chart</h1>
      <SimplePieChart data={PIE_CHART_DATA} />
      </div>
    */

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