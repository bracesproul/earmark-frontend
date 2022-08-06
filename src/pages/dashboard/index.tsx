/* eslint-disable */
import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { parseCookies } from '../../lib/parseCookies';
import PageTemplate from '../../components/PageTemplate';
import {
    Box,
    Grid
} from '@mui/material';
import SpendingOverview from '../../components/Dashboard/SpendingOverview';
import TopMerchants from '../../components/Dashboard/TopMerchants';
import AccountBalance from '../../components/Dashboard/AccountBalance';
import Goals from '../../components/Dashboard/Goals';
import Budgets from '../../components/Dashboard/Budgets';
import TotalSpending from '../../components/Dashboard/TotalSpending';

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
        <>
            <CssBaseline />
            <Box sx={{
                width: '100%',
            }}>
                <Grid container spacing={3} sx={{
                    marginTop: '1rem',
                }}>
                    <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }, flexDirection: 'row', margin: 'auto'}}>
                        <Grid item xs={12}>
                            <SpendingOverview cookie={cookie} />
                        </Grid>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }, flexDirection: 'row', margin: 'auto'}}>
                        <Grid item xs={12}>
                            <TopMerchants cookie={cookie} />
                        </Grid>
                    </Box>

                    <Grid item xs={12}>
                        <Box sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }, flexDirection: 'row', margin: 'auto' }}>
                            <Goals />
                            <Budgets />
                            <TotalSpending cookie={cookie} />
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }, flexDirection: 'row', margin: 'auto' }}>
                            <AccountBalance cookie={cookie} />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'flex', xl: 'none' }, flexDirection: 'column', margin: 'auto' }}>
                            <Goals />
                            <Budgets />
                            <TotalSpending cookie={cookie} />
                            <AccountBalance cookie={cookie} />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: { xs: 'flex', md: 'none', lg: 'none', xl: 'none' }, flexDirection: 'column', margin: 'auto'}}>
                            <Goals />
                            <Budgets />
                            <TotalSpending cookie={cookie} />
                            <AccountBalance cookie={cookie} />
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </>
    )
}

export default Dashboard;

/*



                <Grid container spacing={3} sx={{
                    marginTop: '1rem',
                }}>
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
                        <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex', xl: 'flex' }, flexDirection: 'row', left: '50%', right: '50%', margin: 'auto' }}>
                            <Goals />
                            <Budgets />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none', xl: 'none' }, flexDirection: 'column', margin: 'auto'}}>
                            <Goals />
                            <Budgets />
                            <TotalSpending cookie={cookie} />
                            <AccountBalance cookie={cookie} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ margin: 'auto', display: {xs: 'none', md: 'flex'}, flexDirection: 'row' }}>
                        <TotalSpending cookie={cookie} />
                        <AccountBalance cookie={cookie} />
                    </Grid>
                </Grid>
 */