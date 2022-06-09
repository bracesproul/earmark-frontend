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
} from '@mui/material';

export default function dynamicTransactions(props) {
    const auth = useAuth();
    const [accountTypes, setAccountTypes] = useState([]);
    const [currentAccountType, setCurrentAccountType] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [selected, setSelected] = useState('outlined');

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
                return { ins_name: data.account.subtype, ins_id: data.account.account_id }
            })
            setAccountTypes(accounts);
            setTransactions(data[0].account.transactions);
            setSelected(data[0].account.account_id);
            setRawData(data);
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
                            // @ts-ignore
                            return <Button variant={buttonStyle} onClick={() => handleButtonClick(account.ins_id)} id={account.ins_id} key={index}>{account.ins_name}</Button>
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
                    <ButtonGroup variant="contained">
                        {accountTypes.map((account, index) => {
                            return <Button 
                                    onClick={() => handleButtonClick(account.ins_id)} 
                                    key={index}
                                    sx={{
                                        maxWidth: 'fitContent', maxHeight: 'fitContent', fontSize: '12px'
                                    }}
                                    >
                                    {account.ins_name}
                                    </Button>
                        })}
                    </ButtonGroup>
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

