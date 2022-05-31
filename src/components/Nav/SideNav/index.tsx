/* eslint-disable */
import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import Router from 'next/router';
import { useAuth } from '../../../lib/hooks/useAuth';
import Container from '@mui/material/Container';
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
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import PlaidLink from '../../PlaidLink'
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
const drawerWidth = 240;

type Anchor = 'left';

const SIDENAV_OTHER_PAGES_AUTH = [
    {pageName: "Account", pageLink: "/account"},
    {pageName: "Sign Out", pageLink: "/auth/signIn"},
];

const SIDENAV_OTHER_PAGES_NO_AUTH = [
    {pageName: "Sign In", pageLink: "/auth/signIn"},
    {pageName: "Sign Up", pageLink: "/auth/signUp"},
];
const SIDENAV_PAGES = [
    {pageName: "Dashboard", pageLink: "/dashboard", isPlaidLink: false},
    {pageName: "Transactions", pageLink: "/dashboard/transactions", isPlaidLink: false},
    {pageName: "Visualize", pageLink: "/dashboard/visualize", isPlaidLink: false},
    {pageName: "Recurring", pageLink: "/dashboard/recurring", isPlaidLink: false},
    {pageName: "Investments", pageLink: "/dashboard/investments", isPlaidLink: false},
    {pageName: "Transfers", pageLink: "/dashboard/transfers", isPlaidLink: false},
    {pageName: "Institutions", pageLink: "/dashboard/institutions", isPlaidLink: false},
];

const SideNav = () => {
    const SmallPageSideNav = () => {
        const auth = useAuth();
        const [state, setState] = useState(false);
      
        const [otherPages, setOtherPages] = useState(SIDENAV_OTHER_PAGES_AUTH);
        
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
    
        const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
            return;
            }
            setState(open);
        };
        const handleButtonClick = async (index) => {
            if (index.pageName == "Sign Out") {
                auth.signout();
                Router.push('/auth/signIn');
                return;
            }
            Router.push(index.pageLink);
        };

        const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
        { !auth.user ? null : 
        <>
        <List>
            {SIDENAV_PAGES.map((text, index) => (
            <a href={text.pageLink}>
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
                </ListItemIcon>
                <ListItemText primary={text.pageName} />
                </ListItemButton>
            </ListItem>
            </a>
            ))}
            <PlaidLink user_id={auth.user.uid} />
        </List>
        <Divider />
        </>
        }
            <Divider />
            <List>
            {otherPages.map((text, index) => (
                <a href={text.pageLink}>
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
                </a>
            ))}
            </List>
        </Box>
        );

        return (
        <div>
            <Button sx={{ position: 'fixed' }} onClick={toggleDrawer('left', true)}>
                <MenuIcon style={{ fontSize: 30 }}  />
            </Button>
            <Drawer
            anchor={'left'}
            open={state}
            onClose={toggleDrawer('left', false)}
            >
            {list('left')}
            </Drawer>
        </div>
        );
    }

    const ExpandedPageSideNav = () => {
        const auth = useAuth();
    
        const [otherPages, setOtherPages] = useState(SIDENAV_OTHER_PAGES_AUTH);
    
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
    
    
        const handleButtonClick = async (index) => {
            if (index.pageName == "Sign Out") {
                // @ts-ignore
                auth.signout();
                Router.push('/auth/signIn');
                return;
            }
            Router.push(index.pageLink);
        };
    
        return (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                <Typography sx={{ display: { xs: 'none', md: 'flex' } }} onClick={handleLogoClick} variant="h6" noWrap>
                Earmark
                </Typography>
                </Toolbar>
                <Divider />
                {/* @ts-ignore */}
                { !auth.user ? null : 
                <>
                <List>
                    {SIDENAV_PAGES.map((text, index) => (
                    <a href={text.pageLink}>
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
                        </ListItemIcon>
                        <ListItemText primary={text.pageName} />
                        </ListItemButton>
                    </ListItem>
                    </a>
                    ))}
                    <PlaidLink user_id={auth.user.uid} />
                </List>
                <Divider />
                </>
                }
    
                <List>
                    {otherPages.map((text, index) => (
                    <a href={text.pageLink}>
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
                    </a>
                    ))}
                </List>
                </Drawer>
            </Box>
        );
    }

    return (
        <div>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <ExpandedPageSideNav />
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <SmallPageSideNav />
        </Box>
        </div>
    )
};

export default SideNav;