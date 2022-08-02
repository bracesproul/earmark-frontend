import React, {useEffect} from "react";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import { useRouter } from "next/router";

const timeframe = [
    '1week',
    '2weeks',
    '1month',
    '3months',
    '6months',
    '1year',
    '2years',
]




function TimeframeSelector(props) {
    const router = useRouter();
    const [timeframe, setTimeframe] = React.useState<string>('');

    const handleChange = (event) => {
        const currentChart = router.query.chart;
        const currentTimeframe = router.query.timeframe;
        if (props.queryLabel === 'timeframe') {
            setTimeframe(event.target.value);
            router.push(`?chart=${currentChart}&timeframe=${event.target.value}`);
        }
        if (props.queryLabel === 'chart') {
            setTimeframe(event.target.value as string);
            router.push(`?chart=${event.target.value}&timeframe=${currentTimeframe}`);
        }
        // router.push(`?${props.queryLabel}=${event.target.value}`);
    };


    return (
        <FormControl sx={{ m: 1, minWidth: 180, maxWidth: 200 }}>
            <InputLabel id="simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={timeframe}
                label={`${props.label}`}
                onChange={handleChange}
                autoWidth
                defaultValue={props.defaultValue}
            >
                {props.timeframe.map((value, index) => (
                        <MenuItem
                            key={index}
                            value={value.value}
                        >
                            {value.label}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}


export default TimeframeSelector;