/* eslint-disable */
import React, {
    useState,
    useEffect,
} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { useFirestore } from '../../src/lib/hooks/useFirestore';
import { parseCookies } from '../../src/lib/parseCookies';
import PageTemplateResponsive from '../../src/components/PageTemplate';
import styles from '../../styles/Dashboard/Bank.module.css';
import Datagridcomponent from '../../src/components/NewUIComponents/Datagrid';
import { globalVars } from '../../src/lib/globalVars';
import { DataGrid } from '@mui/x-data-grid';
import { Box,
    Paper,
    ButtonGroup,
    Button,
} from '@mui/material';
const API_URL = globalVars().API_URL;

export default function Bank({ data }) {
    const { query } = useRouter();
    const firestore = useFirestore();
    const auth = useAuth();
    const [accountTypes, setAccountTypes] = useState([]);
    const [currentAccountType, setCurrentAccountType] = useState('m7NVP13ZeJSGoqQ4Lqwvh1Ek3zemx9FMER6Bg');
    const [transactions, setTransactions] = useState([]);
    const [rawData, setRawData] = useState([]);

    useEffect(() => {
        console.log('accounts', accountTypes);
    }, [accountTypes])

    useEffect(() => {
        rawData.forEach((transaction) => {
            if (transaction.account.account_id === currentAccountType) {
                setTransactions(transaction.account.transactions);
                console.log(transaction.account.transactions)
            }
        })
    }, [currentAccountType])

    useEffect(() => {
        if (!auth.user) {
            console.log('no user logged in');
            return;
        }
        const fetchData = async () => {
            console.log('fetching data');
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/api/dynamicTransactions',
                params: {
                    user_id: auth.user.uid,
                    page_id: query.ins_id,
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
            setRawData(data);
            console.log(data);
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
            <div style={{ height: 600, minWidth: "33%", marginRight: "auto", paddingTop: "5rem" }}>
                <DataGrid checkboxSelection rows={props.rows} columns={columns} />
            </div>
        )
    };

    return (
        <PageTemplateResponsive title="Dashboard" description="Dashboard overview for Earmark">
            <Box>
                <Paper sx={{ margin: 'auto', padding: '25px'}} elevation={3}>
                    <Box textAlign='center'>
                        <ButtonGroup variant="contained">
                            {accountTypes.map((account, index) => {
                                return <Button onClick={() => handleButtonClick(account.ins_id)} id={account.ins_id} key={index}>{account.ins_name}</Button>
                            })}
                        </ButtonGroup>
                    </Box>
                    <MuiDatagrid rows={transactions} />
                </Paper>
            </Box>
        </PageTemplateResponsive>
    )
};

