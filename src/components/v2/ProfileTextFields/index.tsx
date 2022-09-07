import Grid from "@mui/material/Grid";
import {Slide} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

export default function ProfileTextFields(props) {
    return (
        <>
            { props.profileOptions.map((option, index) => (
                <Grid
                    item
                    xs={12}
                    key={index}
                >
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            name={option.name}
                            value={option.value}
                            onChange={option.onChange}
                            id={option.id}
                            label={option.label}
                        />
                    </Slide>
                </Grid>
            ))}
        </>
    )
}