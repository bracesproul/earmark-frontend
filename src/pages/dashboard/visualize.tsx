/* eslint-disable */
import React, {
    useState,
    useEffect,
    useRef,
    useLayoutEffect
} from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import { useBackgroundFetch } from '../../lib/hooks/useBackgroundFetch';
import { useRouter } from "next/router";
import PageTemplate from "../../components/PageTemplate";
import LineChartComponent from '../../components/v2/LineChartComponent';
import CssBaseline from "@mui/material/CssBaseline";
import PieChartComponent from "../../components/v2/PieChartComponent";
import TreeMapComponent from "../../components/v2/TreeMapComponent";
import BarChartComponent from '../../components/v2/BarChartComponent';

const timeframeObj = [
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

function Home() {
    const router = useRouter();
    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    const [lineBarData, setLineBarData] = useState<any | null>([]);
    const [pieData, setPieData] = useState<any | null>([]);
    const [lineChartKeys, setLineChartKeys] = useState([]);
    const [windowDimensions, setWindowDimensions] = useState({ height: 900, width: 1440 });
    const lineChartData = useRef(null);
    const pieChartData = useRef(null);
    const isFirstRender = useRef(true);
    router.query.chart = router.query.chart || 'lineChart';
    useEffect(() => {
        if (!router) return undefined;
        router.push(`?chart=lineChart&timeframe=2years`)
    }, [])

    useEffect(() => {
        setWindowDimensions({ height: Math.round(window.innerHeight * .8), width: Math.round(window.innerWidth  * .8) });
    }, []);


    const fetchDataLineBarChart = async (forceRetry:boolean) => {
        return await callApi.fetchLineOrBarChart()
    }

    const fetchDataPieChart = async (forceRetry:boolean) => {
        return await callApi.fetchPieChart();
    }

    useEffect(() => {
        if (!auth.user) return undefined;
        fetchDataLineBarChart(false).then(res => {
            lineChartData.current = {
                chartSevenDaysRes: res.chartSevenDaysRes,
                sevenDaysKeysArray: res.sevenDaysKeysArray,
                chartOneMonthRes: res.chartOneMonthRes,
                oneMonthKeysArray: res.oneMonthKeysArray,
                chartThreeMonthsRes: res.chartThreeMonthsRes,
                threeMonthsKeysArray: res.threeMonthsKeysArray,
                chartSixMonthsRes: res.chartSixMonthsRes,
                sixMonthsKeysArray: res.sixMonthsKeysArray,
                chart1yrRes: res.chart1yrRes,
                oneYrKeysArray: res.oneYrKeysArray,
                chart2yrRes: res.chart2yrRes,
                twoYrKeysArray: res.twoYrKeysArray,
            }
            setLineBarData(res.chart2yrRes.reverse());
            setLineChartKeys(res.twoYrKeysArray.reverse());
        })
        fetchDataPieChart(false).then(res => {
            pieChartData.current = {
                pieChartSevenDaysRes: res.pieChartSevenDaysRes,
                pieChartOneMonthRes: res.pieChartOneMonthRes,
                pieChartThreeMonthsRes: res.pieChartThreeMonthsRes,
                pieChartSixMonthsRes: res.pieChartSixMonthsRes,
                pieChart1yrRes: res.pieChart1yrRes,
                pieChart2yrRes: res.pieChart2yrRes,
            }
            setPieData(res.pieChart2yrRes);
        })
        setLoading(false);
    }, [auth.user])

    useLayoutEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return undefined;
        }
        if (!auth.user) return undefined;
        if (!router.query.timeframe) return undefined;
        if (!lineChartData.current) {
            fetchDataLineBarChart(false).then(res => {
                lineChartData.current = {
                    chartSevenDaysRes: res.chartSevenDaysRes,
                    sevenDaysKeysArray: res.sevenDaysKeysArray,
                    chartOneMonthRes: res.chartOneMonthRes,
                    oneMonthKeysArray: res.oneMonthKeysArray,
                    chartThreeMonthsRes: res.chartThreeMonthsRes,
                    threeMonthsKeysArray: res.threeMonthsKeysArray,
                    chartSixMonthsRes: res.chartSixMonthsRes,
                    sixMonthsKeysArray: res.sixMonthsKeysArray,
                    chart1yrRes: res.chart1yrRes,
                    oneYrKeysArray: res.oneYrKeysArray,
                    chart2yrRes: res.chart2yrRes,
                    twoYrKeysArray: res.twoYrKeysArray,
                }
            })
        }
        if (!pieChartData.current) {
            fetchDataPieChart(false).then(res => {
                pieChartData.current = {
                    pieChartSevenDaysRes: res.pieChartSevenDaysRes,
                    pieChartOneMonthRes: res.pieChartOneMonthRes,
                    pieChartThreeMonthsRes: res.pieChartThreeMonthsRes,
                    pieChartSixMonthsRes: res.pieChartSixMonthsRes,
                    pieChart1yrRes: res.pieChart1yrRes,
                    pieChart2yrRes: res.pieChart2yrRes,
                }
            })
        }
        if (router.query.timeframe === '1week') {
            setLineBarData(lineChartData.current.chartSevenDaysRes.reverse());
            setLineChartKeys(lineChartData.current.sevenDaysKeysArray.reverse());

            setPieData(pieChartData.current.pieChartSevenDaysRes);
        }
        if (router.query.timeframe === '1month') {
            setLineBarData(lineChartData.current.chartOneMonthRes.reverse());
            setLineChartKeys(lineChartData.current.oneMonthKeysArray.reverse());

            setPieData(pieChartData.current.pieChartOneMonthRes);
        }
        if (router.query.timeframe === '3months') {
            setLineBarData(lineChartData.current.chartThreeMonthsRes.reverse());
            setLineChartKeys(lineChartData.current.threeMonthsKeysArray.reverse());

            setPieData(pieChartData.current.pieChartThreeMonthsRes);
        }
        if (router.query.timeframe === '6months') {
            setLineBarData(lineChartData.current.chartSixMonthsRes.reverse());
            setLineChartKeys(lineChartData.current.sixMonthsKeysArray.reverse());

            setPieData(pieChartData.current.pieChartSixMonthsRes);
        }
        if (router.query.timeframe === '1year') {
            setLineBarData(lineChartData.current.chart1yrRes.reverse());
            setLineChartKeys(lineChartData.current.oneYrKeysArray.reverse());

            setPieData(pieChartData.current.pieChart1yrRes);
        }
        if (router.query.timeframe === '2years') {
            setLineBarData(lineChartData.current.chart2yrRes.reverse());
            setLineChartKeys(lineChartData.current.twoYrKeysArray.reverse());

            setPieData(pieChartData.current.pieChart2yrRes);
        }
    }, [router.query.timeframe])

    return (
        <PageTemplate>
            {!router.query.chart || router.query.chart === 'lineChart' &&
                <LineChartComponent
                    loading={loading}
                    windowDimensions={windowDimensions}
                    data={lineBarData}
                    keys={lineChartKeys}
                /> }
            {router.query.chart === 'barChart' &&
                <BarChartComponent
                    loading={loading}
                    windowDimensions={windowDimensions}
                    data={lineBarData}
                    keys={lineChartKeys}
                /> }
            {router.query.chart === 'pieChart' &&
                <PieChartComponent
                    data={pieData}
                    windowDimensions={windowDimensions}
                    chartOptions={chartObj}
                    timeframe={timeframeObj}
                /> }
            {router.query.chart === 'treeMap' && <TreeMapComponent /> }
        </PageTemplate>
    )
}

