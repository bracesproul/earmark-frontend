import {Slide} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

export default function SecurityTextFields(props) {
    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <TextField
                fullWidth
                autoFocus
                autoComplete={props.option.autoComplete}
                inputRef={props.option.ref}
                name={props.option.name}
                value={props.option.value}
                onChange={(e) => props.option.onChange(e)}
                id={props.option.id}
                label={props.option.label}
                type={props.option.type}
                InputLabelProps={{ ...props.option.shrink !== "" && { shrink: true }}}
            />
        </Slide>
    )
}