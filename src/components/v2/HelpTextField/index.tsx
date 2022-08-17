import Grid from "@mui/material/Grid";
import {FormControl, InputLabel, MenuItem, Select, Slide} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

export default function HelpTextField(props) {

    const questionTypes = [
        'General',
        'Account',
        'Billing',
        'Linked Accounts',
        'Security',
        'Bug',
        'Feature Request',
        'Other',
    ]

    return (
        <>
            { props.profileOptions.map((option, index) => (
                <Grid
                    item
                    xs={12}
                    key={index}
                >
                    { !option.isSelector ? (
                        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                            <TextField
                                fullWidth
                                autoFocus
                                autoComplete="off"
                                name={option.name}
                                value={option.value}
                                onChange={(e) => option.onChange(e)}
                                id={option.id}
                                label={option.label}
                                type={option.type}
                                multiline={option.multiline}
                                rows={option.rows}
                                maxRows={option.maxRows}
                                InputLabelProps={{ ...option.shrink !== "" && { shrink: true }}}
                            />
                        </Slide>
                    ) : (
                        <FormControl fullWidth>
                            <InputLabel id="question-type-label">{option.label}</InputLabel>
                            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                                <Select
                                    labelId="question-type-label"
                                    id="question-type-select"
                                    value={props.value}
                                    label={option.label}
                                    onChange={(e) => props.onChange(e)}
                                >
                                    { questionTypes.map((q, index) => (
                                        <MenuItem key={index} value={q}>{q}</MenuItem>
                                    ))}
                                </Select>
                            </Slide>
                        </FormControl>
                    )}
                </Grid>
            ))}
        </>
    )
}