import React, {
    useState,
    useCallback
} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

export default function Home({ }) {
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

    return (
        <div>
            <h1>Testing</h1>
            <BarReChart data={barReChartData} />
            <App />
        </div>
    )
}

// random number generator 1-50
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomNumber(1, 50));



const BarReChart = ({ data }) => {

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
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

        </>
      );
}

// START PIE CHART

const pieData = [
    { name: "Food", value: randomNumber(200, 400), fill: "purple" },
    { name: "Transportation", value: randomNumber(25, 125), fill: "blue" },
    { name: "Utilities", value: randomNumber(75, 200), fill: "red" },
    { name: "Leasure", value: randomNumber(1, 500), fill: "green" },
];
  
const renderActiveShape = (data: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = data;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
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
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor="{textAnchor}"
          fill="#333"
        >{`$${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
};
  
function App() {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
        setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <div className="pie-chart">
        <h1>January</h1>
        <PieChart width={600} height={800}>
        <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            cx={265}
            cy={265}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
        />
        </PieChart>
        </div>

    );
}

  