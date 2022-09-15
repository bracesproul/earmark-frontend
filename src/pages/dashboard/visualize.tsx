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
import {parseCookies} from "../../lib/parseCookies";

export async function getServerSideProps({ req, res }) {
    const cookie = parseCookies(req).user_id
    console.log('cookie', cookie)
    if (res) {
        if (!cookie) {
            return {
                props: {
                    cookie: null,
                },
            }
        }
        if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }
    return {
        props: {
            cookie: cookie,
        },
    }
}

const timeframeObj = [
    {
        disabled: false,
        value: '1week',
        label: '1 week',
    },
    {
        disabled: false,
        value: '1month',
        label: '1 month',
    },
    {
        disabled: false,
        value: '3months',
        label: '3 months',
    },
    {
        disabled: false,
        value: '6months',
        label: '6 months',
    },
    {
        disabled: false,
        value: '1year',
        label: '1 year',
    },
    {
        disabled: false,
        value: '2years',
        label: '2 years',
    }
];
//
const timeFrameNoWeek = [
    {
        disabled: true,
        value: '1week',
        label: '1 week',
    },
    {
        disabled: false,
        value: '1month',
        label: '1 month',
    },
    {
        disabled: false,
        value: '3months',
        label: '3 months',
    },
    {
        disabled: false,
        value: '6months',
        label: '6 months',
    },
    {
        disabled: false,
        value: '1year',
        label: '1 year',
    },
    {
        disabled: false,
        value: '2years',
        label: '2 years',
    }
];

const timeFrameNoMonth = [
    {
        disabled: true,
        value: '1week',
        label: '1 week',
    },
    {
        disabled: true,
        value: '1month',
        label: '1 month',
    },
    {
        disabled: false,
        value: '3months',
        label: '3 months',
    },
    {
        disabled: false,
        value: '6months',
        label: '6 months',
    },
    {
        disabled: false,
        value: '1year',
        label: '1 year',
    },
    {
        disabled: false,
        value: '2years',
        label: '2 years',
    }
];

const timeFrameNo3Months = [
    {
        disabled: true,
        value: '1week',
        label: '1 week',
    },
    {
        disabled: true,
        value: '1month',
        label: '1 month',
    },
    {
        disabled: true,
        value: '3months',
        label: '3 months',
    },
    {
        disabled: false,
        value: '6months',
        label: '6 months',
    },
    {
        disabled: false,
        value: '1year',
        label: '1 year',
    },
    {
        disabled: false,
        value: '2years',
        label: '2 years',
    }
];

const timeFrameNo6Months = [
    {
        disabled: true,
        value: '1week',
        label: '1 week',
    },
    {
        disabled: true,
        value: '1month',
        label: '1 month',
    },
    {
        disabled: true,
        value: '3months',
        label: '3 months',
    },
    {
        disabled: true,
        value: '6months',
        label: '6 months',
    },
    {
        disabled: false,
        value: '1year',
        label: '1 year',
    },
    {
        disabled: false,
        value: '2years',
        label: '2 years',
    }
];

const timeFrameNoYear = [
    {
        disabled: true,
        value: '1week',
        label: '1 week',
    },
    {
        disabled: true,
        value: '1month',
        label: '1 month',
    },
    {
        disabled: true,
        value: '3months',
        label: '3 months',
    },
    {
        disabled: true,
        value: '6months',
        label: '6 months',
    },
    {
        disabled: true,
        value: '1year',
        label: '1 year',
    },
    {
        disabled: false,
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
    const [mounted, setMounted] = useState(false);
    const [reRun, setReRun] = useState(false);
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

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [])


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
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return undefined;
        }
        if (!mounted) return undefined;
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

    if (!mounted) return null;

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

