import React, {
    useState,
    useCallback
} from 'react';
import { 
    PieChart, 
    Pie, 
    Sector 
} from 'recharts';

// random number generator 1-50
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pieData = [
    { name: "Food", value: randomNumber(200, 400), fill: "purple" },
    { name: "Transportation", value: randomNumber(25, 125), fill: "blue" },
    { name: "Utilities", value: randomNumber(75, 200), fill: "red" },
    { name: "Leasure", value: randomNumber(1, 500), fill: "green" },
];
  

  
const RePieChart = ({ pieData, title }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
        setActiveIndex(index);
        },
        [setActiveIndex]
    );

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

    return (
        <div className="pie-chart">
        <h1>{title}</h1>
        <PieChart width={600} height={800}>
        <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            cx={300}
            cy={300}
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

export default RePieChart;