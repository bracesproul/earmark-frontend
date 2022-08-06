/* eslint-disable */
import React, {
    useEffect,
    useState
} from 'react';
import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Treemap
} from 'recharts';
import {Box, Card} from "@mui/material";
import TimeframeSelector from "../TimeframeSelector";
import LinearWithValueLabel from "../../ProgressBar";

const data = [
    {
        name: "Jan",
        children: [
            { name: "Food", size: 100, fill: "brown" },
            { name: "Transport", size: 200, fill: "brown" },
            { name: "Clothes", size: 300, fill: "brown" },
            { name: "Entertainment", size: 400, fill: "brown" },
            { name: "Education", size: 500, fill: "brown" },
            { name: "Health", size: 600, fill: "brown" },
        ]
    },
    {
        name: "Feb",
        children: [
            { name: "Food", size: 125, fill: "purple" },
            { name: "Transport", size: 225, fill: "purple" },
            { name: "Clothes", size: 325, fill: "purple" },
            { name: "Entertainment", size: 425, fill: "purple" },
            { name: "Education", size: 525, fill: "purple" },
            { name: "Health", size: 625, fill: "purple" },
        ]
    },
    {
        name: "Mar",
        children: [
            { name: "Food", size: 150, fill: "green" },
            { name: "Transport", size: 250, fill: "green" },
            { name: "Clothes", size: 350, fill: "green" },
            { name: "Entertainment", size: 450, fill: "green" },
            { name: "Education", size: 550, fill: "green" },
            { name: "Health", size: 650, fill: "green" },
        ]
    },
    {
        name: "Apr",
        children: [
            { name: "Food", size: 175, fill: "red" },
            { name: "Transport", size: 275, fill: "red" },
            { name: "Clothes", size: 375, fill: "red" },
            { name: "Entertainment", size: 475, fill: "red" },
            { name: "Education", size: 575, fill: "red" },
            { name: "Health", size: 675, fill: "red" },
        ]
    },
    {
        name: "May",
        children: [
            { name: "Food", size: 2000, fill: 'blue' },
            { name: "Transport", size: 300, fill: 'blue' },
            { name: "Clothes", size: 400, fill: 'blue' },
            { name: "Entertainment", size: 500, fill: 'blue' },
            { name: "Education", size: 600, fill: 'blue' },
            { name: "Health", size: 700, fill: 'blue' },
        ]
    }
];

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
];

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
];

const TreeMapComponent = (props) => {
    const [windowDimensions, setWindowDimensions] = useState({ height: 900, width: 1440 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(window.innerHeight)
        setWindowDimensions({ height: Math.round(window.innerHeight * .8), width: Math.round(window.innerWidth  * .8) });
    }, []);

    if (props.loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '4rem',
            margin: 'auto',
            width: { sm: '100%', md: `${windowDimensions.width}` },
            height: { sm: '700px', md: `${windowDimensions.height}` },
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto',
            }}>
                <TimeframeSelector queryLabel={'timeframe'} label={'Select Timeframe'} timeframe={tfobj} />
                <TimeframeSelector queryLabel={'chart'} label={'Select Chart'} timeframe={chartObj} />
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
                <ResponsiveContainer width="100%" height={windowDimensions.height}>
                    <Treemap
                        data={data}
                        dataKey="size"
                        /* @ts-ignore */
                        ratio={4 / 3}
                        stroke="#fff"
                        fill="#8884d8" />
                </ResponsiveContainer>
            )}

        </Box>
    );
};

export default TreeMapComponent;