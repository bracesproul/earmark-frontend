/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, Paper, OutlinedInput, Checkbox, ListItemText, Button } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import styles from '../../styles/Dashboard/Visualize.module.css';
import LineChartComponent from '../ReCharts/LineChartComponent';
import BarChartComponent from '../ReCharts/StackedBarChart';
import PieChartComponent from '../ReCharts/PieChartComponent';
import TreemapComponent from '../ReCharts/TreeMapComponent';
import { useAuth } from '../../lib/hooks/useAuth';
import moment from 'moment';

const categories = [
    "Income",
    "Transfer In",
    "Transfer Out",
    "Loan Payments",
    "Bank Fees",
    "Entertainment",
    "Food And Drink",
    "General Merchandise",
    "Home Improvement",
    "Medical",
    "Personal Care",
    "General Services",
    "Government And Non-Profit",
    "Transportation",
    "Travel",
    "Rent And Utilities"
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
    const today = moment().format("YYYY-MM-DD");
    const todayMonth = moment().format("M");
    const todayYear = moment().format("YYYY");
    const sevenDays = moment().subtract(7, 'days').format("YYYY-MM-DD");
    const twoWeeks = moment().subtract(14, 'days').format("YYYY-MM-DD");
    const oneMonth = moment().subtract(30, 'days').format("YYYY-MM-DD");
    const threeMonths = moment().subtract(90, 'days').format("YYYY-MM-DD");
    const sixMonths = moment().subtract(180, 'days').format("YYYY-MM-DD");
    const oneYear = moment().subtract(1, 'years').format("YYYY-MM-DD");
    const twoYears = moment().subtract(2, 'years').format("YYYY-MM-DD");
    const [selectedVisual, setSelectedVisual] = useState("Line Chart");
    const [selectedDates, setSelectedDates] = useState(today);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [buttonState, setButtonState] = useState("secondary");
    const [buttonText, setButtonText] = useState("Visualize");
    const [dateName, setDateName] = useState('today')
    const auth = useAuth();

    const handleChangeVisuals = (e) => {
        setSelectedVisual(e.target.value);
    };
    const handleChangeDates = (e) => {
        setSelectedDates(e.target.value);
        if (e.target.value == today) {
            setDateName('today');
        } else if (e.target.value == sevenDays) {
            setDateName('sevenDays');
        } else if (e.target.value == twoWeeks) {
            setDateName('twoWeeks');
        } else if (e.target.value == oneMonth) {
            setDateName('oneMonth');
        } else if (e.target.value == threeMonths) {
            setDateName('threeMonths');
        } else if (e.target.value == sixMonths) {
            setDateName('sixMonths');
        }
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
                                <InputLabel id="select-date">Date Range</InputLabel>
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
                                    <MenuItem value={today}>Today</MenuItem>
                                    <MenuItem value={sevenDays}>7 Days</MenuItem>
                                    <MenuItem value={twoWeeks}>2 Weeks</MenuItem>
                                    <MenuItem value={oneMonth}>30 Days</MenuItem>
                                    <MenuItem value={threeMonths}>3 Months (90 days)</MenuItem>
                                    <MenuItem value={sixMonths}>6 Months (180 days)</MenuItem>
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
                        {selectedVisual === "Line Chart" && <LineChartComponent dateName={dateName} date={selectedDates} />}
                        {selectedVisual === "Bar Chart" && <BarChartComponent dateName={dateName} date={selectedDates} />}
                        {selectedVisual === "Pie Chart" && <PieChartComponent dateName={dateName} date={selectedDates} />}
                        {selectedVisual === "Treemap" && <TreemapComponent />}
                    </div>
                </div>
            </Paper>
        </div>
    )
};



export default App;