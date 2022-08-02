/* eslint-disable */
import React, { 
    useState,
    useEffect,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/hooks/useAuth';
import { globalVars } from '../../lib/globalVars';
import { parseCookies } from '../../lib/parseCookies';

import PageTemplate from '../../components/PageTemplate';
import { Box, Grid } from '@mui/material';
import SpendingOverview from '../../components/Dashboard/SpendingOverview';
import TopMerchants from '../../components/Dashboard/TopMerchants';
import AccountBalance from '../../components/Dashboard/AccountBalance';
import Goals from '../../components/Dashboard/Goals';
import Budgets from '../../components/Dashboard/Budgets';
import TotalSpending from '../../components/Dashboard/TotalSpending';
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
    return (
        <PageTemplate title="Dashboard" description="Dashboard overview for Earmark">
            <Grid container spacing={3}>
                <Box sx={{ display: { xs: 'flex', md: 'flex' }, flexDirection: 'row', margin: 'auto'}}>
                    <Grid item xs={12}>
                        <SpendingOverview cookie={cookie} />
                    </Grid>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'flex' }, flexDirection: 'row', margin: 'auto'}}>
                    <Grid item xs={12}>
                        <TopMerchants cookie={cookie} />
                    </Grid>
                </Box>
                <Grid item xs={12}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', margin: 'auto'}}>
                        <Goals />
                        <Budgets />
                        <TotalSpending cookie={cookie} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', margin: 'auto'}}>
                        <Goals />
                        <Budgets />
                        <TotalSpending cookie={cookie} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ margin: 'auto'}}>
                    <AccountBalance cookie={cookie} />
                </Grid>
            </Grid>
        </PageTemplate>
    )
}

export default Dashboard;