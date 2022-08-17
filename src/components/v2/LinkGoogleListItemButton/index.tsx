import {ListItemButton, ListItemIcon, ListItemText, Slide} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

export default function LinkGoogleListItemButton(props) {
    return (
        <ListItemButton divider onClick={() => props.handleLinkGoogleAccount()}>
            <ListItemIcon>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <GoogleIcon />
                </Slide>
            </ListItemIcon>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <ListItemText primary="Connect Google account for sign in." />
            </Slide>
        </ListItemButton>
    )
}