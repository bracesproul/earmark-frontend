/* eslint-disable */
import React from 'react';
import { DataGrid, 
    GridRowsProp,
    GridColDef,
} from '@mui/x-data-grid';

const Datagrid = ({ gridData, account }) => {
    /*
    const rows: GridRowsProp = gridData.rows;

    const columns: GridColDef[] = gridData.columns;
    */
    const rows = gridData.rows;

    const columns = gridData.columns;

    return (
            <div className="datagrid-container">
            <DataGrid 
                checkboxSelection 
                rows={rows} 
                columns={columns} />
            </div>
    )
};

export default Datagrid;