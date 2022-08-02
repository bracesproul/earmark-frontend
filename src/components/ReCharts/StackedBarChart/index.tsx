/* eslint-disable */
import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../../lib/hooks/useAuth';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const elements = [
  { dataKey: 'Income', stackId: 'a', fill: '#00FFFF' },
  { dataKey: 'Transfer In', stackId: 'a', fill: '#000000' },
  { dataKey: 'Transfer Out', stackId: 'a', fill: '#0000FF' },
  { dataKey: 'Loan Payments', stackId: 'a', fill: '#FF00FF' },
  { dataKey: 'Bank Fees', stackId: 'a', fill: '#808080' },
  { dataKey: 'Entertainment', stackId: 'a', fill: '#008000' },
  { dataKey: 'Food And Drink', stackId: 'a', fill: '#00FF00' },
  { dataKey: 'General Merchandise', stackId: 'a', fill: '#800000' },
  { dataKey: 'Home Improvement', stackId: 'a', fill: '#000080' },
  { dataKey: 'Medical', stackId: 'a', fill: '#808000' },
  { dataKey: 'Personal Care', stackId: 'a', fill: '#800080' },
  { dataKey: 'General Services', stackId: 'a', fill: '#FF0000' },
  { dataKey: 'Government And Non-Profit', stackId: 'a', fill: '#C0C0C0' },
  { dataKey: 'Transportation', stackId: 'a', fill: '#008080' },
  { dataKey: 'Travel', stackId: 'a', fill: '#804000' },
  { dataKey: 'Rent And Utilities', stackId: 'a', fill: '#AAFFC3' },
]

const StackedBarChart = (props) => {
  const auth = useAuth();
  const today = moment().format("YYYY-MM-DD");

  const [barChartData, setBarChartData] = useState([]);
  const [key, setKey] = useState([]);
  const [first, setFirst] = useState(true);
  const [startDate, setStartDate] = useState(moment().subtract(2, 'years').format("YYYY-MM-DD"));

  const fetchData = async (dateName) => {
    const user_id: string = auth.user.uid;
    try {
      const currentTime = Date.now();
      const expTime = currentTime + 86400000;
      const config = {
          method: "GET",
          url: '/api/visuals',
          params: {
              user_id: user_id,
              queryType: 'barChart',
              startDate: startDate,
              endDate: today,
          },
          headers: {
              'Content-Type': 'application/json',
          },
      };

      const axiosResponse = await axios(config);
      setBarChartData(axiosResponse.data.final);
      let keysArray = [];
      elements.forEach((element) => {
        if (axiosResponse.data.categories.includes(element.dataKey)) {
          keysArray.push({ dataKey: element.dataKey, stackId: element.stackId, fill: element.fill })
        }
      });
      setKey(keysArray);
      localStorage.setItem(`barChartCacheExpTime${dateName}`, expTime.toString());
      localStorage.setItem(`barChartCachedData${dateName}`, JSON.stringify(axiosResponse.data.final));
      localStorage.setItem(`barChartCachedKeysArr${dateName}`, JSON.stringify(keysArray));
    } catch (error) {
      console.error('bar chart error', error);
    }
  };

  const cacheData = (dateName) => {
    if (typeof window == "undefined") return;
    console.log('TOTAL SPENDING CHECK CACHE RUNNING');
    const currentTime = Date.now();
    const cacheExpTime = parseInt(localStorage.getItem(`barChartCacheExpTime${dateName}`));
    const cachedData = JSON.parse(localStorage.getItem(`barChartCachedData${dateName}`));
    const cachedKeysArr = JSON.parse(localStorage.getItem(`barChartCachedKeysArr${dateName}`));
    if (!cacheExpTime || !cachedData || !cachedKeysArr) {
        fetchData(dateName);
    } else if (cacheExpTime < currentTime) {
        fetchData(dateName);
    } else if (cacheExpTime > currentTime) {
      setBarChartData(cachedData);
      setKey(cachedKeysArr);
    }
  };

  useEffect(() => {
    if (first) return;
    setStartDate(props.date);
  }, [props.date]);

  useEffect(() => {
    setFirst(false)
  }, [])

  useEffect(() => {
    if (!auth.user) {
      console.error('user NOT logged in, inside the useEffect hook')
      return;
    };
    

    cacheData(props.dateName);
  }, [startDate])
  return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={barChartData}
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
          {key.map((element, index) => (
            <Bar key={index} dataKey={element.dataKey} stackId={element.stackId} fill={element.fill} />
          ))}
        </BarChart>
      </ResponsiveContainer>
  )
};

export default StackedBarChart;