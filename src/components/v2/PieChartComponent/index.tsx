/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Sector
} from 'recharts';
import {
    Box,
    Card
} from "@mui/material";
import TimeframeSelector from "../TimeframeSelector";
import LinearWithValueLabel from "../../ProgressBar";

const PieChartComponent = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [chartHeight, setChartHeight] = useState(700);

    useEffect(() => {
        setChartHeight(props.windowDimensions.height);
    }, [props.windowDimensions])

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
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '4rem',
        margin: 'auto',
        width: { sm: '100%', md: `${props.windowDimensions.width}` },
        height: { sm: '700px', md: `${props.windowDimensions.height}` },
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
        }}>
            <TimeframeSelector defaultValue={'2years'} queryLabel={'timeframe'} label={'Select Timeframe'} timeframe={props.timeframeV} />
            <TimeframeSelector defaultValue={'pieChart'} queryLabel={'chart'} label={'Select Chart'} timeframe={props.chartOptions} />
        </Box>

        { props.loading ? (
            <Card sx={{
                minWidth: '500px',
                minHeight: '15px',
                padding: '1rem',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <LinearWithValueLabel stop={!props.loading} />
            </Card>
        ) : (
            <ResponsiveContainer width="100%" height={chartHeight}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={props.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        )}

    </Box>
    );
};



export default PieChartComponent;