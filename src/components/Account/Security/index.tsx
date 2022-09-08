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
    Card,
    CssBaseline
 } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Security = () => {
    const auth = useAuth();
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [editSuccessSecurity, setEditSuccessSecurity] = useState(null);
    const [securityButtonText, setSecurityButtonText] = useState("Save Changes");
    const [openReAuthDialog, setOpenReAuthDialog] = useState(false);
    const [fatalError, setFatalError] = useState('noerror')

    const cacheData = () => {
        if (typeof window == 'undefined') return;
        const currentTime = Date.now();
        const cacheExpTime = parseInt(localStorage.getItem(`securityCacheExpTime`));
        const cachedFName = JSON.parse(localStorage.getItem(`securityCachedFName`));
        const cachedLName = JSON.parse(localStorage.getItem(`securityCachedLName`));
        const cachedEmail = JSON.parse(localStorage.getItem(`securityCachedEmail`));
        const cachedPhone = JSON.parse(localStorage.getItem(`securityCachedPhone`));
        if (!cacheExpTime || !cachedFName || !cachedLName || !cachedEmail || !cachedPhone) {
            fetchSecurityData();
            return;
        } else if (cacheExpTime < currentTime) {
            fetchSecurityData();
            return;
        } else if (cacheExpTime > currentTime) {
            setFirstName(cachedFName);
            setLastName(cachedLName);
            setEmail(cachedEmail);
            setPhone(cachedPhone);
            return;
        }
    }

    useEffect(() => {
        if (typeof window == "undefined") return undefined;
        cacheData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setEditSuccessSecurity(null);
            setSecurityButtonText("Save Changes");
        }, 2000)
    }, [editSuccessSecurity]);
  
    const handleSubmitSecurity = async (event) => {
      event.preventDefault();
      try {
        const currentTime = Date.now();
        const expTime = currentTime + 604800000;
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
            setOpenReAuthDialog(true);
            localStorage.setItem(`securityCacheExpTime`, expTime.toString());
            localStorage.setItem(`securityCachedFName`, JSON.stringify(firstName));
            localStorage.setItem(`securityCachedLName`, JSON.stringify(lastName));
            localStorage.setItem(`securityCachedEmail`, JSON.stringify(email));
            localStorage.setItem(`securityCachedPhone`, JSON.stringify(phone));
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setPhone(phone);
        } 
    } catch (error) {
        if (error.response.data === 'error') {
            setEditSuccessSecurity('error.light');
            setSecurityButtonText("Changes failed to save");
        }
    }
  };

  const fetchSecurityData = async () => {
    try {
        const currentTime = Date.now();
        const expTime = currentTime + 604800000;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                user_id: auth.user.uid,
            },
            method: "GET",
            url: '/api/ADDAPIROUTEHERE',
        }
        const { data } = await axios(config);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone);
        localStorage.setItem(`securityCacheExpTime`, expTime.toString());
        localStorage.setItem(`securityCachedFName`, JSON.stringify(data.firstName));
        localStorage.setItem(`securityCachedLName`, JSON.stringify(data.lastName));
        localStorage.setItem(`securityCachedEmail`, JSON.stringify(data.email));
        localStorage.setItem(`securityCachedPhone`, JSON.stringify(data.phone));
    } catch (error) {
        console.error(error)
        setFatalError(error)
    }
  }
  
  
    return (
      <>
      <Box>
      <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: '400px', maxWidth: '500px', paddingBottom: '10px', margin: '1rem auto'}} elevation={3}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
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
                    </Box>
                </Container>
            </Card>
      </Box>    
      </>
    )
}

export default Security;