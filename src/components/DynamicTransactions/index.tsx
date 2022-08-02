/* eslint-disable */
/* eslint-disable */
import React, {
    useState,
    useEffect,
} from 'react';
import axios from 'axios';
import { useAuth } from '../../lib/hooks/useAuth';
import { DataGrid } from '@mui/x-data-grid';
import { Box,
    ButtonGroup,
    Button,
    Tooltip,
    IconButton,
    Menu,
    MenuItem
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
    const [selected, setSelected] = useState('outlined');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(true);

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
        rawData.forEach((transaction) => {
            if (transaction.account.account_id === currentAccountType) {
                setTransactions(transaction.account.transactions);
                setSelected(transaction.account.account_id);
            }
        })
    }, [currentAccountType]);



    useEffect(() => {
        if (!auth.user) {
            console.error('no user logged in');
            return;
        }
        const fetchData = async () => {
            const apiCall = await callApi.fetchDynamicTransactions(props.query.ins_id)
            setAccountTypes(apiCall.accountTypes);
            setRawData(apiCall.rawData);
            if (props.query.account_id) {
                setCurrentAccountType(props.query.account_id);
            }
            setTransactions(apiCall.transactions);
            setSelected(apiCall.selectedData);
            setLoading(false);
        }
        fetchData();
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
                    ) : mobileDropdownList }
                </Menu>
            </>
        )
    }

    const mobileDropdownList = (
        <>
            {accountTypes.map((account, index) => (
                <MenuItem key={index} onClick={() => handleClose(account)}>
                    {account.account_name}
                </MenuItem>
            ))}
        </>
    )

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
                                    <Button variant={buttonStyle} onClick={() => handleButtonClick(account.ins_id)} id={account.ins_id} key={index}>{account.account_name}</Button>
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
                <Box textAlign='center' sx={{ paddingBottom: '2rem'}}>
                    {/* @ts-ignore */}
                    <ButtonGroup>
                        <ButtonGroup />
                    </ButtonGroup>
                </Box>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid autoHeight rows={props.rows} columns={columns} />
                    </div>
                </div>
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
                        <DataGrid autoHeight rows={props.rows} columns={columns} />
                    </div>
                </div>
            </Box>
            </>
        )
    };

    return <MuiDatagrid rows={transactions} />
};