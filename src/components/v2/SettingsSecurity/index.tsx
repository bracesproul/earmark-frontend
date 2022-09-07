import React, {useEffect, useRef, useState} from "react";
import PasswordValidator from "password-validator";
import {Box, Button, Card, CardContent, FormControl, Input, Slide, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import SecurityTextFields from "../SecurityTextFields";
import PasswordRequirementsAlerts from "../PasswordRequirementsAlerts";
import PasswordMatchErrorAlert from "../PasswordMatchErrorAlert";
import MissingInitialPassword from "../MissingInitialPassword";
import SendIcon from "@mui/icons-material/Send";
import {useBackgroundFetch} from "../../../lib/hooks/useBackgroundFetch";
import {useAuth} from "../../../lib/hooks/useAuth";

export default function SettingsSecurity() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [missingInitialPasswordError, setMissingInitialPasswordError] = useState(false);

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

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
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

        console.log('minLengthSchema', minLengthSchema.validate(password));


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
            console.log('password2', password2);
            console.log('password', password);
            setPasswordMatchError(false);
        } else {
            console.log('password2', password2);
            console.log('password', password);
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
            </Box>
        </>
    )
}

