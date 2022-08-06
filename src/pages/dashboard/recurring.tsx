/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import RecurringTransactions from '../../components/RecurringTransactions';
import CssBaseline from '@mui/material/CssBaseline';

export default function NewHome() {
    return (
        <>
            <CssBaseline />
            <RecurringTransactions />
        </>
    )

}