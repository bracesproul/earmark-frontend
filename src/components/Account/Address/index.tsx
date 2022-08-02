/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useRouter } from 'next/router';
import { Link,
    Select,
    Box,
    InputLabel,
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
const STATE_ARRAY = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

const Address = () => {
    const auth = useAuth();
  
    const [editSuccessAddress, setEditSuccessAddress] = useState(null);
    const [editSuccessPersonal, setEditSuccessPersonal] = useState(null);
    
    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [birthday, setBirthday] = useState('');
    const [username, setUsername] = useState('');

    const [fatalError, setFatalError] = useState('noerror');

    const [addressButtonText, setAddressButtonText] = useState("Save Changes");
    const [personalButtonText, setPersonalButtonText] = useState("Save Changes");

    const cacheData = () => {
        if (typeof window == 'undefined') return;
        const currentTime = Date.now();
        const cacheExpTime = parseInt(localStorage.getItem(`addressCacheExpTime`));
        const cachedStreet1 = JSON.parse(localStorage.getItem(`addressCachedStreet1`));
        const cachedStreet2 = JSON.parse(localStorage.getItem(`addressCachedStreet2`));
        const cachedCity = JSON.parse(localStorage.getItem(`addressCachedCity`));
        const cachedState = JSON.parse(localStorage.getItem(`addressCachedState`));
        const cachedZip = JSON.parse(localStorage.getItem(`addressCachedZip`));
        if (!cacheExpTime || !cachedStreet1 || !cachedCity || !cachedState || !cachedZip) {
            fetchAddressData();
            return;
        } else if (cacheExpTime < currentTime) {
            fetchAddressData();
            return;
        } else if (cacheExpTime > currentTime) {
            setStreet1(cachedStreet1);
            setStreet2(cachedStreet2);
            setCity(cachedCity);
            setState(cachedState);
            setZip(cachedZip)
            return;
        }
    }

    useEffect(() => {
        if (typeof window == "undefined") return;
        cacheData();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setEditSuccessAddress(null);
            setAddressButtonText("Save Changes");
            setEditSuccessPersonal(null);
            setPersonalButtonText("Save Changes");
        }, 2000)
    }, [editSuccessAddress, editSuccessPersonal]);

    const handleSubmitAddress = async (event) => {
        let street_address_2 = '';
        if (!street2) {
            street_address_2 = street2;
        }
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
                    func: 'updateUserAddress',
                    params: {
                        addressStreet: street1,
                        addressStreet2: street_address_2,
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
                setEditSuccessAddress('success.light');
                setAddressButtonText("Success!");
                localStorage.setItem(`addressCacheExpTime`, expTime.toString());
                localStorage.setItem(`addressCachedStreet1`, JSON.stringify(street1));
                localStorage.setItem(`addressCachedStreet2`, JSON.stringify(street_address_2));
                localStorage.setItem(`addressCachedCity`, JSON.stringify(city));
                localStorage.setItem(`addressCachedState`, JSON.stringify(state));
                localStorage.setItem(`addressCachedZip`, JSON.stringify(zip));
                setStreet1(street1);
                setStreet2(street_address_2);
                setCity(city);
                setState(state);
                setZip(zip);
                return;
            } 
        } catch (error) {
            if (error.response.data === 'error') {
                setEditSuccessAddress('error.light');
                setAddressButtonText("Changes failed to save");
            }
        }
    };
    // add caching and state update;
    const handleSubmitPersonal = async (event) => {
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
                setEditSuccessPersonal('success.light');
                setPersonalButtonText("Success!");
                localStorage.setItem(`personalCacheExpTime`, expTime.toString());
                localStorage.setItem(`personalCachedBirthday`, JSON.stringify(birthday));
                localStorage.setItem(`personalCachedUsername`, JSON.stringify(username));
                setBirthday(birthday);
                setUsername(username);
            } 
        } catch (error) {
            console.error(error)
            if (error.response.data === 'error') {
                setEditSuccessPersonal('error.light');
                setPersonalButtonText("Changes failed to save");
            }
        }
    };

  const fetchAddressData = async () => {
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
        setStreet1(data.street1);
        setStreet2(data.street2);
        setCity(data.city);
        setState(data.state);
        setZip(data.zip);
        setBirthday(data.birthday);
        setUsername(data.username);
        localStorage.setItem(`addressCacheExpTime`, expTime.toString());
        localStorage.setItem(`personalCacheExpTime`, expTime.toString());
        localStorage.setItem(`addressCachedStreet1`, JSON.stringify(data.street1));
        localStorage.setItem(`addressCachedStreet2`, JSON.stringify(data.street2));
        localStorage.setItem(`addressCachedCity`, JSON.stringify(data.city));
        localStorage.setItem(`addressCachedState`, JSON.stringify(data.state));
        localStorage.setItem(`addressCachedZip`, JSON.stringify(data.zip));
        localStorage.setItem(`personalCachedBirthday`, JSON.stringify(data.state));
        localStorage.setItem(`personalCachedUsername`, JSON.stringify(data.zip));
    } catch (error) {
        console.error(error)
        setFatalError(error)
    }
  }
  
  
    return (
      <>
      <Box>
        <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: '500px', maxWidth: '600px', padding: '20px', margin: '2rem auto'}} elevation={3}>
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
                    <Typography margin="auto" variant="h5" component="h5" sx={{ fontSize: '25px'}}>
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
        </Card>

        <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: '500px', maxWidth: '600px', padding: '20px', margin: '2rem auto'}} elevation={3}>
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
                    <Typography margin="auto" variant="h5" component="h5" sx={{ fontSize: '25px'}}>
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
        </Card>
      </Box>    
      </>
    )
}

export default Address;