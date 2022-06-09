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
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

const categories = [
    "Income",
    "Transfer In",
    "Transfer Out",
    "Loan Payments",
    "Bank Fees",
    "Entertainment",
    "Food and Drink",
    "General Merchandise",
    "Home Improvement",
    "Medical",
    "Personal Care",
    "General Services",
    "Government and Non-Profit",
    "Transportation",
    "Travel",
    "Rent and Utilities"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedCategories, theme) {
    return {
      fontWeight:
      selectedCategories.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const DataGridTransactions = ({ categoryRows, dataGridColumns, dataGridRows, transactionMetadata, identifier }) => {
    const theme = useTheme();
    //const rows = dataGridRows;
    //const columns = dataGridColumns;
    const [displayColumns, setDisplayColumns] = useState(dataGridColumns);
    const [selectionModel, setSelectionModel] = useState([]);
    const [newDataGrid, setNewDataGrid] = useState(<></>);
    const [newCategory, setNewCategory] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [buttonState, setButtonState] = useState("secondary");
    const [buttonText, setButtonText] = useState("Visualize");
    const [categoriesToDisplay, setCategoriesToDisplay] = useState(dataGridRows);
    const dataGridPlaceholder = <DataGridComponent message="No transactions selected" rows={[]} columns={displayColumns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />;
    let selectedRowIds = new Array;
    // @ts-ignore
    const { success } = useFirestore();
    
    useEffect(() => {
        if (success) {
            setSelectionModel([]);
            setNewDataGrid(dataGridPlaceholder);
            setNewCategory(null);
            setDisabled(true);
            selectedRowIds = new Array;
        }
    }, [success])

    const handleChangeCategories = (event) => {
        const {
            target: { value },
          } = event;
          setSelectedCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        let toDisplay = new Array();
        selectedCategories.forEach(category => {
            categoryRows.forEach(row => {
                if (row.frontendName === category) {
                    toDisplay.push(row.transactions);
                }
            });
        });
        setCategoriesToDisplay(toDisplay.reduce((acc, cur) => acc.concat(cur), []));
        setButtonState('success');
        setButtonText('Success');
        setTimeout(() => {
            setButtonState('secondary');
            setButtonText('Visualize');
            setSelectedCategories([]);
        }, 2000)
    };

    const setRows = async () => {
        selectionModel.forEach(row => {
            selectedRowIds.push(dataGridRows.find(item => item.id == row));
        });
        setDisabled(false);
        setNewCategory(selectedRowIds)
    };
    
    useEffect(() => {
        if (!selectionModel || selectionModel.length == 0) {
            console.error("selectionModel is null");
            setNewDataGrid(<></>);
            setDisabled(true);
            return;
        };
        setRows();

        if (selectedRowIds.length > 0) {
            setNewDataGrid(
                <DataGridComponent message="No transactions selected" rows={categoriesToDisplay} columns={displayColumns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
            )
        }
    }, [selectionModel])

    const handleClick = (e) => {
        e.preventDefault();
    }
    const SelectCategory = () => {
        return (
            <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demultiple-categories-label">Categories</InputLabel>
            <Select
            labelId="demultiple-categories-label"
            id="multiple-categories"
            multiple
            value={selectedCategories}
            onChange={e => handleChangeCategories(e)}
            input={<OutlinedInput label="Categories" />}
            MenuProps={MenuProps}
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                minWidth: 150,
            }}
            >
            {categories.map((categories) => (
                <MenuItem
                key={categories}
                value={categories}
                style={getStyles(categories, selectedCategories, theme)}
                >
                {categories}
                </MenuItem>
            ))}
            </Select>
            <Button 
            onClick={e => handleCategorySubmit(e)} 
            variant="contained" 
            // @ts-ignore
            color={buttonState}
            sx={{
                boxShadow: 1,
                borderRadius: 1,
                minWidth: 150,
            }}
            >
            {buttonText}
            </Button>
        </FormControl>
        )
    }

      return (
        <>
        <SelectCategory />
        <section className={styles.datagridContainer}>
            <DataGridComponent message="No transactions selected" rows={categoriesToDisplay} columns={displayColumns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
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