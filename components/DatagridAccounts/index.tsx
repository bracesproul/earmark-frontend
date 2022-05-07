/* eslint-disable */
import React from 'react';
import axios from 'axios';

import { DataGrid, 
    GridRowsProp,
    GridColDef,
} from '@mui/x-data-grid';
import PlaidLink from '../PlaidLink';

const accountsGet = async (user_id:string) => {
  const config = {
    method: "get",
    url: '/api/accountsGet',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      user_id: user_id
    }
  };
  const response = await axios(config);
  console.log("GET ACCOUNTS UI END SUCCESS", response.data.accounts);
}

accountsGet("M1uTm2PnWUY8CZCwdx32aBMLWkZ2");

const DatagridAccounts = ({ data }) => {
  const rows: GridRowsProp = data

    const columns: GridColDef[] = [
      { field: 'col1', headerName: 'Name', width: 150 },
      { field: 'col2', headerName: 'Balance', width: 150 },
      { field: 'col3', headerName: 'Type', width: 150 },
    ];

    return (
      <div style={{ height: 600, minWidth: "33%", marginRight: "auto", paddingTop: "5rem" }}>
        <h1 style={{ textAlign: "center"}}>Connected Accounts</h1>
        <DataGrid rows={rows} columns={columns} />
      </div>
    );
}

export default DatagridAccounts