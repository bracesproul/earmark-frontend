/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useRouter } from 'next/router';
import { Link,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider,
  Grid,
  TextField,
 } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const pages = [
    {pageName: 'Security', pageLink: 'security'},   
    {pageName: 'Account', pageLink: 'account'},
    {pageName: 'Privacy', pageLink: 'privacy'},
    {pageName: 'Help', pageLink: 'help'},
    {pageName: 'Additional', pageLink: 'additional'},
];

const TopNav = () => {
  const auth = useAuth();
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [currentPage, setCurrentPage] = useState('account')

  useEffect(() => {
      switch (router.query.q) {
            case 'account':
                setCurrentPage('account')
                break;
            case 'security':
                setCurrentPage('security')
                break;
            case 'privacy':
                setCurrentPage('privacy')
                break;
            case 'privacy':
                setCurrentPage('privacy')
                break;
            case 'help':
                setCurrentPage('help')
                break;
            case 'additional':
                setCurrentPage('additional')
                break;
      }
  }, [router])


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
      setAnchorElNav(null);
  };

  const handleNavSelect = (page) => {
    handleCloseNavMenu();
    router.push(`${router.pathname}?q=${page.pageLink}`)
  }

  return (
    <>
    <AppBar position="static" sx={{ display: { sx: 'none', md: 'flex' }}}>
      <Container sx={{
        display: { sx: 'none', md: 'flex' }
      }}>
        <Toolbar
        sx={{ 
            display: { sx: 'none', md: 'flex' },
            width: '100%',
        }}
        >
          {/* shows when page is small */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ margin: '0 0 0 auto' }}
            >
              <MenuIcon sx={{ color: 'black' }} />
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
                <MenuItem sx={{ color: 'black' }} key={page.pageName} onClick={e => handleNavSelect(page)}>
                  <Link
                  textAlign="center"
                  underline="none"
                  color="inherit"
                  href={`?q=${page.pageLink}`}
                  >
                    {page.pageName}
                  </Link>
                </MenuItem>
              ))}
              <Divider />
            </Menu>
          </Box>

          {/* shows when page is expanded */}
          <Box sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.pageName}
                onClick={e => handleNavSelect(page)}
                sx={{ my: 2, color: '#616161', display: 'block', fontSize: '14px', fontWeight: '500'}}
              >
                <Link
                  textAlign="center"
                  underline="none"
                  color="inherit"
                  href={`?q=${page.pageLink}`}
                >
                  {page.pageName}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};

export default TopNav;

const Account = () => {
  const auth = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [editSuccessSecurity, setEditSuccessSecurity] = useState(null);
  const [securityButtonText, setSecurityButtonText] = useState("Save Changes");
  const [openReAuthDialog, setOpenReAuthDialog] = useState(false);

  const handleSubmitSecurity = async (event) => {
    event.preventDefault();
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                user_id: auth.user.uid,
                func: 'updateUserSecurity',
                params: {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    email: email,
                    password: password,
                }
            },
            method: "GET",
            url: '/api/updateAccount',
        }
        const response = await axios(config);
        if (response.data.response === 'success') {
            setEditSuccessSecurity('success.light');
            setSecurityButtonText("Success!");
            setOpenReAuthDialog(true)
        } 
    } catch (error) {
        if (error.response.data === 'error') {
            setEditSuccessSecurity('error.light');
            setSecurityButtonText("Changes failed to save");
        }
    }
};


  return (
    <>
    <Box component="form" noValidate onSubmit={handleSubmitSecurity} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
      <Typography margin="auto" variant="h5" component="h5" sx={{ fontSize: '25px'}}>
      Security
      </Typography>
      <Grid item xs={12}>
          <TextField
          name="firstName"
          autoFocus
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
          fullWidth
          id="firstName"
          label="First Name"
          />
      </Grid>
      <Grid item xs={12}>
          <TextField
          fullWidth
          autoFocus
          id="lastName"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
          label="Last Name"
          name="lastName"
          />
      </Grid>
      <Grid item xs={12}>
          <TextField
          fullWidth
          autoFocus
          id="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          label="Email Address"
          name="email"
          />
      </Grid>
      <Grid item xs={12}>
          <TextField
          fullWidth
          autoFocus
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          label="Password"
          type="password"
          id="password"
          />
      </Grid>
      <Grid item xs={12}>
          <TextField
          fullWidth
          autoFocus
          name="phone"
          value={phone}
          onChange={event => setPhone(event.target.value)}
          label="Phone"
          type="tel"
          id="phone"
          />
      </Grid>
      </Grid>
      <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ backgroundColor: editSuccessSecurity, mt: 3, mb: 2 }}
      >
      {securityButtonText}
      </Button>
      <Grid container justifyContent="flex-end">
      </Grid>
    </Box>
    </>
  )
}