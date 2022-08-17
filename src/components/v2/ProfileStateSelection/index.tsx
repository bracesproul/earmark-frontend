import {FormControl, InputLabel, MenuItem, Select, Slide} from "@mui/material";
import React from "react";

const STATE_ARRAY = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

export default function ProfileStateSelection(props) {
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="state-label">State</InputLabel>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Select
                        labelId="state-label"
                        id="state-select"
                        value={props.state}
                        label="State"
                        onChange={(e) => props.setState(e.target.value)}
                    >
                        { STATE_ARRAY.map((state, index) => (
                            <MenuItem key={index} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </Slide>
            </FormControl>
        </>
    )
}