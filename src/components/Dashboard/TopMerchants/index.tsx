/* eslint-disable */
import React, { 
    useState,
} from 'react';
import { Paper,
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
  
const TopMerchants = () => {
    const [dateSelection, setDateSelection] = useState('7 Days');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setDateSelection(event.target.value as string);
    }

    function createData(
        name: string,
        totalSpent: number,
        totalTransactions: number,
        category: string,
    ) {
        return { name, totalSpent, totalTransactions, category };
    }

    const rows = [
        createData('Uber', 121, 6, 'Transportation'),
        createData('Gordos', 338, 9, 'Food'),
        createData('United Airlines', 829, 1, 'Travel'),
        createData('PG&E', 405, 3, 'Utilities'),
        createData('Sliver Pizza', 693, 12, 'Food'),
    ];

    const spendingTimeframe = {
        '7 Days': 'Most frequent merchants used in the last 7 days',
        '2 Weeks': 'Most frequent merchants used in the last 2 weeks',
        '1 Month': 'Most frequent merchants used in the last month',
        '6 Months': 'Most frequent merchants used in the last 6 months',
        'Custom': 'Custom date range for top merchants'
    }

    const select = (
        <FormControl sx={{ minWidth: '200px'}}>
        <InputLabel id="select-date-label">Time Period</InputLabel>
        <Select
            labelId="select-date-label"
            id="select-date"
            value={dateSelection}
            label="Time Period"
            onChange={handleSelectChange}
        >
            <MenuItem value={'7 Days'}>7 Days</MenuItem>
            <MenuItem value={'2 Weeks'}>2 Weeks</MenuItem>
            <MenuItem value={'1 Month'}>1 Month</MenuItem>
            <MenuItem value={'6 Months'}>6 Months</MenuItem>
            <MenuItem value={'Custom'}>Custom</MenuItem>
        </Select>
        </FormControl>
    )

    function BasicTable() {
        return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Merchant</TableCell>
                <TableCell align="left">Total Spent&nbsp;($)</TableCell>
                <TableCell align="left">Total Transactions</TableCell>
                <TableCell align="left">Category</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="left">${row.totalSpent}</TableCell>
                    <TableCell align="left">{row.totalTransactions}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        );
    }


    const card = (
        <>
        <CardContent>
        <Typography variant="h5" component="div">
            Top Merchants
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {spendingTimeframe[dateSelection]}
        </Typography>
        <CardActions>
            {select}
        </CardActions>
        <BasicTable />
        </CardContent>
    </>
    )

    return (
        <Box sx={{ padding: '30px', minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}

export default TopMerchants;