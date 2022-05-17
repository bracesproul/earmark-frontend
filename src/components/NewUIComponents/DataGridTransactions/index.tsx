/* eslint-disable */
import React, {
    useState,
    useEffect
} from 'react';
import { DataGrid, 
    GridRowsProp,
    GridColDef,
} from '@mui/x-data-grid';
import styles from '../../../../styles/Dashboard/Dashboard.module.css';
import DataGridComponent from '../Datagrid';
import CreateCategoryPopup from '../CreateCategoryPopup'
import { useFirestore } from '../../../lib/hooks/useFirestore';

const DataGridTransactions = ({ dataGridColumns, dataGridRows, transactionMetadata, identifier }) => {
    const rows = dataGridRows;
    const columns = dataGridColumns;
    const [selectionModel, setSelectionModel] = useState([]);
    const [newDataGrid, setNewDataGrid] = useState(<></>);
    const [newCategory, setNewCategory] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const dataGridPlaceholder = <DataGridComponent rows={[]} columns={columns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />;
    let selectedRowIds = new Array;
    // @ts-ignore
    const { success } = useFirestore();
    
    useEffect(() => {
        console.log('watching success inside DataGridTransactions', success);
        if (success) {
            setSelectionModel([]);
            setNewDataGrid(dataGridPlaceholder);
            setNewCategory(null);
            setDisabled(true);
            selectedRowIds = new Array;
        }
    }, [success])

    const setRows = async () => {
        selectionModel.forEach(row => {
            selectedRowIds.push(dataGridRows.find(item => item.id == row));
        });
        setDisabled(false);
        setNewCategory(selectedRowIds)
    };
    
    useEffect(() => {
        if (!selectionModel || selectionModel.length == 0) {
            console.log("selectionModel is null");
            setNewDataGrid(<></>);
            setDisabled(true);
            return;
        };
        setRows();

        if (selectedRowIds.length > 0) {
            console.log(selectedRowIds);
            setNewDataGrid(
                <DataGridComponent rows={selectedRowIds} columns={columns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
            )
        }
    }, [selectionModel])

    const handleClick = (e) => {
        e.preventDefault();
        console.log('cc', newCategory)
    }

      return (
        <>
        <section className={styles.datagridContainer}>
            <DataGridComponent rows={rows} columns={columns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
            {!selectionModel || selectionModel.length == 0 ? dataGridPlaceholder : newDataGrid}
        </section>
        <section className={styles.createCategoryContainer}>
            <a onClick={e => handleClick(e)}>
                <CreateCategoryPopup disabled={disabled} transactions={newCategory} />
            </a>
        </section>
        </>

      );
}


export default DataGridTransactions;