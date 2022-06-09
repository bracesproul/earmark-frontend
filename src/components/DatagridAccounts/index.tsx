/* eslint-disable */
import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { Button,
  Skeleton,
  Box,
  Tooltip
 } from '@mui/material';
import { PlaidLinkInstitution } from '../PlaidLink';
import { useAuth } from '../../lib/hooks/useAuth';
import { createTheme, Theme, ThemeProvider, useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  deleteButton: {
    background: '#ed0000',
    padding: '0.25rem 0.5rem',
    '&:hover': {
      background: '#c40404',
  },
}})

const DatagridAccounts = ({ data }) => {
  console.log(data);
  const theme = useTheme();
  const auth = useAuth();
  const skeleton = (
    <>
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    </>
  )

  const styling = useStyles();

  const handleRemoveInstitution = (institutionId) => {
    console.log('remove ins', institutionId);
  };

  const columns = [
    { field: 'col1', headerName: 'Name', width: 150 },
    { field: 'col2', headerName: 'Balance', width: 150 },
    { field: 'col3', headerName: 'Type', width: 150 },
    { field: 'col4', headerName: 'Account Number', width: 175 },
    { field: 'col5', headerName: 'Routing Number', width: 175 },
    { field: 'col6', headerName: 'Wire Routing Number', width: 175 },
    { field: 'col7', 
    headerName: 'Transactions', 
    width: 150, 
    renderCell: (data) => (
      <>
      <Tooltip title="View transactions">
        <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => Router.push(`/dashboard/${data.row.ins_id}?account_id=${data.row.id}`)}
        sx={{ padding: '0.25rem 0.5rem' }}
        >
          Transactions
        </Button>
      </Tooltip>
      </>

    )
    },
    { field: 'col8', 
    headerName: 'Remove Institution', 
    width: 150, 
    renderCell: (data) => (
      <>
      <Tooltip title="Remove institution">
        <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => handleRemoveInstitution(data.row.id)}
          >
          Remove
        </Button>
      </Tooltip>
      </>

    )
    },
    { field: 'ins_id', headerName: 'Ins_id', width: 60, hide: true },
  ];
    return (
      <>
      <div style={{ padding: '2rem', height: 600, minWidth: "100%", margin: "auto", }}>
        <h1 style={{ textAlign: "center"}}>Connected Institutions</h1>
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px'}}>
          <PlaidLinkInstitution user_id={auth.user.uid} />
        </Box>
        <DataGrid autoHeight={true} rows={data} columns={columns} />
      </div>
      
      </>
    );
}

export default DatagridAccounts