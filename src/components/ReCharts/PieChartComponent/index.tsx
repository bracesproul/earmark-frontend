/* eslint-disable */
import React, { 
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import { useAuth } from '../../../lib/hooks/useAuth';
import moment from 'moment';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';

const PieChartComponent = (props) => {
  const auth = useAuth();
  const today = moment().format("YYYY-MM-DD");

  const [activeIndex, setActiveIndex] = useState(0);
  const [pieData, setPieData] = useState([]);
  const [first, setFirst] = useState(true);
  const [startDate, setStartDate] = useState('2022-01-01');


  useEffect(() => {
    if (first) return;
    setStartDate(props.date);
  }, [props.date]);

  useEffect(() => setFirst(false), [])

  useEffect(() => {
    if (!auth.user) {
      console.log('user is NOT logged in, inside the useEffect hook')
      return;
    };
    const fetchData = async () => {
      try {
        console.log('fetchData')
        const config = {
            method: "GET",
            url: '/api/visuals',
            params: {
                user_id: auth.user.uid,
                queryType: 'pieChart',
                startDate: startDate,
                endDate: today,
            },
            headers: {
                'Content-Type': 'application/json',
                'earmark-api-key': process.env.EARMARK_API_KEY,
            },
        };
        const axiosResponse = await axios(config);
        console.log('axiosResponse pie chart: ', axiosResponse.data.final);
        setPieData(axiosResponse.data.final);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchData();
  }, [startDate])


  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  };

  const renderActiveShape = (data) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = data;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Percent Total ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};



export default PieChartComponent;