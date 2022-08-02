import React, {useEffect} from "react";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import { useRouter } from "next/router";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function CategorySelector(props) {
    const router = useRouter();
    const [category, setCategory] = React.useState<string[]>([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategory(typeof value === 'string' ? value.split(',') : value);
        router.push({ query: { category: value } });
    };


    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-checkbox-label">Category</InputLabel>
            <Select
                labelId="multiple-checkbox-label"
                id="multiple-checkbox"
                multiple
                value={category}
                onChange={handleChange}
                input={<OutlinedInput label="Category" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {props.categories.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={category.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}


export default CategorySelector;