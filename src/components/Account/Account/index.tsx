/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useAuth } from '../../../lib/hooks/useAuth';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { globalVars } from '../../../lib/globalVars';

import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    getDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOnXDWQ369OM1lW0VC5FdYE19q1ug0_dc",
    authDomain: "earmark-8d1d3.firebaseapp.com",
    projectId: "earmark-8d1d3",
    storageBucket: "earmark-8d1d3.appspot.com",
    messagingSenderId: "46302537330",
    appId: "1:46302537330:web:403eac7f28d2a4868944eb",
    measurementId: "G-5474KY2MRV"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const STATE_ARRAY = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
const API_URL = globalVars().API_URL;

const theme = createTheme();

export default function Account() {
    const auth = useAuth();
    const [editSuccessSecurity, setEditSuccessSecurity] = useState(null);
    const [editSuccessAddress, setEditSuccessAddress] = useState(null);
    const [editSuccessPersonal, setEditSuccessPersonal] = useState(null);

    const [securityButtonText, setSecurityButtonText] = useState("Save Changes");
    const [addressButtonText, setAddressButtonText] = useState("Save Changes");
    const [personalButtonText, setPersonalButtonText] = useState("Save Changes");

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const [birthday, setBirthday] = useState('');
    const [username, setUsername] = useState('');

    const getUserInfo = async () => {
        /* @ts-ignore */
        const userRef = doc(db, "users", auth.user.uid);
        const docSnap = await getDoc(userRef);
    
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data().account_id);
            setFirstName(docSnap.data().first_name);
            setLastName(docSnap.data().last_name);
            setEmail(docSnap.data().email);
            setPhone(docSnap.data().phone_number);
            setStreet1(docSnap.data().address_street);
            setStreet2(docSnap.data().address_street2);
            setCity(docSnap.data().address_city);
            setState(docSnap.data().address_state);
            setZip(docSnap.data().address_zip);
            setBirthday(docSnap.data().date_of_birth);
            setUsername(docSnap.data().userId);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };

    useEffect(() => {
        if (!auth.user) return;
        getUserInfo();
    } , [auth.user]);

    useEffect(() => {
        setTimeout(() => {
            setEditSuccessSecurity(null);
            setSecurityButtonText("Save Changes");
            setEditSuccessAddress(null);
            setAddressButtonText("Save Changes");
            setEditSuccessPersonal(null);
            setPersonalButtonText("Save Changes");
        }, 2000)
    }, [editSuccessSecurity, editSuccessAddress, editSuccessPersonal]);
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
                    }
                },
                method: "GET",
                url: '/api/updateAccount',
            }
            const response = await axios(config);
            if (response.data.response === 'success') {
                setEditSuccessSecurity('success.main');
                setSecurityButtonText("Success!");
            } 
        } catch (error) {
            if (error.response.data === 'error') {
                setEditSuccessSecurity('error.main');
                setSecurityButtonText("Changes failed to save");
            }
        }
    };

    const handleSubmitAddress = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    user_id: auth.user.uid,
                    func: 'updateUserAddress',
                    params: {
                        addressStreet: street1,
                        addressStreet2: street2,
                        addressCity: city,
                        addressState: state,
                        addressZip: zip,
                    }
                },
                method: "GET",
                url: '/api/updateAccount',
            }
            const response = await axios(config);
            if (response.data.response === 'success') {
                setEditSuccessAddress('success.main');
                setAddressButtonText("Success!");
            } 
        } catch (error) {
            if (error.response.data === 'error') {
                setEditSuccessAddress('error.main');
                setAddressButtonText("Changes failed to save");
            }
        }
    };

    const handleSubmitPersonal = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    user_id: auth.user.uid,
                    func: 'updateUserPersonal',
                    params: {
                        date_of_birth: birthday,
                        username: username,
                    }
                },
                method: "GET",
                url: '/api/updateAccount',
            }
            const response = await axios(config);
            if (response.data.response === 'success') {
                console.log('success personal');
                setEditSuccessPersonal('success.main');
                setPersonalButtonText("Success!");
            } 
        } catch (error) {
            console.log(error)
            if (error.response.data === 'error') {
                setEditSuccessPersonal('error.main');
                setPersonalButtonText("Changes failed to save");
            }
        }
    };

    return (
        <ThemeProvider theme={theme} >
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', padding: '3rem'}}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', padding: '20px', margin: '2rem auto'}} elevation={3}>
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
                        <Typography margin="auto" variant="h4" component="h4">
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
            </Paper>

            <Paper sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', padding: '20px', margin: '2rem auto'}} elevation={3}>
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
                    <Box component="form" noValidate onSubmit={handleSubmitAddress} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Typography margin="auto" variant="h4" component="h4">
                        Address
                        </Typography>
                        <Grid item xs={12}>
                            <TextField
                            autoComplete="street"
                            value={street1}
                            onChange={event => setStreet1(event.target.value)}
                            name="street1"
                            fullWidth
                            id="street1"
                            label="Address line 1"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            autoComplete="street"
                            value={street2}
                            onChange={event => setStreet2(event.target.value)}
                            name="street2"
                            fullWidth
                            id="street2"
                            label="Address line 2"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            id="city"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                            label="City"
                            name="city"
                            autoComplete="city"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <InputLabel id="selectStateLabel">State</InputLabel>
                        <Select
                            labelId="selectStateLabel"
                            fullWidth
                            id="selectState"
                            value={state}
                            label="State"
                            onChange={event => setState(event.target.value)}
                        >
                            { STATE_ARRAY.map((state, index) => (
                                <MenuItem key={index} value={state}>{state}</MenuItem>
                            ))}
                        </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            name="zip"
                            value={zip}
                            onChange={event => setZip(event.target.value)}
                            label="Zip Code"
                            type="zip"
                            id="zip"
                            autoComplete="zip"
                            />
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: editSuccessAddress, mt: 3, mb: 2 }}
                        >
                        {addressButtonText}
                        </Button>
                        <Grid container justifyContent="flex-end">
                        </Grid>
                    </Box>
                    </Box>
                </Container>
            </Paper>

            <Paper sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', padding: '20px', margin: '2rem auto'}} elevation={3}>
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
                    <Box component="form" noValidate onSubmit={handleSubmitPersonal} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Typography margin="auto" variant="h4" component="h4">
                        Personal
                        </Typography>
                        <Grid item xs={12}>
                            <TextField
                            autoComplete="birthday"
                            value={birthday}
                            onChange={event => setBirthday(event.target.value)}
                            name="birthday"
                            fullWidth
                            id="birthday"
                            type="date"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            autoComplete="username"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            name="username"
                            fullWidth
                            id="username"
                            label="Username"
                            autoFocus
                            />
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: editSuccessPersonal, mt: 3, mb: 2 }}
                        >
                        {personalButtonText}
                        </Button>
                        <Grid container justifyContent="flex-end">
                        </Grid>
                    </Box>
                    </Box>
                </Container>
            </Paper>
            </Box>

        </ThemeProvider>
    );
}