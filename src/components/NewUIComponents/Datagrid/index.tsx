/* eslint-disable */
import React, {
    useState,
    useEffect
} from 'react';
import { DataGrid, 
    GridRowsProp,
    GridColDef,
} from '@mui/x-data-grid';

const Datagrid = ({ dataGridColumns, dataGridRows, transactionMetadata, identifier }) => {
    const [selectionModel, setSelectionModel] = useState([]);
    const [newDataGrid, setNewDataGrid] = useState(<></>);
    
    const rows = dataGridRows;
    const columns = dataGridColumns;
    let selectedRowIds = new Array;

    const setRows = async () => {
        await selectionModel.forEach(row => {
            selectedRowIds.push(dataGridRows.find(item => item.id == row));
        });
    };
    
    useEffect(() => {
        if (!selectionModel || selectionModel.length == 0) {
            console.log("selectionModel is null");
            setNewDataGrid(<></>);
            return;
        };
        setRows();

        if (selectedRowIds.length > 0) {
            setNewDataGrid(
                <DataGrid
                rows={selectedRowIds}
                columns={columns}
                checkboxSelection
                selectionModel={selectionModel}
                onSelectionModelChange={itm => setSelectionModel(itm)}
                />
            )
        }
    }, [selectionModel])

      return (
        <>
        <div className="datagrid-testing">
            <DataGrid 
            rows={rows}
            columns={columns}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={itm => setSelectionModel(itm)}
            />
        </div>
        <div className="datagrid-selected">
            {newDataGrid}
        </div>
        </>
      );
}

export default Datagrid;