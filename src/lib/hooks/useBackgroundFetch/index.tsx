/* eslint-disable */
import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "../useAuth";
import moment from "moment";
import axios from "axios";
import { useQuery } from 'react-query';

// TODO: refactor all methods
// TODO: fetch institutions
// TODO: fetch transactions
// TODO: fetch recurring
// TODO: method that runs cache check, if true return cache, else fetch api (fetchData func).
/*
* example for the above to do
* callAPI.fetchData.visualize.lineChart()
* will only run the lineChart func
* callAPI.fetchData.all()
* will run all apis
* callAPI.fetchData.dashboard()
* will call all dashboard components
*/

const backgroundFetchContext = createContext({});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideBackgroundFetch({ children }) {
    const fetch = useProvideBackgroundFetch();
    return <backgroundFetchContext.Provider value={fetch}>{children}</backgroundFetchContext.Provider>;
}

interface ICheckAccounts {
    accounts: boolean;
    cacheSet: boolean;
    fatalError: boolean;
}

// Global variables
const CHART_ELEMENTS = [
    { dataKey: 'Income', stackId: 'a', fill: '#607d8b' },
    { dataKey: 'Transfer In', stackId: 'a', fill: '#ff5722' },
    { dataKey: 'Transfer Out', stackId: 'a', fill: '#795548' },
    { dataKey: 'Loan Payments', stackId: 'a', fill: '#9e9e9e' },
    { dataKey: 'Bank Fees', stackId: 'a', fill: '#ffeb3b' },
    { dataKey: 'Entertainment', stackId: 'a', fill: '#ffc107' },
    { dataKey: 'Food And Drink', stackId: 'a', fill: '#00FF00' },
    { dataKey: 'General Merchandise', stackId: 'a', fill: '#ff9800' },
    { dataKey: 'Home Improvement', stackId: 'a', fill: '#4caf50' },
    { dataKey: 'Medical', stackId: 'a', fill: '#8bc34a' },
    { dataKey: 'Personal Care', stackId: 'a', fill: '#cddc39' },
    { dataKey: 'General Services', stackId: 'a', fill: '#009688' },
    { dataKey: 'Government And Non-Profit', stackId: 'a', fill: '#00bcd4' },
    { dataKey: 'Transportation', stackId: 'a', fill: '#03a9f4' },
    { dataKey: 'Travel', stackId: 'a', fill: '#673ab7' },
    { dataKey: 'Rent And Utilities', stackId: 'a', fill: '#3f51b5' },
]

