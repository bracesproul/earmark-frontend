/* eslint-disable */
import React, {
    useState,
    useEffect,
} from 'react';
import Router from 'next/router';
import { useAuth } from '../../../lib/hooks/useAuth';
import PlaidLinkCopy from '../../PlaidLink'
import { usePLink } from '../../../lib/hooks/usePlaidLink';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard'; // for dashboard tab
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // for institutions tab
import PaidIcon from '@mui/icons-material/Paid'; // for txns tab 
import BarChartIcon from '@mui/icons-material/BarChart'; // for visualize tab
import ShowChartIcon from '@mui/icons-material/ShowChart'; // for investments tab
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // for transfers tab
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // for account tab
import LoginIcon from '@mui/icons-material/Login'; // for sign in tab
import LogoutIcon from '@mui/icons-material/Logout'; // for sign out tab
import CachedIcon from '@mui/icons-material/Cached';
import CableIcon from '@mui/icons-material/Cable';


const drawerWidth = 240;
// ['Transactions', 'Visualize', 'Investments', 'Transfers', 'Institutions']


const SIDENAV_OTHER_PAGES_AUTH = [
    {pageName: "Account", pageLink: "/account"},
    {pageName: "Sign Out", pageLink: "/auth/signIn"},
];

const SIDENAV_OTHER_PAGES_NO_AUTH = [
    {pageName: "Sign In", pageLink: "/auth/signIn"},
    {pageName: "Sign Up", pageLink: "/auth/signUp"},
];

const SideNav = () => {
    const auth = useAuth();
    const plaidLink = usePLink();
    useEffect(() => {
        // @ts-ignore
        if (!auth.user) return;
        // @ts-ignore
        plaidLink.fetchToken();
        // @ts-ignore
    }, [auth.user])
    const [otherPages, setOtherPages] = useState(SIDENAV_OTHER_PAGES_AUTH);
    const SIDENAV_PAGES = [
        {pageName: "Dashboard", pageLink: "/dashboard", isPlaidLink: false},
        {pageName: "Transactions", pageLink: "/dashboard/transactions", isPlaidLink: false},
        {pageName: "Visualize", pageLink: "/dashboard/visualize", isPlaidLink: false},
        {pageName: "Recurring", pageLink: "/dashboard/recurring", isPlaidLink: false},
        {pageName: "Investments", pageLink: "/dashboard/investments", isPlaidLink: false},
        {pageName: "Transfers", pageLink: "/dashboard/transfers", isPlaidLink: false},
        {pageName: "Institutions", pageLink: "/dashboard/institutions", isPlaidLink: false},
        {pageName: "Connect Bank", pageLink: "/dashboard/PLACEHOLDER", isPlaidLink: true},
    ];

    useEffect(() => {
        // @ts-ignore
        if (!auth.user) {
            setOtherPages(SIDENAV_OTHER_PAGES_NO_AUTH);
            return;
        }
        else {
            setOtherPages(SIDENAV_OTHER_PAGES_AUTH);
            return;
        }
    }, [auth]);

    const handleLogoClick = () => {
        Router.push('/');
    }

    const handleButtonClick = (index) => {
        // @ts-ignore
        if (index.isPlaidLink && !plaidLink.ready) {
            console.log('plaid link clicked');
            // @ts-ignore
            plaidLink.open();
            return;
        } else if (index.pageName == "Sign Out") {
            // @ts-ignore
            auth.signout();
            Router.push('/auth/signIn');
            return;
        }
        Router.push(index.pageLink);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
            >
            <Toolbar>
            <Typography onClick={handleLogoClick} variant="h6" noWrap>
            Earmark
            </Typography>
            </Toolbar>
            <Divider />
            {/* @ts-ignore */}
            { !auth.user ? null : 
            <>
            <List>
                {SIDENAV_PAGES.map((text, index) => (
                <ListItem onClick={index => handleButtonClick(text)} key={text.pageName} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        { index === 0 ? <DashboardIcon /> : null}
                        { index === 1 ? <PaidIcon /> : null }
                        { index === 2 ? <BarChartIcon /> : null }
                        { index === 3 ? <CachedIcon /> : null }
                        { index === 4 ? <ShowChartIcon /> : null }
                        { index === 5 ? <AttachMoneyIcon /> : null }
                        { index === 6 ? <AccountBalanceIcon /> : null }
                        { index === 7 ? <CableIcon /> : null }
                    </ListItemIcon>
                    <ListItemText primary={text.pageName} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Divider />
            </>
            }

            <List>
                {otherPages.map((text, index) => (
                <ListItem onClick={index => handleButtonClick(text)} key={text.pageName} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        { index === 0 ? <ManageAccountsIcon /> : null }
                        { index === 1 ? <LoginIcon /> : null }
                        { index === 2 ? <LogoutIcon /> : null }
                    </ListItemIcon>
                    <ListItemText primary={text.pageName} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            </Drawer>
        </Box>
    );
}

const PLink = () => {
    return (
        <>
        
        </>
    )
};

export default SideNav;