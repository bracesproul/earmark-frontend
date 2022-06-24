/* eslint-disable */
import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../../lib/hooks/useAuth';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const LineChartComponent = (props) => {
  const auth = useAuth();
  const today = moment().format("YYYY-MM-DD");

  const [lineChartData, setLineChartData] = useState([]);
  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [key, setKey] = useState([]);
  const [startDate, setStartDate] = useState('2022-01-01');
  const [first, setFirst] = useState(true);

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
    const fetchData = async () => {
      // console.log('fetch data running')
      try {
        const config = {
          method: "GET",
          url: '/api/visuals',
          params: {
              user_id: auth.user.uid,
              queryType: 'lineChart',
              startDate: startDate,
              endDate: today,
          },
          headers: {
              'Content-Type': 'application/json',
              'earmark-api-key': process.env.EARMARK_API_KEY,
          },
      };
      const axiosResponse = await axios(config);
      console.log('axiosres', axiosResponse.data)
      setLineChartData(axiosResponse.data.final);
      setMonths(axiosResponse.data.months);
      let keysArray = [];
      elements.forEach((element) => {
        if (axiosResponse.data.categories.includes(element.dataKey)) {
          keysArray.push({ dataKey: element.dataKey, stackId: element.stackId, fill: element.fill })
        }
      });
      setKey(keysArray);
      } catch (error) {
        console.error(error)
      }

    };
    fetchData();
  }, [startDate])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={lineChartData}
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
        {key.map((element, index) => (
        <Line key={index} type="monotone" dataKey={element.dataKey} stroke={element.fill} activeDot={{ r: 8 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};



export default LineChartComponent;