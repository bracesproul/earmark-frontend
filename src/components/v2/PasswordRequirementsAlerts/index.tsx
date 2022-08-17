import {Alert, Box, Slide, Typography} from "@mui/material";
import React from "react";

export default function PasswordRequirementsAlerts(props) {
    if (!props.showPassword) return <></>
    return (
        <Box sx={{
            paddingTop: '10px'
        }}>
            { props.minLengthError ? (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Password is 8 characters long.
                    </Typography>
                </Alert>
                </Slide>
            ) : (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="success">
                    <Typography>
                        Password is 8 characters long.
                    </Typography>
                </Alert>
                </Slide>
            )}

            { props.capitalError ? (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Contains one capital letter.
                    </Typography>
                </Alert>
                </Slide>
            ) : (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="success">
                    <Typography>
                        Contains one capital letter.
                    </Typography>
                </Alert>
                </Slide>
            )}

            { props.lowercaseError ? (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Contains one lowercase letter.
                    </Typography>
                </Alert>
                </Slide>
            ) : (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="success">
                    <Typography>
                        Contains one lowercase letter.
                    </Typography>
                </Alert>
                </Slide>
            )}

            { props.numberError ? (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Contains one number.
                    </Typography>
                </Alert>
                </Slide>
            ) : (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="success">
                    <Typography>
                        Contains one number.
                    </Typography>
                </Alert>
                </Slide>
            )}

            { props.specialError ? (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Contains one special character.
                    </Typography>
                </Alert>
                </Slide>
            ) : (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="success">
                    <Typography>
                        Contains one special character.
                    </Typography>
                </Alert>
                </Slide>
            )}

            { !props.maxLengthError && (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Password can not be longer than 100 characters.
                    </Typography>
                </Alert>
                </Slide>
            )}

            { !props.spacesError && (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Password can not contain spaces.
                    </Typography>
                </Alert>
                </Slide>
            )}

            { !props.blackListedError && (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Blacklisted password used, please use a more secure password.
                    </Typography>
                </Alert>
                </Slide>
            )}

        </Box>
    )
}