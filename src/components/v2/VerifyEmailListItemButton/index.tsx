import {ListItem, ListItemButton, ListItemIcon, ListItemText, Slide} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export default function VerifyEmailListItemButton(props) {
    return (
        <>
            { props.showEmailIcon && (
                <ListItemButton divider onClick={() => props.handleVerifyEmail()}>
                    <ListItemIcon>
                        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                            <EmailIcon />
                        </Slide>
                    </ListItemIcon>
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                        <ListItemText primary="Verify email address." />
                    </Slide>
                </ListItemButton>
            )}
            { props.showEmailSentIcon && (
                <ListItem divider onClick={() => props.handleVerifyEmail()}>
                    <ListItemIcon>
                        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                            <CheckCircleIcon sx={{
                                color: '#4caf50',
                            }} />
                        </Slide>
                    </ListItemIcon>
                    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                        <ListItemText primary="Email verification sent." />
                    </Slide>
                </ListItem>
            )}
        </>
    )
}