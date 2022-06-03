/* eslint-disable */
import React, { 
    useState,
    useEffect,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { globalVars } from '../../src/lib/globalVars';
import { parseCookies } from '../../src/lib/parseCookies';

import PageTemplate from '../../src/components/PageTemplate';
import { Box, Grid } from '@mui/material';
import SpendingOverview from '../../src/components/Dashboard/SpendingOverview';
import TopMerchants from '../../src/components/Dashboard/TopMerchants';
import AccountBalance from '../../src/components/Dashboard/AccountBalance';
import Goals from '../../src/components/Dashboard/Goals';
import Budgets from '../../src/components/Dashboard/Budgets';
import TotalSpending from '../../src/components/Dashboard/TotalSpending';

const API_URL = globalVars().API_URL;


export async function getServerSideProps({ req, res }) {
    const cookie = parseCookies(req).user_id
    if (res) {
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


const Dashboard = ({ cookie }) => {
    console.log('COOKIE: ', cookie);

    return (
        <PageTemplate title="Dashboard" description="Dashboard overview for Earmark" >
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <SpendingOverview />
            </Grid>
            <Grid item xs={12}>
                <TopMerchants />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', margin: 'auto'}}>
                <Goals />
                <Budgets />
                <TotalSpending />
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', margin: 'auto'}}>
                <Goals />
                <Budgets />
                <TotalSpending />
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ margin: 'auto'}}>
                <AccountBalance />
            </Grid>
            </Grid>
        </PageTemplate>
    )
}

export default Dashboard;