/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageTemplateResponsive from '../../components/PageTemplate';
import DynamicTransactions from '../../components/DynamicTransactions';

export default function Bank() {
    const { query } = useRouter();
    const [pageTitle, setPageTitle] = useState('Transactions');

    return (
        <PageTemplateResponsive title={pageTitle} description="Dashboard overview for Earmark">
            <DynamicTransactions query={query} />
        </PageTemplateResponsive>
    )
};

