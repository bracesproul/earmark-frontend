/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import RecurringTransactions from '../../components/RecurringTransactions';
import PageTemplate from '../../components/PageTemplate';

export default function NewHome() {
    return (
        <PageTemplate title="Recurring" description="Recurring transactions">
            <RecurringTransactions />
        </PageTemplate>
    )

}