import {ListItem, ListItemIcon, ListItemText, Slide} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export default function EmailVerifiedListItem() {
    return (
        <ListItem divider>
            <ListItemIcon sx={{
                color: '#4caf50',
            }}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <CheckCircleIcon />
                </Slide>
            </ListItemIcon>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <ListItemText primary="Email address verified." />
            </Slide>
        </ListItem>
    )
}