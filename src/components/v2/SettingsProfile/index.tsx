import React, {useEffect, useState} from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slide, Snackbar,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ProfileTextFields from "../ProfileTextFields";
import ProfileStateSelection from "../ProfileStateSelection";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import {useBackgroundFetch} from "../../../lib/hooks/useBackgroundFetch";
import {useAuth} from "../../../lib/hooks/useAuth";

const vertical = 'bottom';
const horizontal = 'right';
const STATE_ARRAY = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

export default function SettingsProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [username, setUsername] = useState('');
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const callApi = useBackgroundFetch();
    const auth = useAuth();

    const fetchData = async () => {
        if (!auth.user) return;
        return await callApi.fetchSettingsInfo()
    }

    useEffect(() => {
        if (!auth.user) return undefined;
        fetchData()
            .then(({ profile }) => {
                setFirstName(profile.firstName);
                setLastName(profile.lastName);
                setPhone(profile.phone);
                setStreet1(profile.address1);
                setStreet2(profile.address2);
                setCity(profile.city);
                setState(profile.state);
                setZip(profile.zip);
                setUsername(profile.username);
            })
    }, [auth.user])



    async function handleSubmit(e) {
        e.preventDefault();
        callApi.setSettingsInfo('profile', {
            firstName,
            lastName,
            phone,
            address1: street1,
            address2: street2,
            city,
            state,
            zip,
            username
        })
            .then((res) => {
                console.log('res', res)
                if (res.status === 200) {
                    setOpenSuccessSnackbar(true);
                    console.log('success updating profile')
                } else if (res.status === 400) {
                    setOpenErrorSnackbar(true);
                    console.log('error updating profile')
                }
            })
        console.log('form submitted');
    }

    function handleCloseSnackbar(closeType) {
        switch (closeType) {
            case 'success': setOpenSuccessSnackbar(false); break;
            case 'error': setOpenErrorSnackbar(false); break;
        }
    }

    const profileOptions = [
        {
            name: 'firstName',
            label: 'First Name',
            id: 'firstName-input',
            type: 'text',
            value: firstName,
            onChange: (e) => setFirstName(e.target.value),
        },
        {
            name: 'lastName',
            label: 'Last Name',
            id: 'lastName-input',
            type: 'text',
            value: lastName,
            onChange: (e) => setLastName(e.target.value),
        },
        {
            name: 'username',
            label: 'Username',
            id: 'username-input',
            type: 'text',
            value: username,
            onChange: (e) => setUsername(e.target.value),
        },
        {
            name: 'phone',
            label: 'Phone',
            id: 'phone-input',
            type: 'tel',
            value: phone,
            onChange: (e) => setPhone(e.target.value),
        },
        {
            name: 'street1',
            label: 'Address Line 1',
            id: 'street1-input',
            type: 'text',
            value: street1,
            onChange: (e) => setStreet1(e.target.value),
        },
        {
            name: 'street2',
            label: 'Address Line 2',
            id: 'street2-input',
            type: 'text',
            value: street2,
            onChange: (e) => setStreet2(e.target.value),
        },
        {
            name: 'city',
            label: 'City',
            id: 'city-input',
            type: 'text',
            value: city,
            onChange: (e) => setCity(e.target.value),
        },
        {
            name: 'zip',
            label: 'Zip Code',
            id: 'zip-input',
            type: 'text',
            value: zip,
            onChange: (e) => setZip(e.target.value),
        },
    ];

    return (
        <Box>
            <Card sx={{
                maxWidth: '600px',
                padding: '1rem',
                marginTop: '2rem',
            }}>
                <CardContent>
                    <Typography sx={{
                        fontSize: '1.5rem',
                        paddingBottom: '15px',
                    }}>
                        Profile
                    </Typography>
                    <FormControl onSubmit={(e) => handleSubmit(e)}>
                        <Grid container spacing={2}>
                            <ProfileTextFields profileOptions={profileOptions} />
                            <Grid item xs={12}>
                                <ProfileStateSelection state={state} setState={(e) => setState(e)} />
                            </Grid>
                        </Grid>
                        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                            <Button
                                onClick={(e) => handleSubmit(e)}
                                variant="contained"
                                endIcon={<SendIcon />}
                                type="submit"
                                sx={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '1rem',
                                }}
                            >
                                Update
                            </Button>
                        </Slide>
                        <Grid container justifyContent="flex-end">
                        </Grid>
                    </FormControl>
                </CardContent>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSuccessSnackbar}
                onClose={() => handleCloseSnackbar('success')}
                key={'snackbar'}
            >
                <Alert onClose={() => handleCloseSnackbar('success')} severity="success" sx={{ width: '100%' }}>
                    Profile updated.
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openErrorSnackbar}
                onClose={() => handleCloseSnackbar('error')}
                key={'snackbar'}
            >
                <Alert onClose={() => handleCloseSnackbar('error')} severity="error" sx={{ width: '100%' }}>
                    Error updating profile. Try again later
                </Alert>
            </Snackbar>
        </Box>
    )
}





