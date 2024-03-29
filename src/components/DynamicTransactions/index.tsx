/* eslint-disable */
/* eslint-disable */
import React, {
    useState,
    useEffect,
} from 'react';
import axios from 'axios';
import { useAuth } from '../../lib/hooks/useAuth';
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    ButtonGroup,
    Button,
    Tooltip,
    IconButton,
    Menu,
    MenuItem, Typography, Divider
} from '@mui/material';
import { useBackgroundFetch } from "../../lib/hooks/useBackgroundFetch";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function dynamicTransactions(props) {
    const auth = useAuth();
    const callApi = useBackgroundFetch();
    const [accountTypes, setAccountTypes] = useState([]);
    const [currentAccountType, setCurrentAccountType] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [selected, setSelected] = useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAccountName, setSelectedAccountName] = useState('')

    const ITEM_HEIGHT = 48;
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (account) => {
      setAnchorEl(null);
      handleButtonClick(account.ins_id)
    };

    useEffect(() => {
        if (!rawData) return undefined;
        rawData.forEach((transaction) => {
            if (transaction.account.account_id === currentAccountType) {
                setTransactions(transaction.account.transactions);
                setSelected(transaction.account.account_id);
                setSelectedAccountName(transaction.account.account_name)
            }
        })
    }, [currentAccountType, rawData]);

    const fetchData = async () => {
        console.log('props.query.ins_id', props.query.ins_id);
        return await callApi.fetchDynamicTransactions(props.query.ins_id)
/*        const apiCall = await callApi.fetchDynamicTransactions(props.query.ins_id)
        console.log(apiCall)
        setAccountTypes(apiCall.accountTypes);
        setRawData(apiCall.rawData);
        if (props.query.account_id) {
            setCurrentAccountType(props.query.account_id);
        }
        setTransactions(apiCall.transactions);
        setSelected(apiCall.selectedData);
        apiCall.accountTypes.forEach((account) => {
            if (account.ins_id === props.query.account_id) {
                setSelectedAccountName(account.account_name)
            }
        })
        setLoading(false);*/
    }

    useEffect(() => {
        if (!auth.user) {
            return undefined;
        }
        fetchData()
            .then((res) => {
                console.log('response:', res)
                setAccountTypes(res.accountTypes);
                setRawData(res.rawData);
                if (props.query.account_id) {
                    setCurrentAccountType(props.query.account_id);
                }
                setTransactions(res.transactions);
                setSelected(res.selectedData);
                res.accountTypes.forEach((account) => {
                    if (account.ins_id === props.query.account_id) {
                        setSelectedAccountName(account.account_name)
                    }
                })
                setLoading(false);
        })
    }, [auth.user])

    const columns = [
        { field: 'col1', headerName: 'Name', width: 150 },
        { field: 'col2', headerName: 'Date', width: 150 },
        { field: 'col3', headerName: 'Amount', width: 150 },
        { field: 'col4', headerName: 'Category', width: 150 },
    ];

    const handleButtonClick = (accId) => {
        setCurrentAccountType(accId);
    }

    const MobileDropDown = () => {
        if (!accountTypes) return null;
        return (
            <>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <AccountBalanceIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    { loading ? (
                        <MenuItem key={10000000000}>
                            Loading...
                        </MenuItem>
                    ) : accountTypes.map((account, index) => (
                        <MenuItem key={index} onClick={() => handleClose(account)}>
                            {account.account_name}
                        </MenuItem>
                    )) }
                </Menu>
            </>
        )
    }

    const ButtonGroup = () => {
        let buttonStyle: string = "outlined";
        return (
            <>
                { loading ? (
                        <Tooltip title={'Loading...'} key={1000000}>
                            <Button variant='outlined' id='100000000' key={10000000}>Loading...</Button>
                        </Tooltip>
                ) : (
                    <>
                        {accountTypes.map((account, index) => {
                            if (account.ins_id === selected) buttonStyle = "contained";
                            return (
                                <Tooltip title={`${account.account_name} transactions`} key={index}>
                                    {/* @ts-ignore */}
                                    <Button variant='contained' onClick={() => handleButtonClick(account.ins_id)} id={account.ins_id} key={index}>{account.account_name}</Button>
                                </Tooltip>
                            )
                        })}
                    </>
                )}
            </>
        )
    }

    const MuiDatagrid = (props) => {
        return (
            <>
            {/* large devices */}
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                height: '75%',
                width: '100%',
                marginTop: '2rem',
                marginLeft: '2rem',
                marginRight: '2rem',
            }}>
                <Typography sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    paddingTop: '1rem',
                    paddingLeft: '4rem',
                }}>
                    {selectedAccountName}
                </Typography>
                <Divider sx={{ width: '100%', margin: 'auto 0' }} />
                <Box textAlign='center' sx={{ paddingBottom: '2rem', paddingTop: '2rem'}}>
                    {/* @ts-ignore */}
                    <ButtonGroup>
                        <ButtonGroup />
                    </ButtonGroup>
                </Box>
                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <DataGrid autoHeight sx={{ width: '80vw'}} rows={props.rows} columns={columns} />
                    </Box>
                </Box>
            </Box>
            {/* small devices */}
            <Box sx={{
                display: { xs: 'flex', md: 'none' },
                flexDirection: 'column',
                height: '75%',
                width: '100%',
                marginTop: '2rem',
                marginLeft: '10px',
                marginRight: '10px',
            }}>
                <Box textAlign='center' sx={{ paddingBottom: '2rem', margin: 'auto'}}>
                    <MobileDropDown />
                </Box>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid autoHeight sx={{ width: '98vw'}} rows={props.rows} columns={columns} />
                    </div>
                </div>
            </Box>
            </>
        )
    };

    return <MuiDatagrid rows={transactions} />
};