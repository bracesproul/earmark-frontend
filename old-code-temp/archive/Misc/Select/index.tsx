/* eslint-disable */

import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

const SelectComponent = () => {
    const handleChange = (e) => {

    }
    return (
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    label="Age"
    onChange={e => handleChange(e)}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
    )
}

export default SelectComponent;