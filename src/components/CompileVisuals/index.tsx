/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, Paper, OutlinedInput, Checkbox, ListItemText, Button } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import styles from '../../../styles/Dashboard/Visualize.module.css';
import LineChartComponent from '../ReCharts/LineChartComponent';
import BarChartComponent from '../ReCharts/StackedBarChart';
import PieChartComponent from '../ReCharts/PieChartComponent';
import TreemapComponent from '../ReCharts/TreeMapComponent';

const categories = [
    "Travel",
    "Food",
    "Entertainment",
    "Shopping",
    "Bills",
    "Other"
];

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



const App = () => {
    const theme = useTheme();
    const [selectedVisual, setSelectedVisual] = useState("Line Chart");
    const [selectedDates, setSelectedDates] = useState("8760");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [buttonState, setButtonState] = useState("secondary");
    const [buttonText, setButtonText] = useState("Visualize");

    const handleChangeVisuals = (e) => {
        console.log('handle change ran')
        setSelectedVisual(e.target.value);
    };
    const handleChangeDates = (e) => {
        setSelectedDates(e.target.value);
    };

    const handleChangeCategories = (event) => {
        const {
            target: { value },
          } = event;
          setSelectedCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        setButtonState('success');
        setButtonText('Success');
        setTimeout(() => {
            setButtonState('secondary');
            setButtonText('Visualize');
            setSelectedCategories([]);
        }, 2000)
    };

    function getStyles(name, selectedCategories, theme) {
        return {
          fontWeight:
          selectedCategories.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    }
    
    return (
        <div className={styles.paperOutside}>
            <Paper elevation={3}>
                <div className={styles.paperInside}>
                        <div className={styles.selectContainer}>
                            <FormControl>
                                <InputLabel id="select-chart">Chart Type</InputLabel>
                                <Select
                                    labelId="select-chart"
                                    id="simple-select-chart"
                                    value={selectedVisual}
                                    label="Chart Type"
                                    onChange={(e) => handleChangeVisuals(e)}
                                    sx={{
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        borderRadius: 2,
                                        minWidth: 150,
                                    }}
                                >
                                    <MenuItem value="Line Chart">Line Chart</MenuItem>
                                    <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                                    <MenuItem value="Pie Chart">Pie Chart</MenuItem>
                                    <MenuItem value="Treemap">Treemap</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel id="select-date">Chart Type</InputLabel>
                                <Select
                                    labelId="select-date"
                                    id="simple-select-date"
                                    value={selectedDates}
                                    label="Chart Type"
                                    onChange={(e) => handleChangeDates(e)}
                                    sx={{
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        borderRadius: 2,
                                        minWidth: 150,
                                    }}
                                >
                                    <MenuItem value="24">24 hours</MenuItem>
                                    <MenuItem value="72">3 Days</MenuItem>
                                    <MenuItem value="168">7 Days</MenuItem>
                                    <MenuItem value="336">2 Weeks</MenuItem>
                                    <MenuItem value="730">1 Month</MenuItem>
                                    <MenuItem value="2190">3 Months</MenuItem>
                                    <MenuItem value="4380">6 Months</MenuItem>
                                    <MenuItem value="8760">Year To Date</MenuItem>
                                    <MenuItem value="Custom">Custom</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demultiple-categories-label">Categories</InputLabel>
                                <Select
                                labelId="demultiple-categories-label"
                                id="multiple-categories"
                                multiple
                                value={selectedCategories}
                                onChange={e => handleChangeCategories(e)}
                                input={<OutlinedInput label="Categories" />}
                                MenuProps={MenuProps}
                                sx={{
                                    bgcolor: 'background.paper',
                                    boxShadow: 1,
                                    borderRadius: 2,
                                    minWidth: 150,
                                }}
                                >
                                {categories.map((categories) => (
                                    <MenuItem
                                    key={categories}
                                    value={categories}
                                    style={getStyles(categories, selectedCategories, theme)}
                                    >
                                    {categories}
                                    </MenuItem>
                                ))}
                                </Select>
                                <Button 
                                onClick={e => handleCategorySubmit(e)} 
                                variant="contained" 
                                // @ts-ignore
                                color={buttonState}
                                sx={{
                                    boxShadow: 1,
                                    borderRadius: 1,
                                    minWidth: 150,
                                }}
                                >
                                {buttonText}
                                </Button>
                            </FormControl>
                        </div>

                    <div className={styles.visualsContainer}>
                        {selectedVisual === "Line Chart" && <LineChartComponent />}
                        {selectedVisual === "Bar Chart" && <BarChartComponent />}
                        {selectedVisual === "Pie Chart" && <PieChartComponent />}
                        {selectedVisual === "Treemap" && <TreemapComponent />}
                    </div>
                </div>
            </Paper>
        </div>
    )
};



export default App;