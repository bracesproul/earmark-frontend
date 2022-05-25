/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import styles from '../../../styles/Dashboard/Visualize.module.css';
import LineChartComponent from '../ReCharts/LineChartComponent';
import BarChartComponent from '../ReCharts/StackedBarChart';
import PieChartComponent from '../ReCharts/PieChartComponent';
import TreemapComponent from '../ReCharts/TreeMapComponent';

const App = () => {
    const [selectedVisual, setSelectedVisual] = useState("Line Chart");
    const handleChange = (e) => {
        console.log('handle change ran')
        setSelectedVisual(e.target.value);
    };
    useEffect(() => {
        console.log('use effect ran');
        console.log('selectedVisual', selectedVisual);
    }, [selectedVisual]);
    
    return (
        <div>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedVisual}
                label="Age"
                onChange={(e) => handleChange(e)}
            >
                <MenuItem value="Line Chart">Line Chart</MenuItem>
                <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                <MenuItem value="Pie Chart">Pie Chart</MenuItem>
                <MenuItem value="Treemap">Treemap</MenuItem>
            </Select>
            </FormControl>
            <div className={styles.visualsContainer}>
            {selectedVisual === "Line Chart" && <LineChartComponent />}
            {selectedVisual === "Bar Chart" && <BarChartComponent />}
            {selectedVisual === "Pie Chart" && <PieChartComponent />}
            {selectedVisual === "Treemap" && <TreemapComponent />}
            </div>
        </div>
    )
};



export default App;