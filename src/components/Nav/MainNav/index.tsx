/* eslint-disable */
import React, {
    useState,
} from 'react';
import Router from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Divider from '@mui/material/Divider';

const pages = [
    {pageName: 'Services', pageLink: '#services'},
    {pageName: 'Pricing', pageLink: '#pricing'},
    {pageName: 'About', pageLink: '#about'},
];

const userPages = [
    {pageName: 'Account', pageLink: '/account'},
    {pageName: 'Sign In', pageLink: '/auth/signIn'},
    {pageName: 'Sign Up', pageLink: '/auth/signUp'},
]

const MainNav = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavSelect = (page) => {
        console.log('page', page);
        handleCloseNavMenu();
        console.log(page.pageLink);
        Router.push(page.pageLink);
    }
  
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'system-ui',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            Earmark
            </Typography>
            {/* shows when page is small */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.pageName} onClick={e => handleNavSelect(page)}>
                    <Typography textAlign="center">{page.pageName}</Typography>
                  </MenuItem>
                ))}
                <Divider />
                {userPages.map((page) => (
                  <MenuItem key={page.pageName} onClick={e => handleNavSelect(page)}>
                    <Typography textAlign="center">{page.pageName}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* shows when page is expanded */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'system-ui',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Earmark
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.pageName}
                  onClick={e => handleNavSelect(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.pageName}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {userPages.map((page) => (
                <Button
                  key={page.pageName}
                  onClick={e => handleNavSelect(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.pageName}
                </Button>
              ))}
            </Box>
  
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

export default MainNav;



