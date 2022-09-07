import React, {useEffect, useRef, useState} from "react";
import PasswordValidator from "password-validator";
import {Box, Button, Card, CardContent, FormControl, Alert, Slide, Typography, Snackbar} from "@mui/material";
import Grid from "@mui/material/Grid";
import SecurityTextFields from "../SecurityTextFields";
import PasswordRequirementsAlerts from "../PasswordRequirementsAlerts";
import PasswordMatchErrorAlert from "../PasswordMatchErrorAlert";
import MissingInitialPassword from "../MissingInitialPassword";
import SendIcon from "@mui/icons-material/Send";
import {useBackgroundFetch} from "../../../lib/hooks/useBackgroundFetch";
import {useAuth} from "../../../lib/hooks/useAuth";
import { useRouter } from "next/router";

const vertical = 'bottom';
const horizontal = 'right';

export default function SettingsSecurity() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [missingInitialPasswordError, setMissingInitialPasswordError] = useState(false);
    const [emailErrorSnackbar, setEmailErrorSnackbar] = useState(false);
    const [generalErrorSnackbar, setGeneralErrorSnackbar] = useState(false);
    const [reAuthSnackbar, setReAuthSnackbar] = useState(false);

    const [minLengthError, setMinLengthError] = useState(true)
    const [maxLengthError, setMaxLengthError] = useState(true)
    const [spacesError, setSpacesError] = useState(true)
    const [capitalError, setCapitalError] = useState(true)
    const [numberError, setNumberError] = useState(true)
    const [specialError, setSpecialError] = useState(true)
    const [lowercaseError, setLowercaseError] = useState(true)
    const [blackListedError, setBlackListedError] = useState(true)

    const showPasswordErrors = useRef(false);
    const checkForPasswordMatch = useRef(false);
    const otherRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const router = useRouter();

    const fetchData = async () => {
        return await callApi.fetchSettingsInfo()
    }

    useEffect(() => {
        if (!auth.user) return undefined;
        fetchData()
            .then(({ security }) => {
                setEmail(security.email);
                setBirthday(security.birthday);
            })
    }, [auth.user])

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [])

    useEffect(() => {
        if (!password && !confirmPassword) {
            setPasswordMatchError(true);
            setMissingInitialPasswordError(false);
            showPasswordErrors.current = false;
        }
        if (!password && confirmPassword) {
            setPasswordMatchError(false);
            setMissingInitialPasswordError(true);
        }
    }, [password, confirmPassword])

    useEffect(() => {
        console.log('passwordMatchError', passwordMatchError);
        console.log('missingInitialPasswordError', missingInitialPasswordError);
    }, [passwordMatchError, missingInitialPasswordError])

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordMatchError && !missingInitialPasswordError) {
            const response = await callApi.setSettingsInfo('security', { email, password, birthday });
            if (response.status === 400) {
                switch (response.data.error) {
                    case 'Email already exists': {
                        setEmailErrorSnackbar(true);
                    }
                    break;
                    case 'error': {
                        setGeneralErrorSnackbar(true);
                    }
                    break;
                }
            } else {
                setReAuthSnackbar(true);
                setTimeout(() => {
                    auth.signout();
                    router.push('/auth/signIn')
                }, 3000)
            }
        }
        console.log('submit');
    }

    function handleClose(closeType) {
        switch (closeType) {
            case 'email': setEmailErrorSnackbar(false); break;
            case 'error': setGeneralErrorSnackbar(false); break;
            case 'reAuth': setReAuthSnackbar(false); break;
        }
    }

    const securityOptions = [
        {
            name: 'email',
            label: 'Email',
            id: 'email-input',
            type: 'email',
            shrink: '',
            autoComplete: 'off',
            ref: otherRef,
            value: email,
            onChange: (e) => setEmail(e.target.value),
        },
        {
            name: 'password1',
            label: 'Password',
            id: 'password1-input',
            type: 'password',
            shrink: '',
            autoComplete: 'new-password',
            ref: passwordRef,
            value: password,
            onChange: (e) => {
                setPassword(e.target.value);
                validateInitialPassword(e.target.value);
            },
        },
        {
            name: 'password2',
            label: 'Confirm password',
            id: 'password2-input',
            type: 'password',
            shrink: '',
            autoComplete: 'new-password',
            ref: confirmPasswordRef,
            value: confirmPassword,
            onChange: (e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
            },
        },
        {
            name: 'birthday',
            label: 'Birthday',
            id: 'birthday-input',
            type: 'date',
            shrink: 'true',
            autoComplete: 'off',
            ref: otherRef,
            value: birthday,
            onChange: (e) => setBirthday(e.target.value),
        },
    ];

    function validateInitialPassword(password) {
        if (!showPasswordErrors.current) {
            showPasswordErrors.current = true;
        }
        const minLengthSchema = new PasswordValidator().is().min(8)
        const maxLengthSchema = new PasswordValidator().is().max(100)
        const uppercaseSchema = new PasswordValidator().has().uppercase()
        const lowercaseSchema = new PasswordValidator().has().lowercase()
        const digitsSchema = new PasswordValidator().has().digits(2)
        const noSpacesSchema = new PasswordValidator().has().not().spaces()
        const symbolsSchema = new PasswordValidator().has().symbols(1)
        const blackListPasswordsSchema = new PasswordValidator().is().not().oneOf(['Passw0rd', 'Password123']);

        minLengthSchema.validate(password) ? setMinLengthError(false) : setMinLengthError(true)
        uppercaseSchema.validate(password) ? setCapitalError(false) : setCapitalError(true)
        lowercaseSchema.validate(password) ? setLowercaseError(false) : setLowercaseError(true)
        digitsSchema.validate(password) ? setNumberError(false) : setNumberError(true)
        symbolsSchema.validate(password) ? setSpecialError(false) : setSpecialError(true)
        !maxLengthSchema.validate(password) ? setMaxLengthError(false) : setMaxLengthError(true)
        !noSpacesSchema.validate(password) ? setSpacesError(false) : setSpacesError(true)
        !blackListPasswordsSchema.validate(password) ? setBlackListedError(false) : setBlackListedError(true)
    }

    function validateConfirmPassword(password2) {
        if (!checkForPasswordMatch.current) checkForPasswordMatch.current = true;

        if (password2 !== password) {
            setPasswordMatchError(false);
        } else {
            setPasswordMatchError(true);
        }
    }

    useEffect(() => {
        console.log('password', password)
    }, [password])

    return (
        <>
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
                            Security
                        </Typography>
                        <FormControl onSubmit={(e) => handleSubmit(e)}>
                            <Grid container spacing={2}>
                                { securityOptions.map((option, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        key={index}
                                    >
                                        <SecurityTextFields option={option} />
                                        { option.name === 'email' && (
                                            <PasswordRequirementsAlerts
                                                showPassword={showPasswordErrors.current}
                                                minLengthError={minLengthError}
                                                capitalError={capitalError}
                                                numberError={numberError}
                                                specialError={specialError}
                                                lowercaseError={lowercaseError}
                                                maxLengthError={maxLengthError}
                                                blackListedError={blackListedError}
                                                spacesError={spacesError}
                                            />
                                        ) }
                                        { option.name === 'password2' && (
                                            <PasswordMatchErrorAlert
                                                checkForPasswordMatch={checkForPasswordMatch.current}
                                                passwordMatchError={passwordMatchError}
                                            />
                                        )}
                                        { option.name === 'password2' && (
                                            <MissingInitialPassword
                                                checkForPasswordMatch={checkForPasswordMatch.current}
                                                missingInitialPasswordError={missingInitialPasswordError}
                                            />
                                        )}
                                    </Grid>
                                ))}
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
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={emailErrorSnackbar}
                    onClose={() => handleClose('email')}
                    key={'emailError'}
                >
                    <Alert onClose={() => handleClose('email')} severity="error" sx={{ width: '100%' }}>
                        Account with email already exists, use different email
                    </Alert>
                </Snackbar>
                <Snackbar
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={generalErrorSnackbar}
                    onClose={() => handleClose('error')}
                    key={'error'}
                >
                    <Alert onClose={() => handleClose('error')} severity="error" sx={{ width: '100%' }}>
                        Something went wrong, please try again later.
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={reAuthSnackbar}
                    onClose={() => handleClose('reAuth')}
                    key={'reAuth'}
                >
                    <Alert onClose={() => handleClose('reAuth')} severity="success" sx={{ width: '100%' }}>
                        Profile updated. Please reauthenticate.
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}