export default function Visualize() {
    const router = useRouter();
    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    const [lineBarData, setLineBarData] = useState<any | null>([]);
    const [pieData, setPieData] = useState<any | null>([]);
    const [lineChartKeys, setLineChartKeys] = useState([]);
    const [windowDimensions, setWindowDimensions] = useState({ height: 900, width: 1440 });
    const [mounted, setMounted] = useState(false);
    const lineChartData = useRef(null);
    const pieChartData = useRef(null);
    const isFirstRender = useRef(true);
    router.query.chart = router.query.chart || 'lineChart';

    useEffect(() => {
        if (!router) return undefined;
        router.push(`?chart=lineChart&timeframe=2years`)
    }, [mounted])

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [])

    useEffect(() => {
        setWindowDimensions({ height: Math.round(window.innerHeight * .8), width: Math.round(window.innerWidth  * .8) });
    }, [mounted]);

    const fetchDataLineBarChart = async (forceRetry:boolean) => {
        return await callApi.fetchLineOrBarChart()
    }

    const fetchDataPieChart = async (forceRetry:boolean) => {
        return await callApi.fetchPieChart();
    }

    useEffect(() => {
        if (!auth.user) return undefined;
        if (!mounted) return undefined;
        fetchDataLineBarChart(false).then(res => {
            lineChartData.current = {
                chartSevenDaysRes: res.chartSevenDaysRes,
                sevenDaysKeysArray: res.sevenDaysKeysArray,
                chartOneMonthRes: res.chartOneMonthRes,
                oneMonthKeysArray: res.oneMonthKeysArray,
                chartThreeMonthsRes: res.chartThreeMonthsRes,
                threeMonthsKeysArray: res.threeMonthsKeysArray,
                chartSixMonthsRes: res.chartSixMonthsRes,
                sixMonthsKeysArray: res.sixMonthsKeysArray,
                chart1yrRes: res.chart1yrRes,
                oneYrKeysArray: res.oneYrKeysArray,
                chart2yrRes: res.chart2yrRes,
                twoYrKeysArray: res.twoYrKeysArray,
            }
            setLineBarData(res.chart2yrRes.reverse());
            setLineChartKeys(res.twoYrKeysArray.reverse());
        })
        fetchDataPieChart(false).then(res => {
            pieChartData.current = {
                pieChartSevenDaysRes: res.pieChartSevenDaysRes,
                pieChartOneMonthRes: res.pieChartOneMonthRes,
                pieChartThreeMonthsRes: res.pieChartThreeMonthsRes,
                pieChartSixMonthsRes: res.pieChartSixMonthsRes,
                pieChart1yrRes: res.pieChart1yrRes,
                pieChart2yrRes: res.pieChart2yrRes,
            }
            setPieData(res.pieChart2yrRes);
        })
        setLoading(false);
    }, [auth.user, mounted])

    useLayoutEffect(() => {
        if (!mounted) return undefined;
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return undefined;
        }
        if (!auth.user) return undefined;
        if (!router.query.timeframe) return undefined;
        if (!lineChartData.current) {
            fetchDataLineBarChart(false).then(res => {
                lineChartData.current = {
                    chartSevenDaysRes: res.chartSevenDaysRes,
                    sevenDaysKeysArray: res.sevenDaysKeysArray,
                    chartOneMonthRes: res.chartOneMonthRes,
                    oneMonthKeysArray: res.oneMonthKeysArray,
                    chartThreeMonthsRes: res.chartThreeMonthsRes,
                    threeMonthsKeysArray: res.threeMonthsKeysArray,
                    chartSixMonthsRes: res.chartSixMonthsRes,
                    sixMonthsKeysArray: res.sixMonthsKeysArray,
                    chart1yrRes: res.chart1yrRes,
                    oneYrKeysArray: res.oneYrKeysArray,
                    chart2yrRes: res.chart2yrRes,
                    twoYrKeysArray: res.twoYrKeysArray,
                }
            })
        }
        if (!pieChartData.current) {
            fetchDataPieChart(false).then(res => {
                pieChartData.current = {
                    pieChartSevenDaysRes: res.pieChartSevenDaysRes,
                    pieChartOneMonthRes: res.pieChartOneMonthRes,
                    pieChartThreeMonthsRes: res.pieChartThreeMonthsRes,
                    pieChartSixMonthsRes: res.pieChartSixMonthsRes,
                    pieChart1yrRes: res.pieChart1yrRes,
                    pieChart2yrRes: res.pieChart2yrRes,
                }
            })
        }
        if (router.query.timeframe === '1week') {
            setLineBarData(lineChartData.current.chartSevenDaysRes.reverse());
            setLineChartKeys(lineChartData.current.sevenDaysKeysArray.reverse());

            setPieData(pieChartData.current.pieChartSevenDaysRes);
        }
        if (router.query.timeframe === '1month') {
            setLineBarData(lineChartData.current.chartOneMonthRes.reverse());
            setLineChartKeys(lineChartData.current.oneMonthKeysArray.reverse());

            setPieData(pieChartData.current.pieChartOneMonthRes);
        }
        if (router.query.timeframe === '3months') {
            setLineBarData(lineChartData.current.chartThreeMonthsRes.reverse());
            setLineChartKeys(lineChartData.current.threeMonthsKeysArray.reverse());

            setPieData(pieChartData.current.pieChartThreeMonthsRes);
        }
        if (router.query.timeframe === '6months') {
            setLineBarData(lineChartData.current.chartSixMonthsRes.reverse());
            setLineChartKeys(lineChartData.current.sixMonthsKeysArray.reverse());

            setPieData(pieChartData.current.pieChartSixMonthsRes);
        }
        if (router.query.timeframe === '1year') {
            setLineBarData(lineChartData.current.chart1yrRes.reverse());
            setLineChartKeys(lineChartData.current.oneYrKeysArray.reverse());

            setPieData(pieChartData.current.pieChart1yrRes);
        }
        if (router.query.timeframe === '2years') {
            setLineBarData(lineChartData.current.chart2yrRes.reverse());
            setLineChartKeys(lineChartData.current.twoYrKeysArray.reverse());

            setPieData(pieChartData.current.pieChart2yrRes);
        }
    }, [router.query.timeframe, mounted])

    if (!mounted) return <></>

    return (
        <>
            <CssBaseline />
            {!router.query.chart || router.query.chart === 'lineChart' &&
                <LineChartComponent
                    loading={loading}
                    windowDimensions={windowDimensions}
                    data={lineBarData}
                    keys={lineChartKeys}
                /> }
            {router.query.chart === 'barChart' &&
                <BarChartComponent
                    loading={loading}
                    windowDimensions={windowDimensions}
                    data={lineBarData}
                    keys={lineChartKeys}
                /> }
            {router.query.chart === 'pieChart' &&
                <PieChartComponent
                    data={pieData}
                    windowDimensions={windowDimensions}
                    chartOptions={chartObj}
                    timeframe={timeframeObj}
                /> }
            {router.query.chart === 'treeMap' && <TreeMapComponent /> }
        </>
    )
}