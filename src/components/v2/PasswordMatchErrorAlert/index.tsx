import {Alert, Box, Slide, Typography} from "@mui/material";
import React from "react";

export default function PasswordMatchErrorAlert(props) {
    if (!props.checkForPasswordMatch) return <></>
    return (
        <Box sx={{
            paddingTop: '10px'
        }}>
            { !props.passwordMatchError && (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Passwords do not match.
                    </Typography>
                </Alert>
                </Slide>
            )}
        </Box>
    )
}