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
    Paper,
    ButtonGroup,
    Button,
    Tooltip,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; 
export default function dynamicTransactions(props) {
    const auth = useAuth();
    const [accountTypes, setAccountTypes] = useState([]);
    const [currentAccountType, setCurrentAccountType] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [selected, setSelected] = useState('outlined');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
    }, [currentAccountType])

    useEffect(() => {
        if (!auth.user) {
            console.error('no user logged in');
            return;
        }
        const fetchData = async () => {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dynamicTransactions',
                params: {
                    user_id: auth.user.uid,
                    page_id: props.query.ins_id,
                    startDate: '2022-01-01',
                    endDate: '2022-06-07',
                }
            };
            const { data } = await axios(config);
            const accounts = data.map((data) => {
                console.log(data)
                return { ins_name: data.account.subtype, ins_id: data.account.account_id, account_name: data.account.account_name }
            })
            setAccountTypes(accounts);
            setRawData(data);
            if (props.query.account_id) {
                setCurrentAccountType(props.query.account_id);

                return;
            }
            setTransactions(data[0].account.transactions);
            setSelected(data[0].account.account_id);
        };
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

    const mobileDropdownList = (
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
            {accountTypes.map((account, index) => (
            <MenuItem key={index} onClick={() => handleClose(account)}>
                {account.account_name}
            </MenuItem>
            ))}
        </Menu>
        </>

    )

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
                    <ButtonGroup>
                        {accountTypes.map((account, index) => {
                            let buttonStyle: string = "outlined";
                            if (account.ins_id === selected) buttonStyle = "contained";
                            return (
                                <Tooltip title={`${account.account_name} transactions`} key={index}>
                                    {/* @ts-ignore */}
                                    <Button variant={buttonStyle} onClick={() => handleButtonClick(account.ins_id)} id={account.ins_id} key={index}>{account.account_name}</Button>
                                </Tooltip>
                            ) 
                        })}
                    </ButtonGroup>
                </Box>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid rows={props.rows} columns={columns} />
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
                {mobileDropdownList}
                </Box>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid rows={props.rows} columns={columns} />
                    </div>
                </div>
            </Box>
            </>
        )
    };

    return <MuiDatagrid rows={transactions} />
};