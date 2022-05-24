/* eslint-disable */
import React from 'react';
import axios from 'axios';

import { DataGrid, 
    GridRowsProp,
    GridColDef,
} from '@mui/x-data-grid';

const DatagridAccounts = ({ data }) => {
  /*
  const rows: GridRowsProp = [
    { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking", col4: "9900009606", col5: "011401533" },
    { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings", col4: "4521459658", col5: "114586254"  },
    { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment", col4: "4785123658", col5: "411123589"  },
    { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment", col4: "9658741256", col5: "125563288"  },
  ];

    const columns: GridColDef[] = [
      { field: 'col1', headerName: 'Name', width: 150 },
      { field: 'col2', headerName: 'Balance', width: 150 },
      { field: 'col3', headerName: 'Type', width: 150 },
      { field: 'col4', headerName: 'Account Number', width: 150 },
      { field: 'col5', headerName: 'Routing Number', width: 150 },
    ];
    */
    const rows = [
      { id: "RLPVWZlv7wu7gEz5ArgbtDynKbxkzpiJ8aeWQ", col1: "Bank of America", col2: '588.12', col3: "Checking", col4: "9900009606", col5: "011401533" },
      { id: "ejrat9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Chase', col2: "822.01", col3: "Savings", col4: "4521459658", col5: "114586254"  },
      { id: "ejradyRl9Mt9wjwefjdow1fZDnvx4GwKi7wpx7E", col1: 'Fidelity', col2: "4,008.62", col3: "Investment", col4: "4785123658", col5: "411123589"  },
      { id: "ejra43gMt9wKvjdow1fZDnvx4GwKi7wpx7E", col1: 'Plaid IRA', col2: "19,663.91", col3: "Investment", col4: "9658741256", col5: "125563288"  },
    ];
  
      const columns = [
        { field: 'col1', headerName: 'Name', width: 150 },
        { field: 'col2', headerName: 'Balance', width: 150 },
        { field: 'col3', headerName: 'Type', width: 150 },
        { field: 'col4', headerName: 'Account Number', width: 150 },
        { field: 'col5', headerName: 'Routing Number', width: 150 },
      ];
    return (
      <div style={{ height: 600, minWidth: "900px", marginRight: "auto", paddingTop: "5rem" }}>
        <h1 style={{ textAlign: "center"}}>Connected Institutions</h1>
        <DataGrid rows={rows} columns={columns} />
      </div>
    );
}

export default DatagridAccounts