/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import DynamicTransactions from '../../components/DynamicTransactions';

export default function Bank() {
    const { query } = useRouter();
    const [pageTitle, setPageTitle] = useState('Transactions');

    return (
        <>
            <CssBaseline />
            <DynamicTransactions query={query} />
        </>
    )
};

