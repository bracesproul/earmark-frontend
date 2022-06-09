/* eslint-disable */
import React from 'react';
import { useRouter } from 'next/router';
import PageTemplateResponsive from '../../src/components/PageTemplate';
import DynamicTransactions from '../../src/components/DynamicTransactions';

export default function Bank() {
    const { query } = useRouter();

    return (
        <PageTemplateResponsive title="Dashboard" description="Dashboard overview for Earmark">
            <DynamicTransactions query={query} />
        </PageTemplateResponsive>
    )
};