export default function Visualize({ cookie }) {
    const router = useRouter();
    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    const [lineBarData, setLineBarData] = useState<any | null>([]);
    const [pieData, setPieData] = useState<any | null>([]);
    const [lineChartKeys, setLineChartKeys] = useState([]);
    const [windowDimensions, setWindowDimensions] = useState({ height: 900, width: 1440 });
    const [mounted, setMounted] = useState(false);
    const [lineDataReceived, setLineDataReceived] = useState(false);
    const [pieDataReceived, setPieDataReceived] = useState(false);
    const [timeframe, setTimeframe] = useState<any[]>(timeframeObj);

    const lineChartData = useRef(null);
    const pieChartData = useRef(null);
    const isFirstRender = useRef(true);
    router.query.chart = router.query.chart || 'lineChart';

    useEffect(() => {
        if (!cookie) {
            router.push("/auth/signin")
        }
    }, [cookie])

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
            setLineDataReceived(true);
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
            setPieDataReceived(true);
        })
        setLoading(false);
    }, [auth.user, mounted])

    useEffect(() => {
        if (lineDataReceived) {
            console.log('lineDataReceived')
            Object.keys(lineChartData.current).forEach(key => {
                if (lineChartData.current[key] === null && key === 'sevenDaysKeysArray') {
                    setTimeframe(timeFrameNoWeek);
                }
                if (lineChartData.current[key] === null && key === 'oneMonthKeysArray') {
                    setTimeframe(timeFrameNoMonth);
                }
                if (lineChartData.current[key] === null && key === 'threeMonthsKeysArray') {
                    setTimeframe(timeFrameNo3Months);
                }
                if (lineChartData.current[key] === null && key === 'sixMonthsKeysArray') {
                    setTimeframe(timeFrameNo6Months);
                }
                if (lineChartData.current[key] === null && key === 'oneYrKeysArray') {
                    setTimeframe(timeFrameNoYear);
                }
            })
        }
    }, [lineDataReceived, pieDataReceived])

    useEffect(() => {
        if (!mounted) return undefined;
        if (!lineChartData.current) {
            console.log('lineChartData.current is null');
            return undefined;
        }
        if (router.query.timeframe === '1week') {
            console.log('lineChartData.current', lineChartData)
            setLineBarData(lineChartData.current.chartSevenDaysRes.reverse());
            setLineChartKeys(lineChartData.current.sevenDaysKeysArray.reverse());

            setPieData(pieChartData.current.pieChartSevenDaysRes);
        }
        if (router.query.timeframe === '1month') {
            console.log('lineChartData.current', lineChartData)
            setLineBarData(lineChartData.current.chartOneMonthRes.reverse());
            setLineChartKeys(lineChartData.current.oneMonthKeysArray.reverse());

            setPieData(pieChartData.current.pieChartOneMonthRes);
        }
        if (router.query.timeframe === '3months') {
            console.log('lineChartData.current', lineChartData)
            setLineBarData(lineChartData.current.chartThreeMonthsRes.reverse());
            setLineChartKeys(lineChartData.current.threeMonthsKeysArray.reverse());

            setPieData(pieChartData.current.pieChartThreeMonthsRes);
        }
        if (router.query.timeframe === '6months') {
            console.log('lineChartData.current', lineChartData)
            setLineBarData(lineChartData.current.chartSixMonthsRes.reverse());
            setLineChartKeys(lineChartData.current.sixMonthsKeysArray.reverse());

            setPieData(pieChartData.current.pieChartSixMonthsRes);
        }
        if (router.query.timeframe === '1year') {
            console.log('lineChartData.current', lineChartData)
            setLineBarData(lineChartData.current.chart1yrRes.reverse());
            setLineChartKeys(lineChartData.current.oneYrKeysArray.reverse());

            setPieData(pieChartData.current.pieChart1yrRes);
        }
        if (router.query.timeframe === '2years') {
            console.log('lineChartData.current', lineChartData)
            setLineBarData(lineChartData.current.chart2yrRes.reverse());
            setLineChartKeys(lineChartData.current.twoYrKeysArray.reverse());

            setPieData(pieChartData.current.pieChart2yrRes);
        }
    }, [router.query.timeframe])

    if (!mounted) return <></>

    return (
        <>
            <CssBaseline />
            {!router.query.chart || router.query.chart === 'lineChart' &&
                <LineChartComponent
                    timeframeV={timeframe}
                    loading={loading}
                    windowDimensions={windowDimensions}
                    data={lineBarData}
                    keys={lineChartKeys}
                /> }
            {router.query.chart === 'barChart' &&
                <BarChartComponent
                    timeframeV={timeframe}
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
                    timeframeV={timeframe}
                /> }
            {router.query.chart === 'treeMap' && <TreeMapComponent /> }
        </>
    )
}