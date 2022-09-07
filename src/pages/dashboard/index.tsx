/* eslint-disable */
import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { parseCookies } from '../../lib/parseCookies';
import PageTemplate from '../../components/PageTemplate';
import {
    Box, Divider,
    Grid, Typography
} from '@mui/material';
import SpendingOverview from '../../components/Dashboard/SpendingOverview';
import TopMerchants from '../../components/Dashboard/TopMerchants';
import AccountBalance from '../../components/Dashboard/AccountBalance';
import Goals from '../../components/Dashboard/Goals';
import Budgets from '../../components/Dashboard/Budgets';
import TotalSpending from '../../components/v2/TotalSpending';

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
            <Box
                sx={{
                width: '100%',
            }}>
                <Typography sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    paddingTop: '1rem',
                    paddingLeft: '4rem',
                }}>
                    Dashboard
                </Typography>
                <Divider sx={{ width: '100%', margin: 'auto 0' }} />
                <Grid container spacing={1}>
                    <Box sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }, flexDirection: 'row', margin: 'auto'}}>
                        <Grid item xs={6}>
                            <TopMerchants cookie={cookie} />
                        </Grid>
                        <Grid item xs={6}>
                            <SpendingOverview cookie={cookie} />
                        </Grid>
                    </Box>

                    <Divider sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }, width: '90%', margin: 'auto' }} />

                    <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'none' }, flexDirection: 'column', margin: 'auto'}}>
                        <Grid item xs={12}>
                            <TopMerchants cookie={cookie} />
                        </Grid>
                    </Box>

                    <Divider sx={{ display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'none' }, width: '90%', margin: 'auto' }} />

                    <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'none' }, flexDirection: 'column', margin: 'auto'}}>
                        <Grid item xs={12}>
                            <SpendingOverview cookie={cookie} />
                        </Grid>
                    </Box>

                    <Divider sx={{ display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'none' }, width: '90%', margin: 'auto' }} />

                    <Box sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }, flexDirection: 'row', margin: 'auto' }}>
                        <Grid item xs={6}>
                            <Goals />
                        </Grid>
                        <Grid item xs={6}>
                            <Budgets />
                        </Grid>
                    </Box>

                    <Divider sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }, width: '90%', margin: 'auto' }} />

                    <Box sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }, flexDirection: 'row', margin: 'auto' }}>
                        <Grid item xs={6}>
                            <TotalSpending />
                        </Grid>
                        <Grid item xs={6}>
                            <AccountBalance cookie={cookie} />
                        </Grid>
                    </Box>

                    <Grid item xs={12}>
                        <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'flex', xl: 'none' }, flexDirection: 'column', margin: 'auto' }}>
                            <Goals />
                            <Divider sx={{ width: '80%', margin: 'auto' }} />
                            <Budgets />
                            <Divider sx={{ width: '80%', margin: 'auto' }} />
                            <TotalSpending />
                            <Divider sx={{ width: '80%', margin: 'auto' }} />
                            <AccountBalance cookie={cookie} />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: { xs: 'flex', md: 'none', lg: 'none', xl: 'none' }, flexDirection: 'column', margin: 'auto'}}>
                            <Goals />
                            <Divider sx={{ width: '90%', margin: 'auto' }} />
                            <Budgets />
                            <Divider sx={{ width: '90%', margin: 'auto' }} />
                            <TotalSpending />
                            <Divider sx={{ width: '90%', margin: 'auto' }} />
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