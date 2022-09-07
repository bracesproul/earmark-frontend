/* eslint-disable */
import React, {
  useState,
  useEffect, useRef,
} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from "../../../lib/hooks/useBackgroundFetch";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const elements = [
  { dataKey: 'Income', backendKey: 'INCOME', stackId: 'a', fill: '#00FFFF' },
  { dataKey: 'Transfer In', backendKey: 'TRANSFER_IN', stackId: 'a', fill: '#000000' },
  { dataKey: 'Transfer Out', backendKey: 'TRANSFER_OUT', stackId: 'a', fill: '#0000FF' },
  { dataKey: 'Loan Payments', backendKey: 'LOAN_PAYMENTS', stackId: 'a', fill: '#FF00FF' },
  { dataKey: 'Bank Fees', backendKey: 'BANK_FEES', stackId: 'a', fill: '#808080' },
  { dataKey: 'Entertainment', backendKey: 'ENTERTAINMENT', stackId: 'a', fill: '#008000' },
  { dataKey: 'Food And Drink', backendKey: 'FOOD_AND_DRINK', stackId: 'a', fill: '#00FF00' },
  { dataKey: 'General Merchandise', backendKey: 'GENERAL_MERCHANDISE', stackId: 'a', fill: '#800000' },
  { dataKey: 'Home Improvement', backendKey: 'HOME_IMPROVEMENT', stackId: 'a', fill: '#000080' },
  { dataKey: 'Medical', backendKey: 'MEDICAL', stackId: 'a', fill: '#808000' },
  { dataKey: 'Personal Care', backendKey: 'PERSONAL_CARE', stackId: 'a', fill: '#800080' },
  { dataKey: 'General Services', backendKey: 'GENERAL_SERVICES', stackId: 'a', fill: '#FF0000' },
  { dataKey: 'Government And Non-Profit', backendKey: 'GOVERNMENT_AND_NON_PROFIT', stackId: 'a', fill: '#C0C0C0' },
  { dataKey: 'Transportation', backendKey: 'TRANSPORTATION', stackId: 'a', fill: '#008080' },
  { dataKey: 'Travel', backendKey: 'TRAVEL', stackId: 'a', fill: '#804000' },
  { dataKey: 'Rent And Utilities', backendKey: 'RENT_AND_UTILITIES', stackId: 'a', fill: '#AAFFC3' },
]

const LineChartComponent = (props) => {
  const callApi = useBackgroundFetch();
  const auth = useAuth();

  const [lineChartData, setLineChartData] = useState([]);
  const [key, setKey] = useState([]);
  const [startDate, setStartDate] = useState(moment().subtract(2, 'years').format("YYYY-MM-DD"));
  const [first, setFirst] = useState(true);
  const chartSevenDaysRes = useRef(null);
  const sevenDaysKeysArray = useRef(null);

  const chartOneMonthRes = useRef(null);
  const oneMonthKeysArray = useRef(null);

  const chartThreeMonthsRes = useRef(null);
  const threeMonthsKeysArray = useRef(null);

  const chartSixMonthsRes = useRef(null);
  const sixMonthsKeysArray = useRef(null);

  const chart1yrRes = useRef(null);
  const oneYrKeysArray = useRef(null);

  const chart2yrRes = useRef(null);
  const twoYrKeysArray = useRef(null);


  const fetchData = async (forceRetry:boolean) => {
    return await callApi.fetchLineOrBarChart()
  }

  useEffect(() => {
    if (!auth.user) {
        return undefined;
    }
    fetchData(false)
        .then((res) => {
          if (res.sevenDaysKeysArray) {
            setLineChartData(res.chartSevenDaysRes);
            setKey(res.sevenDaysKeysArray);
          }
          if (res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chartOneMonthRes);
            setKey(res.oneMonthKeysArray);
          }
          if (res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chartThreeMonthsRes);
            setKey(res.threeMonthsKeysArray);
          }
          if (res.sixMonthsKeysArray && !res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chartSixMonthsRes);
            setKey(res.sixMonthsKeysArray);
          }
          if (res.oneYrKeysArray && !res.sixMonthsKeysArray && !res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chart1yrRes);
            setKey(res.oneYrKeysArray);
          }
          if (res.twoYrKeysArray && !res.oneYrKeysArray && !res.sixMonthsKeysArray && !res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chart2yrRes);
            setKey(res.twoYrKeysArray);
          }
          chartSevenDaysRes.current = res.chartSevenDaysRes
          sevenDaysKeysArray.current = res.sevenDaysKeysArray

          chartOneMonthRes.current = res.chartOneMonthRes
          oneMonthKeysArray.current = res.oneMonthKeysArray

          chartThreeMonthsRes.current = res.chartThreeMonthsRes
          threeMonthsKeysArray.current = res.threeMonthsKeysArray

          chartSixMonthsRes.current = res.chartSixMonthsRes
          sixMonthsKeysArray.current = res.sixMonthsKeysArray

          chart1yrRes.current = res.chart1yrRes
          oneYrKeysArray.current = res.oneYrKeysArray

          chart2yrRes.current = res.chart2yrRes
          twoYrKeysArray.current = res.twoYrKeysArray
        })
  }, [])

  // on date change, reset state to new data
  useEffect(() => {
    if (!auth.user) {
        return undefined;
    }
    if (first) return undefined;
    fetchData(false)
        .then((res) => {
            if (res.sevenDaysKeysArray) {
            setLineChartData(res.chartSevenDaysRes);
            setKey(res.sevenDaysKeysArray);
          }
          if (res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chartOneMonthRes);
            setKey(res.oneMonthKeysArray);
          }
          if (res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chartThreeMonthsRes);
            setKey(res.threeMonthsKeysArray);
          }
          if (res.sixMonthsKeysArray && !res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chartSixMonthsRes);
            setKey(res.sixMonthsKeysArray);
          }
          if (res.oneYrKeysArray && !res.sixMonthsKeysArray && !res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chart1yrRes);
            setKey(res.oneYrKeysArray);
          }
          if (res.twoYrKeysArray && !res.oneYrKeysArray && !res.sixMonthsKeysArray && !res.threeMonthsKeysArray && !res.oneMonthKeysArray && !res.sevenDaysKeysArray) {
            setLineChartData(res.chart2yrRes);
            setKey(res.twoYrKeysArray);
          }
        })
  }, [props.date])


  useEffect(() => {
    if (first) return undefined;
    setStartDate(props.date);
  }, [props.date]);

  useEffect(() => {
    setFirst(false)
  }, [])



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