// util functions
// spending overview done
const checkForPartialResponsesSpendingOverview = (spendingOverview24hrsRes, spendingOverview7daysRes, spendingOverview2weeksRes, spendingOverview1moRes) => {
    const oneDayIsTrue = spendingOverview24hrsRes.data.spendingOverview[0].no_transactions;
    const oneWeekIsTrue = spendingOverview7daysRes.data.spendingOverview[0].no_transactions;
    const twoWeeksIsTrue = spendingOverview2weeksRes.data.spendingOverview[0].no_transactions;
    const oneMoIsTrue = spendingOverview1moRes.data.spendingOverview[0].no_transactions;
    if (oneMoIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashSpendingOverviewCacheCheck`, `__${Date.now()}__false`);
        console.error('successful spending overview res, no data included');
        return {
            spendingOverview24hrs: null,
            spendingOverview7days: null,
            spendingOverview2weeks: null,
            spendingOverview1mo: null,
            cacheSet: false,
            setLoadingTo: false,
            fatalError: true,
            oneDayIsTrue: oneDayIsTrue,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue
        }
    } else if (!oneMoIsTrue && twoWeeksIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashSpendingOverviewCacheCheck`, `__${Date.now()}__true`);
        console.error('successful spending overview res, no inside 2 weeks');
        return {
            spendingOverview24hrs: null,
            spendingOverview7days: null,
            spendingOverview2weeks: null,
            spendingOverview1mo: spendingOverview1moRes.data.spendingOverview,
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
            oneDayIsTrue: oneDayIsTrue,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue
        }
    } else if (!oneMoIsTrue && !twoWeeksIsTrue && oneWeekIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashSpendingOverviewCacheCheck`, `__${Date.now()}__true`);
        console.error('successful spending overview res, no inside 1 week');
        return {
            spendingOverview24hrs: null,
            spendingOverview7days: null,
            spendingOverview2weeks: spendingOverview2weeksRes.data.spendingOverview,
            spendingOverview1mo: spendingOverview1moRes.data.spendingOverview,
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
            oneDayIsTrue: oneDayIsTrue,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue
        }
    } else if (!oneMoIsTrue && !twoWeeksIsTrue && !oneWeekIsTrue && oneDayIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashSpendingOverviewCacheCheck`, `__${Date.now()}__true`);
        console.error('successful spending overview res, no inside 24 hrs');
        return {
            spendingOverview24hrs: null,
            spendingOverview7days: spendingOverview7daysRes.data.spendingOverview,
            spendingOverview2weeks: spendingOverview2weeksRes.data.spendingOverview,
            spendingOverview1mo: spendingOverview1moRes.data.spendingOverview,
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
            oneDayIsTrue: oneDayIsTrue,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue
        }
    } else if (!oneMoIsTrue && !twoWeeksIsTrue && !oneWeekIsTrue && !oneDayIsTrue) {
        return { fatalError: false }
    } else return { fatalError: true }
}
const setLocalStorageSpendingOverview = (expTime, spendingOverview24hrsRes, spendingOverview7daysRes, spendingOverview2weeksRes, spendingOverview1moRes) => {
    localStorage.setItem(`spendingOverviewCacheExpTime24hrs`, expTime.toString());
    localStorage.setItem(`spendingOverviewCachedData24hrs`, JSON.stringify(spendingOverview24hrsRes.data.spendingOverview));

    localStorage.setItem(`spendingOverviewCacheExpTime7days`, expTime.toString());
    localStorage.setItem(`spendingOverviewCachedData7days`, JSON.stringify(spendingOverview7daysRes.data.spendingOverview));

    localStorage.setItem(`spendingOverviewCacheExpTime2weeks`, expTime.toString());
    localStorage.setItem(`spendingOverviewCachedData2weeks`, JSON.stringify(spendingOverview2weeksRes.data.spendingOverview));

    localStorage.setItem(`spendingOverviewCacheExpTime1mo`, expTime.toString());
    localStorage.setItem(`spendingOverviewCachedData1mo`, JSON.stringify(spendingOverview1moRes.data.spendingOverview));

    // Cache check for dashboard
    localStorage.setItem(`dashSpendingOverviewCacheCheck`, `__${Date.now()}__true`);

    return {
        spendingOverview24hrs: spendingOverview24hrsRes.data.spendingOverview,
        spendingOverview7days: spendingOverview7daysRes.data.spendingOverview,
        spendingOverview2weeks: spendingOverview2weeksRes.data.spendingOverview,
        spendingOverview1mo: spendingOverview1moRes.data.spendingOverview,
        cacheSet: true,
        setLoadingTo: false,
        fatalError: false,
        oneDayIsTrue: false,
        oneWeekIsTrue: false,
        twoWeeksIsTrue: false,
        oneMoIsTrue: false
    }
}
// top merchants done
const checkForPartialResponsesTopMerchants = (expTime, topMerchants7daysRes, topMerchants2weeksRes, topMerchants30daysRes, topMerchants6moRes) => {
    const oneWeekIsTrue = topMerchants7daysRes.data.topMerchants[0].no_transactions;
    const twoWeeksIsTrue = topMerchants2weeksRes.data.topMerchants[0].no_transactions;
    const oneMoIsTrue = topMerchants30daysRes.data.topMerchants[0].no_transactions;
    const sixMoIsTrue = topMerchants6moRes.data.topMerchants[0].no_transactions;

    if (sixMoIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashTopMerchantsCacheCheck`, `__${Date.now()}__false`);
        console.error('successful top merchants res, no data included');
        return {
            topMerchants7daysRes: null,
            topMerchants2weeksRes: null,
            topMerchants30daysRes: null,
            topMerchants6moRes: null,
            cacheSet: false,
            setLoadingTo: false,
            fatalError: true,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue,
            sixMoIsTrue: sixMoIsTrue
        }
    } else if (!sixMoIsTrue && oneMoIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashTopMerchantsCacheCheck`, `__${Date.now()}__true`);
        console.error('successful top merchants res, no included one month');
        // setLocalStorageTopMerchants(expTime, null, null, null, topMerchants6moRes);
        return {
            topMerchants7daysRes: null,
            topMerchants2weeksRes: null,
            topMerchants30daysRes: null,
            topMerchants6moRes: topMerchants6moRes.data.topMerchants,
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue,
            sixMoIsTrue: sixMoIsTrue
        }
    } else if (!sixMoIsTrue && !oneMoIsTrue && twoWeeksIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashTopMerchantsCacheCheck`, `__${Date.now()}__true`);
        console.error('successful top merchants res, no included two weeks');
        // setLocalStorageTopMerchants(expTime, null, null, topMerchants30daysRes, topMerchants6moRes);
        return {
            topMerchants7daysRes: null,
            topMerchants2weeksRes: null,
            topMerchants30daysRes: topMerchants30daysRes.data.topMerchants,
            topMerchants6moRes: topMerchants6moRes.data.topMerchants,
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue,
            sixMoIsTrue: sixMoIsTrue
        }
    } else if (!sixMoIsTrue && !oneMoIsTrue && !twoWeeksIsTrue && oneWeekIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashTopMerchantsCacheCheck`, `__${Date.now()}__true`);
        console.error('successful top merchants res, no included one week');
        // setLocalStorageTopMerchants(expTime, null, topMerchants2weeksRes, topMerchants30daysRes, topMerchants6moRes);
        return {
            topMerchants7daysRes: null,
            topMerchants2weeksRes: topMerchants2weeksRes.data.topMerchants,
            topMerchants30daysRes: topMerchants30daysRes.data.topMerchants,
            topMerchants6moRes: topMerchants6moRes.data.topMerchants,
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue,
            sixMoIsTrue: sixMoIsTrue
        }
    } else if (!sixMoIsTrue && !oneMoIsTrue && !twoWeeksIsTrue && !oneWeekIsTrue) {
        // Cache check for dashboard
        localStorage.setItem(`dashTopMerchantsCacheCheck`, `__${Date.now()}__true`);
        return {
            topMerchants7daysRes: topMerchants7daysRes.data.topMerchants,
            topMerchants2weeksRes: topMerchants2weeksRes.data.topMerchants,
            topMerchants30daysRes: topMerchants30daysRes.data.topMerchants,
            topMerchants6moRes: topMerchants6moRes.data.topMerchants,
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
            oneWeekIsTrue: oneWeekIsTrue,
            twoWeeksIsTrue: twoWeeksIsTrue,
            oneMoIsTrue: oneMoIsTrue,
            sixMoIsTrue: sixMoIsTrue
        }
    } else {
        console.error('unknown error occurred checkForPartialResponsesTopMerchants');
        return {
            fatalError: true,
            cacheSet: false,
        }
    }
}
const setLocalStorageTopMerchants = (expTime, topMerchants7daysRes, topMerchants2weeksRes, topMerchants30daysRes, topMerchants6moRes) => {

    localStorage.setItem(`topMerchantsCacheExpTime7days`, expTime.toString());
    localStorage.setItem(`topMerchantsCachedData7days`, JSON.stringify(topMerchants7daysRes.data.topMerchants));
    localStorage.setItem(`topMerchantsCacheExpTime2weeks`, expTime.toString());
    localStorage.setItem(`topMerchantsCachedData2weeks`, JSON.stringify(topMerchants2weeksRes.data.topMerchants));
    localStorage.setItem(`topMerchantsCacheExpTime30days`, expTime.toString());
    localStorage.setItem(`topMerchantsCachedData30days`, JSON.stringify(topMerchants30daysRes.data.topMerchants));
    localStorage.setItem(`topMerchantsCacheExpTime6mo`, expTime.toString());
    localStorage.setItem(`topMerchantsCachedData6mo`, JSON.stringify(topMerchants6moRes.data.topMerchants));

    // Cache check for dashboard
    localStorage.setItem(`dashTopMerchantsCacheCheck`, `__${Date.now()}__true`);
    return {
        topMerchants7daysRes: topMerchants7daysRes.data.topMerchants,
        topMerchants2weeksRes: topMerchants2weeksRes.data.topMerchants,
        topMerchants30daysRes: topMerchants30daysRes.data.topMerchants,
        topMerchants6moRes: topMerchants6moRes.data.topMerchants,
        cacheSet: true,
        setLoadingTo: false,
        fatalError: false
    }
}
// set localstorage for account balance and total spending
const setLocalStorageDynamic = (functionName, data, expTime, objectKey) => {
    localStorage.setItem(`${functionName}CachedData`, JSON.stringify(data));
    localStorage.setItem(`${functionName}CacheExpTime`, expTime.toString());

    // Cache check
    localStorage.setItem(`${functionName}CacheCheck`, `__${Date.now()}__true`);
    return {
        [objectKey]: data,
        cacheSet: true,
        setLoadingTo: false,
        fatalError: false
    };
}
const checkForPartialResponseDynamic = (data, objectKey, expTime, functionName) => {
    if (!data) {
        // Cache check for dashboard
        localStorage.setItem(`${functionName}CacheCheck`, `__${Date.now()}__false`);
        console.error(`successful ${functionName} res, no data included`)
        return {
            [objectKey]: undefined,
            cacheSet: false,
            setLoadingTo: false,
            fatalError: true
        };
    } else if (data) return setLocalStorageDynamic(functionName, data, expTime, objectKey);
}
// map through array for line/bar chart
/*done*/const mapAndPopulateArrayCharts = (sevenDaysRes, oneMonthRes, threeMonthsRes, sixMonthsRes, oneYrRes, twoYrRes, noTransactions) => {
    let sevenDaysKeysArray = [];
    let oneMonthKeysArray = [];
    let threeMonthsKeysArray = [];
    let sixMonthsKeysArray = [];
    let oneYrKeysArray = [];
    let twoYrKeysArray = [];
    try {
        if (noTransactions.twoYrRes === true) {
            return {
                sevenDaysKeysArray: null,
                oneMonthKeysArray: null,
                threeMonthsKeysArray: null,
                sixMonthsKeysArray: null,
                oneYrKeysArray: null,
                twoYrKeysArray: null
            }
        }
        if (noTransactions.oneYrRes === true) {
            for (let i = 0; i < CHART_ELEMENTS.length; i++) {
                const objectToPush = { dataKey: CHART_ELEMENTS[i].dataKey,
                    stackId: CHART_ELEMENTS[i].stackId,
                    fill: CHART_ELEMENTS[i].fill
                }
                if (twoYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    twoYrKeysArray.push(objectToPush)
                }
            }
            return {
                sevenDaysKeysArray: null,
                oneMonthKeysArray: null,
                threeMonthsKeysArray: null,
                sixMonthsKeysArray: null,
                oneYrKeysArray: null,
                twoYrKeysArray: twoYrKeysArray
            }
        }
        if (noTransactions.sixMonthsRes === true) {
            for (let i = 0; i < CHART_ELEMENTS.length; i++) {
                const objectToPush = { dataKey: CHART_ELEMENTS[i].dataKey,
                    stackId: CHART_ELEMENTS[i].stackId,
                    fill: CHART_ELEMENTS[i].fill
                }
                if (oneYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    oneYrKeysArray.push(objectToPush)
                }
                if (twoYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    twoYrKeysArray.push(objectToPush)
                }
            }
            return {
                sevenDaysKeysArray: null,
                oneMonthKeysArray: null,
                threeMonthsKeysArray: null,
                sixMonthsKeysArray: null,
                oneYrKeysArray: oneYrKeysArray,
                twoYrKeysArray: twoYrKeysArray
            }
        }
        if (noTransactions.threeMonthsRes === true) {
            for (let i = 0; i < CHART_ELEMENTS.length; i++) {
                const objectToPush = { dataKey: CHART_ELEMENTS[i].dataKey,
                    stackId: CHART_ELEMENTS[i].stackId,
                    fill: CHART_ELEMENTS[i].fill
                }
                if (sixMonthsRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    sixMonthsKeysArray.push(objectToPush)
                }
                if (oneYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    oneYrKeysArray.push(objectToPush)
                }
                if (twoYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    twoYrKeysArray.push(objectToPush)
                }
            }
            return {
                sevenDaysKeysArray: null,
                oneMonthKeysArray: null,
                threeMonthsKeysArray: null,
                sixMonthsKeysArray: sixMonthsKeysArray,
                oneYrKeysArray: oneYrKeysArray,
                twoYrKeysArray: twoYrKeysArray
            }
        }
        if (noTransactions.oneMonthRes === true) {
            for (let i = 0; i < CHART_ELEMENTS.length; i++) {
                const objectToPush = { dataKey: CHART_ELEMENTS[i].dataKey,
                    stackId: CHART_ELEMENTS[i].stackId,
                    fill: CHART_ELEMENTS[i].fill
                }
                if (threeMonthsRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    threeMonthsKeysArray.push(objectToPush)
                }
                if (sixMonthsRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    sixMonthsKeysArray.push(objectToPush)
                }
                if (oneYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    oneYrKeysArray.push(objectToPush)
                }
                if (twoYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    twoYrKeysArray.push(objectToPush)
                }
            }
            return {
                sevenDaysKeysArray: null,
                oneMonthKeysArray: null,
                threeMonthsKeysArray: threeMonthsKeysArray,
                sixMonthsKeysArray: sixMonthsKeysArray,
                oneYrKeysArray: oneYrKeysArray,
                twoYrKeysArray: twoYrKeysArray
            }
        }
        if (noTransactions.sevenDaysRes === true) {
            for (let i = 0; i < CHART_ELEMENTS.length; i++) {
                const objectToPush = { dataKey: CHART_ELEMENTS[i].dataKey,
                    stackId: CHART_ELEMENTS[i].stackId,
                    fill: CHART_ELEMENTS[i].fill
                }
                if (oneMonthRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    oneMonthKeysArray.push(objectToPush)
                }
                if (threeMonthsRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    threeMonthsKeysArray.push(objectToPush)
                }
                if (sixMonthsRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    sixMonthsKeysArray.push(objectToPush)
                }
                if (oneYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    oneYrKeysArray.push(objectToPush)
                }
                if (twoYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                    twoYrKeysArray.push(objectToPush)
                }
            }
            return {
                sevenDaysKeysArray: null,
                oneMonthKeysArray: oneMonthKeysArray,
                threeMonthsKeysArray: threeMonthsKeysArray,
                sixMonthsKeysArray: sixMonthsKeysArray,
                oneYrKeysArray: oneYrKeysArray,
                twoYrKeysArray: twoYrKeysArray
            }
        }
        console.log('all are present, mapping all')
        for (let i = 0; i < CHART_ELEMENTS.length; i++) {
            const objectToPush = { dataKey: CHART_ELEMENTS[i].dataKey,
                stackId: CHART_ELEMENTS[i].stackId,
                fill: CHART_ELEMENTS[i].fill
            }
            if (sevenDaysRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                sevenDaysKeysArray.push(objectToPush)
            }
            if (oneMonthRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                oneMonthKeysArray.push(objectToPush)
            }
            if (threeMonthsRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                threeMonthsKeysArray.push(objectToPush)
            }
            if (sixMonthsRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                sixMonthsKeysArray.push(objectToPush)
            }
            if (oneYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                oneYrKeysArray.push(objectToPush)
            }
            if (twoYrRes.data.categories.includes(CHART_ELEMENTS[i].dataKey)) {
                twoYrKeysArray.push(objectToPush)
            }
        }
        return {
            sevenDaysKeysArray: sevenDaysKeysArray,
            oneMonthKeysArray: oneMonthKeysArray,
            threeMonthsKeysArray: threeMonthsKeysArray,
            sixMonthsKeysArray: sixMonthsKeysArray,
            oneYrKeysArray: oneYrKeysArray,
            twoYrKeysArray: twoYrKeysArray
        }
    }
    catch (error) {
        console.error('fatal error occurred inside mapAndPopulateArrayCharts()')
        console.error(error)
        return {
            sevenDaysKeysArray: null,
            oneMonthKeysArray: null,
            threeMonthsKeysArray: null,
            sixMonthsKeysArray: null,
            oneYrKeysArray: null,
            twoYrKeysArray: null
        }
    }

}
/*done*/const setLocalStorageCharts = (expTime, mapAndPopulateArrayChart, chartType, sevenDaysRes, oneMonthRes, threeMonthsRes, sixMonthsRes, oneYrRes, twoYrRes) => {
    localStorage.setItem(`chartCacheExpTimeSevenDays`, expTime.toString());
    localStorage.setItem(`chartCachedDataSevenDays`, JSON.stringify(sevenDaysRes.data.final.reverse()));
    localStorage.setItem(`chartCachedKeysArrSevenDays`, JSON.stringify(mapAndPopulateArrayChart.sevenDaysKeysArray));

    localStorage.setItem(`chartCacheExpTimeOneMonth`, expTime.toString());
    localStorage.setItem(`chartCachedDataOneMonth`, JSON.stringify(oneMonthRes.data.final.reverse()));
    localStorage.setItem(`chartCachedKeysArrOneMonth`, JSON.stringify(mapAndPopulateArrayChart.oneMonthKeysArray));

    localStorage.setItem(`chartCacheExpTimeThreeMonths`, expTime.toString());
    localStorage.setItem(`chartCachedDataThreeMonths`, JSON.stringify(threeMonthsRes.data.final.reverse()));
    localStorage.setItem(`chartCachedKeysArrThreeMonths`, JSON.stringify(mapAndPopulateArrayChart.threeMonthsKeysArray));

    localStorage.setItem(`chartCacheExpTimeSixMonths`, expTime.toString());
    localStorage.setItem(`chartCachedDataSixMonths`, JSON.stringify(sixMonthsRes.data.final.reverse()));
    localStorage.setItem(`chartCachedKeysArrSixMonths`, JSON.stringify(mapAndPopulateArrayChart.sixMonthsKeysArray));

    localStorage.setItem(`chartCacheExpTimeOneYear`, expTime.toString());
    localStorage.setItem(`chartCachedDataOneYear`, JSON.stringify(oneYrRes.data.final.reverse()));
    localStorage.setItem(`chartCachedKeysArrOneYear`, JSON.stringify(mapAndPopulateArrayChart.oneYrKeysArray));

    localStorage.setItem(`chartCacheExpTimeTwoYears`, expTime.toString());
    localStorage.setItem(`chartCachedDataTwoYears`, JSON.stringify(twoYrRes.data.final.reverse()));
    localStorage.setItem(`chartCachedKeysArrTwoYears`, JSON.stringify(mapAndPopulateArrayChart.twoYrKeysArray));

    // Cache check for stackedBarChart
    localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__true`);

    return {
        [`chartSevenDaysRes`]: sevenDaysRes.data.final.reverse(),
        sevenDaysKeysArray: mapAndPopulateArrayChart.sevenDaysKeysArray,
        [`chartOneMonthRes`]: oneMonthRes.data.final.reverse(),
        oneMonthKeysArray: mapAndPopulateArrayChart.oneMonthKeysArray,
        [`chartThreeMonthsRes`]: threeMonthsRes.data.final.reverse(),
        threeMonthsKeysArray: mapAndPopulateArrayChart.threeMonthsKeysArray,
        [`chartSixMonthsRes`]: sixMonthsRes.data.final.reverse(),
        sixMonthsKeysArray: mapAndPopulateArrayChart.sixMonthsKeysArray,
        [`chart1yrRes`]: oneYrRes.data.final.reverse(),
        oneYrKeysArray: mapAndPopulateArrayChart.oneYrKeysArray,
        [`chart2yrRes`]: twoYrRes.data.final.reverse(),
        twoYrKeysArray: mapAndPopulateArrayChart.twoYrKeysArray,
        fatalError: false,
        cacheSet: true,
    }
}
/*done*/const checkForPartialResponseCharts = (mapAndPopulateArrayChart, chartType, sevenDaysRes, oneMonthRes, threeMonthsRes, sixMonthsRes, oneYrRes, twoYrRes) => {
    if (twoYrRes.data.final.no_transactions) {
        // Cache check
        localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__false`);
        console.error(`successful res chart, no transactions found`);
        return {
            [`chartSevenDaysRes`]: null,
            sevenDaysKeysArray: null,
            [`chartOneMonthRes`]: null,
            oneMonthKeysArray: null,
            [`chartThreeMonthsRes`]: null,
            threeMonthsKeysArray: null,
            [`chartSixMonthsRes`]: null,
            sixMonthsKeysArray: null,
            [`chart1yrRes`]: null,
            oneYrKeysArray: null,
            [`chart2yrRes`]: null,
            twoYrKeysArray: null,
            fatalError: true,
            cacheSet: false,
        }
    }
    else if (twoYrRes.data.final.no_transactions && !oneYrRes.data.final.no_transactions) {
        // Cache check
        localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__true`);
        console.error(`successful res chart, no transactions found 1 year`);
        return {
            [`chartSevenDaysRes`]: sevenDaysRes.data.final,
            sevenDaysKeysArray: mapAndPopulateArrayChart.sevenDaysKeysArray,
            [`chartOneMonthRes`]: oneMonthRes.data.final,
            oneMonthKeysArray: mapAndPopulateArrayChart.oneMonthKeysArray,
            [`chartThreeMonthsRes`]: threeMonthsRes.data.final,
            threeMonthsKeysArray: mapAndPopulateArrayChart.threeMonthsKeysArray,
            [`chartSixMonthsRes`]: sixMonthsRes.data.final,
            sixMonthsKeysArray: mapAndPopulateArrayChart.sixMonthsKeysArray,
            [`chart1yrRes`]: oneYrRes.data.final,
            oneYrKeysArray: mapAndPopulateArrayChart.oneYrKeysArray,
            [`chart2yrRes`]: null,
            twoYrKeysArray: null,
            fatalError: false,
            cacheSet: true,
        }
    }
    else if (twoYrRes.data.final.no_transactions && oneYrRes.data.final.no_transactions && !sixMonthsRes.data.final.no_transactions) {
        // Cache check
        localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__true`);
        console.error(`successful res chart, no transactions found 6 months`);
        return {
            [`chartSevenDaysRes`]: sevenDaysRes.data.final,
            sevenDaysKeysArray: mapAndPopulateArrayChart.sevenDaysKeysArray,
            [`chartOneMonthRes`]: oneMonthRes.data.final,
            oneMonthKeysArray: mapAndPopulateArrayChart.oneMonthKeysArray,
            [`chartThreeMonthsRes`]: threeMonthsRes.data.final,
            threeMonthsKeysArray: mapAndPopulateArrayChart.threeMonthsKeysArray,
            [`chartSixMonthsRes`]: sixMonthsRes.data.final,
            sixMonthsKeysArray: mapAndPopulateArrayChart.sixMonthsKeysArray,
            [`chart1yrRes`]: null,
            oneYrKeysArray: null,
            [`chart2yrRes`]: null,
            twoYrKeysArray: null,
            fatalError: false,
            cacheSet: true,
        }
    }
    else if (twoYrRes.data.final.no_transactions && oneYrRes.data.final.no_transactions && sixMonthsRes.data.final.no_transactions && !threeMonthsRes.data.final.no_transactions) {
        // Cache check
        localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__true`);
        console.error(`successful res chart, no transactions found 3 months`);
        return {
            [`chartSevenDaysRes`]: sevenDaysRes.data.final,
            sevenDaysKeysArray: mapAndPopulateArrayChart.sevenDaysKeysArray,
            [`chartOneMonthRes`]: oneMonthRes.data.final,
            oneMonthKeysArray: mapAndPopulateArrayChart.oneMonthKeysArray,
            [`chartThreeMonthsRes`]: threeMonthsRes.data.final,
            threeMonthsKeysArray: mapAndPopulateArrayChart.threeMonthsKeysArray,
            [`chartSixMonthsRes`]: null,
            sixMonthsKeysArray: null,
            [`chart1yrRes`]: null,
            oneYrKeysArray: null,
            [`chart2yrRes`]: null,
            twoYrKeysArray: null,
            fatalError: false,
            cacheSet: true,
        }
    }
    else if (twoYrRes.data.final.no_transactions && oneYrRes.data.final.no_transactions && sixMonthsRes.data.final.no_transactions && threeMonthsRes.data.final.no_transactions && !oneMonthRes.data.final.no_transactions) {
        // Cache check
        localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__true`);
        console.error(`successful res chart, no transactions found 1 month`);
        return {
            [`chartSevenDaysRes`]: sevenDaysRes.data.final,
            sevenDaysKeysArray: mapAndPopulateArrayChart.sevenDaysKeysArray,
            [`chartOneMonthRes`]: oneMonthRes.data.final,
            oneMonthKeysArray: mapAndPopulateArrayChart.oneMonthKeysArray,
            [`chartThreeMonthsRes`]: null,
            threeMonthsKeysArray: null,
            [`chartSixMonthsRes`]: null,
            sixMonthsKeysArray: null,
            [`chart1yrRes`]: null,
            oneYrKeysArray: null,
            [`chart2yrRes`]: null,
            twoYrKeysArray: null,
            fatalError: false,
            cacheSet: true,
        }
    }
    else if (twoYrRes.data.final.no_transactions && oneYrRes.data.final.no_transactions && sixMonthsRes.data.final.no_transactions && threeMonthsRes.data.final.no_transactions && oneMonthRes.data.final.no_transactions && !sevenDaysRes.data.final.no_transactions) {
        // Cache check
        localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__true`);
        console.error(`successful res chart, no transactions found 7 days`);
        return {
            [`chartSevenDaysRes`]: sevenDaysRes.data.final,
            sevenDaysKeysArray: mapAndPopulateArrayChart.sevenDaysKeysArray,
            [`chartOneMonthRes`]: null,
            oneMonthKeysArray: null,
            [`chartThreeMonthsRes`]: null,
            threeMonthsKeysArray: null,
            [`chartSixMonthsRes`]: null,
            sixMonthsKeysArray: null,
            [`chart1yrRes`]: null,
            oneYrKeysArray: null,
            [`chart2yrRes`]: null,
            twoYrKeysArray: null,
            fatalError: false,
            cacheSet: true,
        }
    }
    else if (!twoYrRes.data.final.no_transactions && !oneYrRes.data.final.no_transactions && !sixMonthsRes.data.final.no_transactions && !threeMonthsRes.data.final.no_transactions && !oneMonthRes.data.final.no_transactions && !sevenDaysRes.data.final.no_transactions) return 'all_contain_data'
}

/*done*/const setLocalStorageInstitutions = (expTime, accounts) => {
    try {
        localStorage.setItem(`accountsCacheExpTime`, expTime.toString());
        localStorage.setItem(`accountsCachedData`, JSON.stringify(accounts));
        localStorage.setItem('accountsCacheCheck', `__${Date.now()}__true`);
        return {
            accounts: accounts,
            fatalError: false,
            cacheSet: true
        }
    } catch (error) {
        localStorage.setItem('accountsCacheCheck', `__${Date.now()}__false`);
        console.error(error)
        return {
            accounts: null,
            fatalError: true,
            cacheSet: false
        }
    }

}
/*done*/const checkForPartialResponseInstitutions = (accounts) => {
    if (accounts.length == 0) {
        return {
            accounts: false,
            cacheSet: false,
            fatalError: true
        } as ICheckAccounts
    } else return {
        accounts: true,
        cacheSet: false,
        fatalError: false
    } as ICheckAccounts
}

/*done*/const setLocalStorageDynamicTransactions = (expTime, data, ins_id) => {
    const accounts = data.map((data) => {
        console.log(data)
        return {
            ins_name: data.account.subtype,
            ins_id: data.account.account_id,
            account_name: data.account.account_name
        }
    })
    // cache check
    localStorage.setItem(`dynamicTransactions${ins_id}CacheCheck`, `__${Date.now()}__true`);
    localStorage.setItem(`dynamicTransactions${ins_id}CacheExpTime`, expTime.toString());
    localStorage.setItem(`dynamicTransactions${ins_id}CachedData`, JSON.stringify(data));
    const rawData = data;
    const transactions = data[0].account.transactions;
    const selected = data[0].account.account_id;
    return {
        accountTypes: accounts,
        rawData: rawData,
        transactions: transactions,
        selectedData: selected,
        fatalError: false,
        cacheSet: true
    }
}
/*done*/const checkForPartialResponseDynamicTransactions = (data) => {
    let toBeReturned;
    for (let i = 0; i < data.length; i++) {
        if (data[i].account.length === 0 || !data[i].account || !data[i]) {
            toBeReturned = {
                accountTypes: null,
                rawData: null,
                transactions: null,
                selectedData: null,
                fatalError: true,
                cacheSet: false
            }
            // cache check
            localStorage.setItem('dynamicTransactionsCacheCheck', `__${Date.now()}__false`);
            break;
        }
        else {
            toBeReturned = {
                fatalError: false,
                cacheSet: false
            }
        }
    }
    return toBeReturned;
}

/*done*/const checkAllDataIsPresent = (data) => {
/*    if (!categoryResponse.data.transactions || data.dataGridTransactions) {
        // cache check
        localStorage.setItem('allTransactionsCacheCheck', `__${Date.now()}__false`);
        return {
            message: 'data.dataGridTransactions is true, categoryResponse.data.transactions is false',
            cacheSet: false,
            fatalError: true,
        }
    } else if (categoryResponse.data.transactions || !data.dataGridTransactions) {
        // cache check
        localStorage.setItem('allTransactionsCacheCheck', `__${Date.now()}__false`);
        return {
            message: 'data.dataGridTransactions is false, categoryResponse.data.transactions is true',
            cacheSet: false,
            fatalError: true,
        }
    } else if (!categoryResponse.data.transactions || !data.dataGridTransactions) {
        // cache check
        localStorage.setItem('allTransactionsCacheCheck', `__${Date.now()}__false`);
        return {
            message: 'data.dataGridTransactions is false, categoryResponse.data.transactions is false',
            cacheSet: false,
            fatalError: true,
        }
    } else if (categoryResponse.data.transactions && data.dataGridTransactions) {
        return {
            message: 'both true',
            cacheSet: false,
            fatalError: false,
        }
    } else {
        // cache check
        localStorage.setItem('allTransactionsCacheCheck', `__${Date.now()}__false`);
        return {
            message: 'unknown error occurred inside check for missing data',
            cacheSet: false,
            fatalError: true,
        }
    }*/
    try {
        let fatalError = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].no_transactions) fatalError = true;
        }
        return { fatalError: fatalError }
    } catch (error) {
        console.error('error occurred checking allTransactions');
        console.error(error);
        return { fatalError: true }
    }

}
/*done*/const setLocalStorageAllTransactions = (expTime, data) => {
    try {
        // cache check
        localStorage.setItem('allTransactionsCacheCheck', `__${Date.now()}__true`);

        localStorage.setItem(`allTransactionsCacheExpTime`, expTime.toString());
        localStorage.setItem(`allTransactionsDataCache`, JSON.stringify(data.transactions));
        console.log(data.transactions)
        // localStorage.setItem(`allTransactionsCacheCategoryRows`, JSON.stringify(categoryResponse.data.transactions));
        return {
            transactions: data.transactions,
            cacheSet: true,
            fatalError: false,
        }
    } catch (error) {
        // cache check
        localStorage.setItem('allTransactionsCacheCheck', `__${Date.now()}__false`);
        console.error('error occurred setting local storage for allTransactions');
        console.error(error);
        return {
            transactions: data.transactions,
            cacheSet: false,
            fatalError: true,
        }
    }
}

/*not*/const checkForPartialResponseRecurring = (data) => {
    if (data.recurringTransactionsSummaryData.length == 0) {
        return {
            cacheSet: false,
            fatalError: true
        }
    } else return { fatalError: false, cacheSet: false }
}
/*done*/const setLocalStorageRecurring = (data) => {
    try {
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        const recurringTransactionsSummaryData = data.map((txn) => txn);
        localStorage.setItem(`recurringTransactionsCacheExpTime`, expTime.toString());
        localStorage.setItem(`recurringTransactionsCacheRows`, JSON.stringify(data));
        localStorage.setItem(`recurringTransactionsSummaryData`, JSON.stringify(recurringTransactionsSummaryData));

        // cache check
        localStorage.setItem(`recurringTransactionsCacheCheck`, `__${Date.now()}__true`);
        return {
            recurringTransactions: data.recurring_transactions,
            recurringTransactionsSummaryData: recurringTransactionsSummaryData,
            fatalError: false,
            cacheSet: true
        }
    } catch (error) {
        console.error(error);
        return {
            fatalError: true,
            cacheSet: false
        }
    }
}

/*
* Read localstorage for cache, if date is within 24 hours,
* and is true then don't rerun api calls,
* if false, rerun api calls
* return either true or false
*/
// success should also return {refresh: t/f}
/*done*/const checkForCache = (cacheCheckName) => {
    try {
        const cacheCheck = localStorage.getItem(cacheCheckName);
        if (!cacheCheck) return { success: false, refresh: true };
        if (cacheCheck.includes('false')) return { success: false, refresh: true };
        const date24hrAgo = Date.now() - 86400000;
        const cacheCheckDate = parseInt(cacheCheck.split('__')[1], 10);
        if (cacheCheckDate < date24hrAgo) return{ success: true, refresh: true };
        return { success: true, refresh: false }
    } catch (error) {
        console.error(`the below error occurred inside ${cacheCheckName}`)
        console.error(error);
        return { success: false }
    }
}

/*
* Read and return data from localstorage
*/

/*done*/const getInstitutionsCachedData = () => {
    try {
        return {
            accounts: JSON.parse(localStorage.getItem('accountsCachedData')),
            cacheSet: true,
            fatalError: false,
        }
    } catch (error) {
        console.error(error);
        return {
            accounts: null,
            cacheSet: false,
            fatalError: true
        }
    }
}
/*done*/const getChartCachedData = (chartType) => {
    try {
        return {
            chartSevenDaysRes: JSON.parse(localStorage.getItem(`chartCachedDataSevenDays`)),
            sevenDaysKeysArray: JSON.parse(localStorage.getItem(`chartCachedKeysArrSevenDays`)),
            chartOneMonthRes: JSON.parse(localStorage.getItem(`chartCachedDataOneMonth`)),
            oneMonthKeysArray: JSON.parse(localStorage.getItem(`chartCachedKeysArrOneMonth`)),
            chartThreeMonthsRes: JSON.parse(localStorage.getItem(`chartCachedDataThreeMonths`)),
            threeMonthsKeysArray: JSON.parse(localStorage.getItem(`chartCachedKeysArrThreeMonths`)),
            chartSixMonthsRes: JSON.parse(localStorage.getItem(`chartCachedDataSixMonths`)),
            sixMonthsKeysArray: JSON.parse(localStorage.getItem(`chartCachedKeysArrSixMonths`)),
            chart1yrRes: JSON.parse(localStorage.getItem(`chartCachedDataOneYear`)),
            oneYrKeysArray: JSON.parse(localStorage.getItem(`chartCachedKeysArrOneYear`)),
            chart2yrRes: JSON.parse(localStorage.getItem(`chartCachedDataTwoYears`)),
            twoYrKeysArray: JSON.parse(localStorage.getItem(`chartCachedKeysArrTwoYears`)),
            fatalError: false,
            cacheSet: true,
        }
    } catch (error) {
        console.error(error);
        return {
            chartSevenDaysRes: null,
            sevenDaysKeysArray: null,
            chartOneMonthRes: null,
            oneMonthKeysArray: null,
            chartThreeMonthsRes: null,
            threeMonthsKeysArray: null,
            chartSixMonthsRes: null,
            sixMonthsKeysArray: null,
            chart1yrRes: null,
            oneYrKeysArray: null,
            chart2yrRes: null,
            twoYrKeysArray: null,
            fatalError: true,
            cacheSet: false,
        }
    }
}
/*done*/const getPieChartCachedData = () => {
    try {
        return {
            pieChartSevenDaysRes: JSON.parse(localStorage.getItem(`pieChartCachedDataSevenDays`)),
            pieChartOneMonthRes: JSON.parse(localStorage.getItem(`pieChartCachedDataOneMonth`)),
            pieChartThreeMonthsRes: JSON.parse(localStorage.getItem(`pieChartCachedDataThreeMonths`)),
            pieChartSixMonthsRes: JSON.parse(localStorage.getItem(`pieChartCachedDataSixMonths`)),
            pieChart1yrRes: JSON.parse(localStorage.getItem(`pieChartCachedDataOneYear`)),
            pieChart2yrRes: JSON.parse(localStorage.getItem(`pieChartCachedDataTwoYears`)),
            fatalError: false,
            cacheSet: true,
        }
    } catch (error) {
        console.error(error);
        return {
            fatalError: true,
            cacheSet: false,
        }
    }
}
/*done*/const getTotalOrAccountCachedData = (functionName, objectKey) => {
    try {
        return {
            fatalError: false,
            cacheSet: true,
            [objectKey]: JSON.parse(localStorage.getItem(`${functionName}CachedData`)),
        }
    } catch (error) {
        console.error(error);
        return {
            fatalError: true,
            cacheSet: false,
        }
    }
}
/*done*/const getTopMerchantsCachedData = () => {
    try {
        return {
            topMerchants7daysRes: JSON.parse(localStorage.getItem(`topMerchantsCachedData7days`)),
            topMerchants2weeksRes: JSON.parse(localStorage.getItem(`topMerchantsCachedData2weeks`)),
            topMerchants30daysRes: JSON.parse(localStorage.getItem(`topMerchantsCachedData30days`)),
            topMerchants6moRes: JSON.parse(localStorage.getItem(`topMerchantsCachedData6mo`)),
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false
        }
    } catch (error) {
        console.error(error);
        return {
            fatalError: true,
            cacheSet: false,
        }
    }
}
/*done*/const getSpendingOverviewCachedData = () => {
    try {
        return {
            spendingOverview24hrs: JSON.parse(localStorage.getItem(`spendingOverviewCachedData24hrs`)),
            spendingOverview7days: JSON.parse(localStorage.getItem(`spendingOverviewCachedData7days`)),
            spendingOverview2weeks: JSON.parse(localStorage.getItem(`spendingOverviewCachedData2weeks`)),
            spendingOverview1mo: JSON.parse(localStorage.getItem(`spendingOverviewCachedData1mo`)),
            cacheSet: true,
            setLoadingTo: false,
            fatalError: false,
        }
    } catch (error) {
        console.error(error);
        return {
            fatalError: true,
            cacheSet: false,
        }
    }
}
/*done*/const getDynamicTransactionsCachedData = (ins_id) => {
    try {
        const data = JSON.parse(localStorage.getItem(`dynamicTransactions${ins_id}CachedData`));
        const accounts = data.map((data) => {
            return {
                ins_name: data.account.subtype,
                ins_id: data.account.account_id,
                account_name: data.account.account_name
            }
        })
        const transactions = data[0].account.transactions;
        const selected = data[0].account.account_id;
        return {
            accountTypes: accounts,
            rawData: data,
            transactions: transactions,
            selectedData: selected,
            fatalError: false,
        }
    } catch (error) {
        console.error(error);
        return {
            fatalError: true,
        }
    }
}
/*not*/const getRecurringTransactionsCachedData = () => {
    try {
        return {
            recurringTransactions: JSON.parse(localStorage.getItem(`recurringTransactionsCacheRows`)),
            recurringTransactionsSummaryData: JSON.parse(localStorage.getItem(`recurringTransactionsSummaryData`)),
            fatalError: false,
        }
    } catch (error) {
        console.error(error);
        return {
            fatalError: true,
        }
    }
}
/*done*/const getAllTransactionsCachedData = () => {
    try {
        return {
            transactions: JSON.parse(localStorage.getItem(`allTransactionsDataCache`)),
            cacheSet: true,
            fatalError: false,
        }
    } catch (error) {
        console.error('error occurred inside getAllTransactionsCachedData');
        console.error(error);
        return {
            fatalError: true,
        }
    }
}



const useProvideBackgroundFetch = () => {
    const auth = useAuth();

    // runs on every first load, first checks to see if cache has already been set
    // if it hasn't, then it will run all api calls to pre-cache data.
/*    useEffect(() => {
        if (!auth.user) return undefined;
        fetchData();
    }, [auth.user])*/

    /*done*/const fetchAccountBalance = async (forceRefresh:boolean) => {
        if (!forceRefresh) {
            if (checkForCache('accountBalanceCacheCheck').success === true && checkForCache('accountBalanceCacheCheck').refresh === false) {
                console.log('reading and returning cache');
                return getTotalOrAccountCachedData('accountBalance', 'accountDetails');
            }
        } else console.log('forcing refresh')
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        try {
            const accountBalanceConfig = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'accountDetails',
                    startDate: '2021-01-01',
                    endDate: '2022-01-01',
                }
            }
            const accountBalanceRes = await axios(accountBalanceConfig);

            return checkForPartialResponseDynamic(accountBalanceRes.data.accountDetails, 'accountDetails', expTime, 'accountBalance');
        } catch (error) {
            // Cache check for dashboard
            localStorage.setItem(`dashAccountBalanceCacheCheck`, `__${Date.now()}__false`);
            console.error('fatal error below occurred inside fetchAccountBalance()');
            console.error(error);
            return {
                accountDetails: undefined,
                cacheSet: false,
                setLoadingTo: false,
                fatalError: true
            }
        }
    }
    /*not*/const fetchTotalSpending = async (forceRefresh:boolean) => {
        if (!forceRefresh) {
            if (checkForCache('totalSpendingCacheCheck').success === true && checkForCache('totalSpendingCacheCheck').refresh === false) {
                console.log('reading and returning cache');
                return getTotalOrAccountCachedData('totalSpending', 'totalSpending');
            }
        } else console.log('forcing refresh')
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        console.log('startDate', moment().subtract(1, 'years').format('YYYY-MM-DD'));
        try {
            const totalSpendingConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: moment().subtract(1, 'years').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD'),
                    queryType: 'totalSpending',
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
                method: 'GET'
            }
            const totalSpendingRes = await axios(totalSpendingConfig)

            return checkForPartialResponseDynamic(totalSpendingRes.data.totalSpending, 'totalSpending', expTime, 'totalSpending');
        } catch (error) {
            // Cache check for dashboard
            localStorage.setItem(`totalSpendingCacheCheck`, `__${Date.now()}__false`);
            console.error('fatal error below occurred inside fetchTotalSpending()');
            console.error(error);
            return {
                totalSpending: undefined,
                cacheSet: false,
                setLoadingTo: false,
                fatalError: true
            }
        }
    }
    /*done*/const fetchTopMerchants = async (forceRetry:boolean) => {
        if (!forceRetry) {
            if (checkForCache('dashTopMerchantsCacheCheck').success === true && checkForCache('dashTopMerchantsCacheCheck').refresh === false) {
                console.log('reading and returning cache');
                return getTopMerchantsCachedData();
            }
        } else console.log('forcing retry');

        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        try {
            const topMerchants7daysConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'topMerchants',
                    merchantsStartDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                    merchantsEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };
            const topMerchants2weeksConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'topMerchants',
                    merchantsStartDate: moment().subtract(14, 'days').format('YYYY-MM-DD'),
                    merchantsEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };
            const topMerchants30daysConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'topMerchants',
                    merchantsStartDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
                    merchantsEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };
            const topMerchants6moConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'topMerchants',
                    merchantsStartDate: moment().subtract(6, 'months').format('YYYY-MM-DD'),
                    merchantsEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };

            const topMerchants7daysRes = await axios(topMerchants7daysConfig);
            const topMerchants2weeksRes = await axios(topMerchants2weeksConfig);
            const topMerchants30daysRes = await axios(topMerchants30daysConfig);
            const topMerchants6moRes = await axios(topMerchants6moConfig);

            let partialResCheck = checkForPartialResponsesTopMerchants(expTime, topMerchants7daysRes, topMerchants2weeksRes, topMerchants30daysRes, topMerchants6moRes);
             if (partialResCheck.fatalError == true) return partialResCheck;

            return setLocalStorageTopMerchants(expTime, topMerchants7daysRes,topMerchants2weeksRes, topMerchants30daysRes, topMerchants6moRes);
        } catch (error) {
            // Cache check for dashboard
            localStorage.setItem(`dashTopMerchantsCacheCheck`, `__${Date.now()}__false`);
            console.error('fatal error below occurred inside fetchTopMerchants()');
            console.error(error);
            return {
                topMerchants7daysRes: undefined,
                topMerchants2weeksRes: undefined,
                topMerchants30daysRes: undefined,
                topMerchants6moRes: undefined,
                cacheSet: false,
                setLoadingTo: false,
                fatalError: true
            }
        }
    }
    /*done*/const fetchSpendingOverview = async (forceRetry:boolean) => {
        if (!forceRetry) {
            console.log('force retry false, running cache check')
            if (checkForCache('dashSpendingOverviewCacheCheck').success === true && checkForCache('dashSpendingOverviewCacheCheck').refresh === false) {
                console.log('reading and returning cache');
                return getSpendingOverviewCachedData();
            }
        } else console.log('forceRetry is true');
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        try {
            const spendingOverview24hrsConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'spendingOverview',
                    spendingStartDate: moment().format('YYYY-MM-DD'),
                    spendingEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };
            const spendingOverview7daysConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'spendingOverview',
                    spendingStartDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                    spendingEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };
            const spendingOverview2weeksConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'spendingOverview',
                    spendingStartDate: moment().subtract(14, 'days').format('YYYY-MM-DD'),
                    spendingEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };
            const spendingOverview1moConfig = {
                params: {
                    user_id: auth.user.uid,
                    startDate: '2022-02-28',
                    endDate: '2022-06-05',
                    queryType: 'spendingOverview',
                    spendingStartDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
                    spendingEndDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dashboard',
            };

            const spendingOverview24hrsRes = await axios(spendingOverview24hrsConfig);
            const spendingOverview7daysRes = await axios(spendingOverview7daysConfig);
            const spendingOverview2weeksRes = await axios(spendingOverview2weeksConfig);
            const spendingOverview1moRes = await axios(spendingOverview1moConfig);

            let partialResCheck = checkForPartialResponsesSpendingOverview(spendingOverview24hrsRes, spendingOverview7daysRes, spendingOverview2weeksRes, spendingOverview1moRes);
            if (partialResCheck.fatalError == true ) return partialResCheck;

            return setLocalStorageSpendingOverview(expTime, spendingOverview24hrsRes, spendingOverview7daysRes, spendingOverview2weeksRes, spendingOverview1moRes);

        } catch (error) {
            // Cache check for dashboard
            localStorage.setItem(`dashSpendingOverviewCacheCheck`, `__${Date.now()}__false`);
            console.error('fatal error below occurred inside fetchSpendingOverview()');
            console.error(error);
            return {
                spendingOverview24hrs: null,
                spendingOverview7days: null,
                spendingOverview2weeks: null,
                spendingOverview1mo: null,
                cacheSet: false,
                setLoadingTo: false,
                fatalError: true,
                oneDayIsTrue: true,
                oneWeekIsTrue: true,
                twoWeeksIsTrue: true,
                oneMoIsTrue: true
            }
        }
    }
    /*done*/const fetchDashboard = async () => {
        try {
            return {
                accountBalance: await fetchAccountBalance(false),
                totalSpending: await fetchTotalSpending(false),
                topMerchants: await fetchTopMerchants(false),
                spendingOverview: await fetchSpendingOverview(false),
                overallFatalError: false
            }
        } catch (error) {
            console.error(error)
            return {
                accountBalance: null,
                totalSpending: null,
                topMerchants: null,
                spendingOverview: null,
                overallFatalError: true
            };
        }
    };

    // TODO: fetchLineChart && fetchStackedBarChart are basically the same, replace names to fetchBarOrLineChart to cut code in half
    /*not being used*//*const fetchLineChart = async () => {
        if (checkForCache('chartCacheCheck').success === true && checkForCache('chartCacheCheck').refresh === false) {
            console.log('reading and returning cache');
            return getChartCachedData('chart');
        }
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        const today = moment().format("YYYY-MM-DD");
        try {
            const lineChart7DaysConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'lineChart',
                    startDate: moment().subtract(1, 'weeks').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const lineChartSevenDaysRes = await axios(lineChart7DaysConfig);

            const lineChart1MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'lineChart',
                    startDate: moment().subtract(1, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const lineChartOneMonthRes = await axios(lineChart1MoConfig);

            const lineChart3MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'lineChart',
                    startDate: moment().subtract(3, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const lineChartThreeMonthsRes = await axios(lineChart3MoConfig);

            const lineChart6MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'lineChart',
                    startDate: moment().subtract(6, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const lineChartSixMonthsRes = await axios(lineChart6MoConfig);

            const lineChart1yrConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'lineChart',
                    startDate: moment().subtract(6, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const lineChart1yrRes = await axios(lineChart1yrConfig);

            const lineChart2yrConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'lineChart',
                    startDate: moment().subtract(6, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const lineChart2yrRes = await axios(lineChart2yrConfig);
/!*
            twoYrRes
            oneYrRes
            sixMonthsRes
            threeMonthsRes
            oneMonthRes
            sevenDaysRes*!/

            const noTransactions = {
                sevenDaysRes: lineChartSevenDaysRes.data.final[0].no_transactions,
                oneMonthRes: lineChartOneMonthRes.data.final[0].no_transactions,
                threeMonthsRes: lineChartThreeMonthsRes.data.final[0].no_transactions,
                sixMonthsRes: lineChartSixMonthsRes.data.final[0].no_transactions,
                oneYrRes: lineChart1yrRes.data.final[0].no_transactions,
                twoYrRes: lineChart2yrRes.data.final[0].no_transactions
            }

            const mapAndPopulateArrayChart = mapAndPopulateArrayCharts(lineChartSevenDaysRes, lineChartOneMonthRes, lineChartThreeMonthsRes, lineChartSixMonthsRes, lineChart1yrRes, lineChart2yrRes, noTransactions)

            if (!(checkForPartialResponseCharts(mapAndPopulateArrayChart, '', lineChartSevenDaysRes, lineChartOneMonthRes, lineChartThreeMonthsRes, lineChartSixMonthsRes, lineChart1yrRes, lineChart2yrRes) == 'all_contain_data')) {
                return checkForPartialResponseCharts(mapAndPopulateArrayChart, '', lineChartSevenDaysRes, lineChartOneMonthRes, lineChartThreeMonthsRes, lineChartSixMonthsRes, lineChart1yrRes, lineChart2yrRes)
            }

            return setLocalStorageCharts(expTime, mapAndPopulateArrayChart, '', lineChartSevenDaysRes, lineChartOneMonthRes, lineChartThreeMonthsRes, lineChartSixMonthsRes, lineChart1yrRes, lineChart2yrRes)

        } catch (error) {
            // Cache check for dashboard
            localStorage.setItem(`lineChartCacheCheck`, `__${Date.now()}__false`);
            console.error('fatal error occurred inside fetchLineChart()');
            return {
                lineChartSevenDaysRes: null,
                sevenDaysKeysArray: null,
                lineChartOneMonthRes: null,
                oneMonthKeysArray: null,
                lineChartThreeMonthsRes: null,
                threeMonthsKeysArray: null,
                lineChartSixMonthsRes: null,
                sixMonthsKeysArray: null,
                lineChart1yrRes: null,
                oneYrKeysArray: null,
                lineChart2yrRes: null,
                twoYrKeysArray: null,
                fatalError: true,
                cacheSet: false,
            }
        }
    }*/
    /*done*/const fetchLineOrBarChart = async () => {
        if (checkForCache('chartCacheCheck').success === true && checkForCache('chartCacheCheck').refresh === false) {
            console.log('reading and returning cache');
            return getChartCachedData('');
        }
        console.log('aint find, fetching.')
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        const today = moment().format("YYYY-MM-DD");
        try {
            const stackedBarChart7DaysConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'barChart',
                    startDate: moment().subtract(1, 'weeks').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const stackedBarChartSevenDaysRes = await axios(stackedBarChart7DaysConfig);

            const stackedBarChart1MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'barChart',
                    startDate: moment().subtract(1, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const stackedBarChartOneMonthRes = await axios(stackedBarChart1MoConfig);

            const stackedBarChart3MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'barChart',
                    startDate: moment().subtract(3, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const stackedBarChartThreeMonthsRes = await axios(stackedBarChart3MoConfig);

            const stackedBarChart6MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'barChart',
                    startDate: moment().subtract(6, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const stackedBarChartSixMonthsRes = await axios(stackedBarChart6MoConfig);

            const stackedBarChart1yrConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'barChart',
                    startDate: moment().subtract(1, 'years').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const stackedBarChart1yrRes = await axios(stackedBarChart1yrConfig);

            const stackedBarChart2yrConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'barChart',
                    startDate: moment().subtract(2, 'years').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const stackedBarChart2yrRes = await axios(stackedBarChart2yrConfig);

            const noTransactions = {
                sevenDaysRes: stackedBarChartSevenDaysRes.data.final[0].no_transactions,
                oneMonthRes: stackedBarChartOneMonthRes.data.final[0].no_transactions,
                threeMonthsRes: stackedBarChartThreeMonthsRes.data.final[0].no_transactions,
                sixMonthsRes: stackedBarChartSixMonthsRes.data.final[0].no_transactions,
                oneYrRes: stackedBarChart1yrRes.data.final[0].no_transactions,
                twoYrRes: stackedBarChart2yrRes.data.final[0].no_transactions
            }

            const mapAndPopulateArrayChart = mapAndPopulateArrayCharts(stackedBarChartSevenDaysRes, stackedBarChartOneMonthRes, stackedBarChartThreeMonthsRes, stackedBarChartSixMonthsRes, stackedBarChart1yrRes, stackedBarChart2yrRes, noTransactions)

            if (!(checkForPartialResponseCharts(mapAndPopulateArrayChart, 'chart', stackedBarChartSevenDaysRes, stackedBarChartOneMonthRes, stackedBarChartThreeMonthsRes, stackedBarChartSixMonthsRes, stackedBarChart1yrRes, stackedBarChart2yrRes) == 'all_contain_data')) {
                return checkForPartialResponseCharts(mapAndPopulateArrayChart, 'chart', stackedBarChartSevenDaysRes, stackedBarChartOneMonthRes, stackedBarChartThreeMonthsRes, stackedBarChartSixMonthsRes, stackedBarChart1yrRes, stackedBarChart2yrRes)
            }

            return setLocalStorageCharts(expTime, mapAndPopulateArrayChart, 'chart', stackedBarChartSevenDaysRes, stackedBarChartOneMonthRes, stackedBarChartThreeMonthsRes, stackedBarChartSixMonthsRes, stackedBarChart1yrRes, stackedBarChart2yrRes)
        } catch (error) {
            // Cache check for dashboard
            localStorage.setItem(`chartCacheCheck`, `__${Date.now()}__false`);
            console.error('fatal error occurred inside fetchStackedBarChart()');
            console.error(error);
            return {
                chartSevenDaysRes: null,
                sevenDaysKeysArray: null,
                chartOneMonthRes: null,
                oneMonthKeysArray: null,
                chartThreeMonthsRes: null,
                threeMonthsKeysArray: null,
                chartSixMonthsRes: null,
                sixMonthsKeysArray: null,
                chart1yrRes: null,
                oneYrKeysArray: null,
                chart2yrRes: null,
                twoYrKeysArray: null,
                fatalError: true,
                cacheSet: false,
            }
        }
    }
    // TODO: refactor this function (local storage etc)
    /*not*/const fetchPieChart = async () => {
        if (checkForCache('pieChartCacheCheck').success === true && checkForCache('pieChartCacheCheck').refresh === false) {
            console.log('reading and returning cache');
            return getPieChartCachedData();
        }
        //getPieChartCachedData
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        const today = moment().format("YYYY-MM-DD");
        try {
            const pieChart7DaysConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'pieChart',
                    startDate: moment().subtract(1, 'weeks').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const pieChartSevenDaysRes = await axios(pieChart7DaysConfig);

            const pieChart1MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'pieChart',
                    startDate: moment().subtract(1, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const pieChartOneMonthRes = await axios(pieChart1MoConfig);

            const pieChart3MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'pieChart',
                    startDate: moment().subtract(3, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const pieChartThreeMonthsRes = await axios(pieChart3MoConfig);

            const pieChart6MoConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'pieChart',
                    startDate: moment().subtract(6, 'months').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const pieChartSixMonthsRes = await axios(pieChart6MoConfig);

            const pieChart1yrConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'pieChart',
                    startDate: moment().subtract(1, 'years').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const pieChart1yrRes = await axios(pieChart1yrConfig);

            const pieChart2yrConfig = {
                method: "GET",
                url: '/api/visuals',
                params: {
                    user_id: auth.user.uid,
                    queryType: 'pieChart',
                    startDate: moment().subtract(2, 'years').format("YYYY-MM-DD"),
                    endDate: today,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const pieChart2yrRes = await axios(pieChart2yrConfig);

            if (!pieChartSevenDaysRes || !pieChartOneMonthRes || !pieChartThreeMonthsRes || !pieChartSixMonthsRes || !pieChart1yrRes || !pieChart2yrRes) {
                // Cache check
                localStorage.setItem(`pieChartCacheCheck`, `__${Date.now()}__false`);
                console.error('successful res, one or more res is undefined inside fetchPieChart()');
                return {
                    pieChartSevenDaysRes: pieChartSevenDaysRes.data.final,
                    pieChartOneMonthRes: pieChartOneMonthRes.data.final,
                    pieChartThreeMonthsRes: pieChartThreeMonthsRes.data.final,
                    pieChartSixMonthsRes: pieChartSixMonthsRes.data.final,
                    pieChart1yrRes: pieChart1yrRes.data.final,
                    pieChart2yrRes: pieChart2yrRes.data.final,
                    fatalError: true,
                    cacheSet: false,
                }
            }

            localStorage.setItem(`pieChartCacheExpTimeSevenDays`, expTime.toString());
            localStorage.setItem(`pieChartCachedDataSevenDays`, JSON.stringify(pieChartSevenDaysRes.data.final));

            localStorage.setItem(`pieChartCacheExpTimeOneMonth`, expTime.toString());
            localStorage.setItem(`pieChartCachedDataOneMonth`, JSON.stringify(pieChartOneMonthRes.data.final));

            localStorage.setItem(`pieChartCacheExpTimeThreeMonths`, expTime.toString());
            localStorage.setItem(`pieChartCachedDataThreeMonths`, JSON.stringify(pieChartThreeMonthsRes.data.final));

            localStorage.setItem(`pieChartCacheExpTimeSixMonths`, expTime.toString());
            localStorage.setItem(`pieChartCachedDataSixMonths`, JSON.stringify(pieChartSixMonthsRes.data.final));

            localStorage.setItem(`pieChartCacheExpTimeOneYear`, expTime.toString());
            localStorage.setItem(`pieChartCachedDataOneYear`, JSON.stringify(pieChart1yrRes.data.final));

            localStorage.setItem(`pieChartCacheExpTimeTwoYears`, expTime.toString());
            localStorage.setItem(`pieChartCachedDataTwoYears`, JSON.stringify(pieChart2yrRes.data.final));

            // Cache check for stackedBarChart
            localStorage.setItem(`pieChartCacheCheck`, `__${Date.now()}__true`);

            return {
                pieChartSevenDaysRes: pieChartSevenDaysRes.data.final,
                pieChartOneMonthRes: pieChartOneMonthRes.data.final,
                pieChartThreeMonthsRes: pieChartThreeMonthsRes.data.final,
                pieChartSixMonthsRes: pieChartSixMonthsRes.data.final,
                pieChart1yrRes: pieChart1yrRes.data.final,
                pieChart2yrRes: pieChart2yrRes.data.final,
                fatalError: false,
                cacheSet: true,
            }
        } catch (error) {
            // Cache check for dashboard
            localStorage.setItem(`pieChartCacheCheck`, `__${Date.now()}__false`);
            console.error('fatal error occurred inside fetchPieChart()');
            console.error(error);
            return {
                pieChartSevenDaysRes: null,
                pieChartOneMonthRes: null,
                pieChartThreeMonthsRes: null,
                pieChartSixMonthsRes: null,
                pieChart1yrRes: null,
                pieChart2yrRes: null,
                fatalError: true,
                cacheSet: false,
            }
        }
    }
    /*done*/const fetchVisualize = async () => {
        try {
            return {
                lineChart: await fetchLineOrBarChart(),
                stackedBarChart: await fetchLineOrBarChart(),
                pieChart: await fetchPieChart(),
                overallFatalError: false
            }
        } catch (error) {
            console.error(error)
            return {
                lineChart: null,
                stackedBarChart: null,
                pieChart: null,
                overallFatalError: true
            };
        }
    };


    /*done*/const fetchInstitutions = async () => {
        if (checkForCache('accountsCacheCheck').success === true && checkForCache('accountsCacheCheck').refresh === false) {
            console.log('reading and returning cache');
            return getInstitutionsCachedData();
        }
        try {
            console.log('fetching fresh data');
            const currentTime = Date.now();
            const expTime = currentTime + 86400000;
            const config = {
                method: "GET",
                url: '/api/allAccountInfo',
                params: {
                    user_id: auth.user.uid,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios(config);
            const accounts = data.accounts
            if (checkForPartialResponseInstitutions(accounts).accounts == false) return checkForPartialResponseInstitutions(accounts)
            return setLocalStorageInstitutions(expTime, accounts)
        } catch (error) {
            console.error(error)
            return {
                fatalError: true,
                cacheSet: false
            }
        }
    };


    /*done*/const fetchDynamicTransactions = async (ins_id:string) => {
        console.log(typeof ins_id);
        console.log(ins_id)
        if (checkForCache(`dynamicTransactions${ins_id}CacheCheck`).success === true && checkForCache(`dynamicTransactions${ins_id}CacheCheck`).refresh === false) {
            console.log('reading and returning cache');
            return getDynamicTransactionsCachedData(ins_id);
        }
        try {
            console.log('fetching fresh data');
            const currentTime = Date.now();
            const expTime = currentTime + 86400000;
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dynamicTransactions',
                params: {
                    user_id: auth.user.uid,
                    page_id: ins_id,
                    startDate: moment().subtract(2, 'years').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD'),
                }
            };
            const { data } = await axios(config);

            if (checkForPartialResponseDynamicTransactions(data).fatalError) return checkForPartialResponseDynamicTransactions(data);
            return setLocalStorageDynamicTransactions(expTime, data, ins_id);
        } catch (error) {
            // cache check
            localStorage.setItem('dynamicTransactionsCacheCheck', `__${Date.now()}__false`);
            console.error(error);
            return {
                accountTypes: null,
                rawData: null,
                transactions: null,
                selectedData: null,
                fatalError: true,
                cacheSet: false
            }
        }
    };

    // TODO: Figure out why fetchAllTransactions() is broken
    /*not*/const fetchAllTransactions = async (forceRetry:boolean) => {
        if (!forceRetry) {
            if (checkForCache('allTransactionsCacheCheck').success === true && checkForCache('allTransactionsCacheCheck').refresh === false) {
                console.log('reading and returning cache');
                return getAllTransactionsCachedData();
            }
        } else console.log('forcing retry');

        try {
            const currentTime = Date.now();
            const expTime = currentTime + 86400000;
            /*const byCategoryConfig = {
                method: "GET",
                url: '/api/allTransactionsByCategory',
                params: {
                    user_id: auth.user.uid,
                    startDate: moment().subtract(2, 'years').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const categoryResponse = await axios(byCategoryConfig);*/

            const config = {
                method: "GET",
                url: '/api/getAllTransactions',
                params: {
                    user_id: auth.user.uid,
                    startDate: moment().subtract(2, 'years').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD'),
                    queryType: 'datagrid',
                },
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const { data } = await axios(config);

            if (checkAllDataIsPresent(data).fatalError) {
                return checkAllDataIsPresent(data);
            }
            return setLocalStorageAllTransactions(expTime, data);
        } catch (error) {
            console.error('error occurred inside main allTransactions fetch');
            console.error(error);
            // cache check
            localStorage.setItem('allTransactionsCacheCheck', `__${Date.now()}__false`);
            return {
                transactions: null,
                cacheSet: false,
                fatalError: true,
            }
        }
    };


    /*not*/const fetchRecurring = async () => {
        if (checkForCache(`recurringTransactionsCacheCheck`).success === true && checkForCache(`recurringTransactionsCacheCheck`).refresh === false) {
            console.log('reading and returning cache');
            return getRecurringTransactionsCachedData();
        }
        try {
            const config = {
                method: "GET",
                url: '/api/recurring',
                params: {
                    user_id: auth.user.uid,
                    startDate: moment().subtract(2, 'years').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios(config);
            if (!data) return {
                fatalError: false,
                cacheSet: false,
                noData: true,
            }

            // if (checkForPartialResponseRecurring(data).fatalError) return checkForPartialResponseRecurring(data);
            return setLocalStorageRecurring(data);
        } catch (error) {
            console.error(error);
            return {
                fatalError: true,
                cacheSet: false
            }
        }
    };

    const fetchSettingsInfo = async () => {
        try {
            const profileConfig = {
                method: "GET",
                url: '/api/getSettingsInfo',
                params: {
                    user_id: auth.user.uid,
                    settingsType: 'profile'
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const profileData = await axios(profileConfig);

            const securityConfig = {
                method: "GET",
                url: '/api/getSettingsInfo',
                params: {
                    user_id: auth.user.uid,
                    settingsType: 'security'
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const securityData = await axios(securityConfig);

            return {
                profile: profileData.data,
                security: securityData.data,
            };
        } catch (error) {
            console.error(error)
        }
    }

    const setSettingsInfo = async (settingsType:string, data:any) => {
        try {
            const config = {
                method: "POST",
                url: '/api/setSettingsInfo',
                params: {
                    user_id: auth.user.uid,
                    settingsType,
                    data,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await axios(config);
            return response;
        } catch (error) {
            console.error(error)
        }
    }


    /*
    * Call this function to run all api calls
    * should be called on first load each day.
    * Only run individual api call functions on request,
    * ex: fatal error, force retry
    */
    /*done*/const fetchData = async () => {
        try {
            if (checkForCache('firstLoad').success && !checkForCache('firstLoad').refresh) {
                console.log('first daily load already happened');
                return { firstLoad: false };
            }
            localStorage.setItem(`firstLoad`, `__${Date.now()}__true`);
            return {
                fetchAllTransactions: await fetchAllTransactions(false),
               /* fetchRecurring: await fetchRecurring(),*/
                fetchInstitutions: await fetchInstitutions(),
                fetchVisualize: await fetchVisualize(),
                fetchDashboard: await fetchDashboard(),
                fatalError: false,
                firstLoad: true
            }
        }
        catch (error) {
            console.error(error);
            localStorage.setItem(`firstLoad`, `__${Date.now()}__false`);
            return {
                fetchAllTransactions: null,
                fetchRecurring: null,
                fetchInstitutions: null,
                fetchVisualize: null,
                fetchDashboard: null,
                fatalError: false,
                firstLoad: false
            }
        }
    }

    return {
        fetchAccountBalance,
        fetchSpendingOverview,
        fetchTopMerchants,
        fetchTotalSpending,
        fetchDashboard,
        fetchLineOrBarChart,
        fetchPieChart,
        fetchVisualize,
        fetchDynamicTransactions,
        fetchRecurring,
        fetchInstitutions,
        fetchData,
        fetchAllTransactions,
        fetchSettingsInfo,
        setSettingsInfo,
    };
    }
interface IUseProvideBackgroundFetch {
    fetchAccountBalance: (forceRefresh:boolean) => Promise<any>;
    fetchSpendingOverview: (forceRetry:boolean) => Promise<any>;
    fetchTopMerchants: (forceRetry:boolean) => Promise<any>;
    fetchTotalSpending: (forceRetry:boolean) => Promise<any>;
    fetchDashboard: () => Promise<any>;
    fetchLineChart: () => Promise<any>;
    fetchLineOrBarChart: () => Promise<any>;
    fetchPieChart: () => Promise<any>;
    fetchVisualize: () => Promise<any>;
    fetchDynamicTransactions: (ins_id:string) => Promise<any>;
    fetchRecurring: () => Promise<any>;
    fetchInstitutions: () => Promise<any>;
    fetchData: () => Promise<any>;
    fetchAllTransactions: (forceRetry:boolean) => Promise<any>;
    fetchSettingsInfo: () => Promise<any>;
    setSettingsInfo: (settingsType:string, data:any) => Promise<any>;
}

export const useBackgroundFetch = () => useContext(backgroundFetchContext) as IUseProvideBackgroundFetch;