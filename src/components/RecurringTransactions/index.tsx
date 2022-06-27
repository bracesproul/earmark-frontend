/* eslint-disable */
import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from '../../styles/Dashboard/Dashboard.module.css';
import DataGridComponent from '../NewUIComponents/Datagrid';
import { useFirestore } from '../../lib/hooks/useFirestore';
import { globalVars } from '../../lib/globalVars';
import { DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, useMediaQuery, Button, Box, Tooltip } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { useAuth } from '../../lib/hooks/useAuth'
import { DataGrid } from '@mui/x-data-grid';

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));



const RecurringTransactions = () => {
    const [isDataNull, setIsDataNull] = useState(true);
    const [rowData, setRowData] = useState([]);
    const [allSummaryData, setAllSummaryData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [selectedSummaryAccount, setSelectedSummaryAccount] = useState('')
    const [open, setOpen] = useState(false);
    const [fetchDataRan, setFetchDataRan] = useState(0);
    const [emptyDataGridMessage, setEmptyDatGridMessage] = useState('Loading...')
    const auth = useAuth();
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(2, 'years').format('YYYY-MM-DD');
    const theme = useTheme();
    const fullScreen = true;

    const handleDialogOpen = (acc_id) => {
        setSelectedSummaryAccount(acc_id);
    }

    const handleDialogClose = () => {
        setOpen(false);
        setSelectedSummaryAccount('')
    };

    const fetchData = async () => {
        try {
            const currentTime = Date.now();
            const expTime = currentTime + 86400000;
            const config = {
                method: "GET",
                url: '/api/recurring',
                params: {
                    user_id: auth.user.uid,
                    startDate: startDate,
                    endDate: endDate,
                    queryType: 'datagrid',
                },
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const { data } = await axios(config);
            if (!data.recurring_transactions) {
                setFetchDataRan(fetchDataRan + 1);
                setIsDataNull(true);
                setRowData(null);
                setAllSummaryData(null);
                return;
            }
            setRowData(data.recurring_transactions);
            setFetchDataRan(fetchDataRan + 1);
            setIsDataNull(false);
            setAllSummaryData(data.recurring_transactions.map((txn) => txn.txn_metadata))
            localStorage.setItem(`recurringTransactionsCacheExpTime`, expTime.toString());
            localStorage.setItem(`recurringTransactionsCacheRows`, JSON.stringify(data.recurring_transactions));
        } catch (error) {
            console.error('error - recurring fetch call')
            console.error(error)
        }
    };

    useEffect(() => {
        if (isDataNull) {
            console.log('false');
            return;
        };
        console.log('before loop run');
        allSummaryData.forEach((element) => {
            if (element[0].acc_id == selectedSummaryAccount) {
                setSummaryData(element);
                setOpen(true);
            }
        })
    }, [selectedSummaryAccount])

    const cacheData = () => {
        if (typeof window == "undefined") return;
        try {
            const currentTime = Date.now();
            const cacheExpTime = parseInt(localStorage.getItem(`recurringTransactionsCacheExpTime`));
            const cachedData = JSON.parse(localStorage.getItem(`recurringTransactionsCacheRows`));
            if (!cacheExpTime || !cachedData) {
                fetchData();
            } else if (cacheExpTime < currentTime) {
                fetchData();
            } else if (cacheExpTime > currentTime) {
                setRowData(cachedData);
            }
        } catch (error) {
            console.error('error - recurring cache method')
            console.error(error)
        }
    };
    
    useEffect(() => {
    if (!auth.user) return;
    cacheData()
    }, [auth.user])

    useEffect(() => {
        if (fetchDataRan > 0) {
            if (isDataNull) {
                setEmptyDatGridMessage('No transactions found. Please link another bank')
            } else {
                setEmptyDatGridMessage('Transactions found.')
            }
        }
    }, [fetchDataRan])

    const recurringColums = [
        { field: 'col1', headerName: 'Merchant', width: 225 },
        { field: 'col2', headerName: 'Total Amount', width: 150 },
        { field: 'col3', headerName: 'Averge Amount', width: 150 },
        { field: 'col4', headerName: 'Total Charges', width: 150 },
        { field: 'col5', headerName: 'First Charge', width: 150 },
        { field: 'col6', headerName: 'Recent Charge', width: 150 },
        { field: 'col7', headerName: 'Category', width: 150 },
        { field: 'col8', headerName: 'Summary', width: 150,
        renderCell: (data) => (
            <>
            <Tooltip title="View transactions">
              <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleDialogOpen(data.row.acc_id)}
              sx={{ padding: '0.25rem 0.5rem' }}
              >
                Summary
              </Button>
            </Tooltip>
            </>
      
          )},
        { field: 'acc_id', headerName: 'acc_id', width: 0, hide: true },
    ];
    const datagridColumns = [
        { field: 'col1', headerName: 'Merchant', width: 150 },
        { field: 'col2', headerName: 'Date', width: 150 },
        { field: 'col3', headerName: 'Amount', width: 150 },
        { field: 'col4', headerName: 'Category', width: 150 },
    ];

    const Placeholder = () => {
        return (
            <StyledGridOverlay>
            <svg
            width="120"
            height="100"
            viewBox="0 0 184 152"
            aria-hidden
            focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                <g transform="translate(24 31.67)">
                    <ellipse
                    className="ant-empty-img-5"
                    cx="67.797"
                    cy="106.89"
                    rx="67.797"
                    ry="12.668"
                    />
                    <path
                    className="ant-empty-img-1"
                    d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                    />
                    <path
                    className="ant-empty-img-2"
                    d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                    />
                    <path
                    className="ant-empty-img-3"
                    d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                    />
                </g>
                <path
                    className="ant-empty-img-3"
                    d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                />
                <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                    <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                    <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>{emptyDataGridMessage}</Box>
            </StyledGridOverlay>
        )
    };

    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
            width: {sx: '100%', md: '900px'},
            padding: {sx: '100%', md: '4rem'},
            margin: 'auto'
        }}>
            { isDataNull ? (
                <DataGrid 
                rows={null}
                columns={recurringColums}
                components={{
                    NoRowsOverlay: Placeholder,
                }}
                />
            ) : (
                <DataGrid 
                rows={rowData}
                columns={recurringColums}
                components={{
                    NoRowsOverlay: Placeholder,
                }}
                />
            )}
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                Transaction Summary
                </DialogTitle>
                <DialogContent>
                    { isDataNull ? (
                    <DataGrid autoPageSize={true} rows={undefined} columns={datagridColumns} sx={{
                        height: '100%',
                        width: { xs: '100%', md: '600px' },
                        display: 'flex',
                        margin: 'auto'
                    }} />
                    ) : (
                    <DataGrid autoPageSize={true} rows={summaryData} columns={datagridColumns} sx={{
                        height: '100%',
                        width: { xs: '100%', md: '600px' },
                        display: 'flex',
                        margin: 'auto'
                    }} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};




export default RecurringTransactions;