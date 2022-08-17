import {Alert, Box, Slide, Typography} from "@mui/material";
import React from "react";

export default function MissingInitialPassword(props) {
    if (!props.checkForPasswordMatch) return <></>
    return (
        <Box sx={{
            paddingTop: '10px'
        }}>
            { props.missingInitialPasswordError && (
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <Typography>
                        Missing initial password input.
                    </Typography>
                </Alert>
                </Slide>
            )}
        </Box>
    )
}