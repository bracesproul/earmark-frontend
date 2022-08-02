import React from 'react';
import {
    Box,
    Card
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import TimeframeSelector from '../TimeframeSelector';
import LinearWithValueLabel from "../../ProgressBar";

const tfobj = [
    {
        value: '1week',
        label: '1 week',
    },
    {
        value: '1month',
        label: '1 month',
    },
    {
        value: '3months',
        label: '3 months',
    },
    {
        value: '6months',
        label: '6 months',
    },
    {
        value: '1year',
        label: '1 year',
    },
    {
        value: '2years',
        label: '2 years',
    }
]

const chartObj = [
    {
        value: 'lineChart',
        label: 'Line Chart',
    },
    {
        value: 'barChart',
        label: 'Bar Chart',
    },
    {
        value: 'pieChart',
        label: 'Pie Chart',
    },
    {
        value: 'treeMap',
        label: 'Tree Map',
    }
]


function LineChartComponent(props) {

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
                <TimeframeSelector defaultValue={'2years'} queryLabel={'timeframe'} label={'Select Timeframe'} timeframe={tfobj} />
                <TimeframeSelector defaultValue={'lineChart'} queryLabel={'chart'} label={'Select Chart'} timeframe={chartObj} />
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
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={props.data}
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
                        {props.keys.map((element, index) => (
                            <Line key={index} type="monotone" dataKey={element.dataKey} stroke={element.fill} activeDot={{ r: 8 }} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            )}

        </Box>
    )
}

export default LineChartComponent;