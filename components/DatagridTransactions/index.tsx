/* eslint-disable */
import React from 'react';

import { DataGrid, 
    GridRowsProp,
    GridColDef,
 } from '@mui/x-data-grid';

const DatagridTransactions = ({ data, identifier }) => {

    const rows: GridRowsProp = data

      const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Name', width: 150 },
        { field: 'col2', headerName: 'Date', width: 150 },
        { field: 'col3', headerName: 'Amount', width: 150 },
        { field: 'col4', headerName: 'Category', width: 150 },
      ];

      return (
            <div style={{ height: 600, minWidth: "33%", marginRight: "auto", paddingTop: "5rem" }}>
              <h1 style={{ textAlign: "center"}}>{identifier}</h1>
              <DataGrid rows={rows} columns={columns} />
            </div>
      );
}

export default DatagridTransactions;