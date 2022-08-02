/* eslint-disable */
import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from '../../../styles/Dashboard/Dashboard.module.css';
import DataGridComponent from '../Datagrid';
import CreateCategoryPopup from '../CreateCategoryPopup'
import { useFirestore } from '../../../lib/hooks/useFirestore';
import { globalVars } from '../../../lib/globalVars';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from '../../../lib/hooks/useBackgroundFetch';

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

const API_URL = globalVars().API_URL;

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

const allTransactionsColumns = [
    { field: 'col1', headerName: 'Name', width: 150 },
    { field: 'col2', headerName: 'Date', width: 150 },
    { field: 'col3', headerName: 'Amount', width: 150 },
    { field: 'col4', headerName: 'Category', width: 150 },
];

const DataGridTransactions = () => {
    const theme = useTheme();
    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const [displayColumns, setDisplayColumns] = useState(allTransactionsColumns);
    const [selectionModel, setSelectionModel] = useState([]);
    const [newDataGrid, setNewDataGrid] = useState(<></>);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [buttonState, setButtonState] = useState("secondary");
    const [buttonText, setButtonText] = useState("Visualize");
    const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
    const [categoryRows, setCategoryRows] = useState([]);
    const [fatalError, setFatalError] = useState(false);
    const [loading, setLoading] = useState(true);
    const dataGridPlaceholder = <DataGridComponent checkboxSelection={true} message="No transactions selected" rows={[]} columns={displayColumns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />;
    let selectedRowIds = new Array;
    // @ts-ignore
    const { success } = useFirestore();

/*    const fetchData = async () => {
        const currentTime = Date.now();
        const expTime = currentTime + 86400000;
        const byCategoryConfig = {
            method: "GET",
            url: '/api/allTransactionsByCategory',
            params: {
                user_id: auth.user.uid,
                startDate: startDate,
                endDate: endDate,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const categoryResponse = await axios(byCategoryConfig);
    
        const config = {
            method: "GET",
            url: '/api/getAllTransactions',
            params: {
                user_id: auth.user.uid,
                startDate: startDate,
                endDate: endDate,
                queryType: 'datagrid',
            },
            headers: {
                'Content-Type': 'application/json',
                'earmark-api-key': process.env.EARMARK_API_KEY,
            },
        };
        const { data } = await axios(config);
        console.log('running')
        setCategoriesToDisplay(data.dataGridTransactions);
        setCategoryRows(categoryResponse.data.transactions);
        localStorage.setItem(`allTransactionsCacheExpTime`, expTime.toString());
        localStorage.setItem(`allTransactionsCacheRows`, JSON.stringify(data.dataGridTransactions));
        localStorage.setItem(`allTransactionsCacheCategoryRows`, JSON.stringify(categoryResponse.data.transactions));
    };

    const cacheData = () => {
        if (typeof window == "undefined") return;
        const currentTime = Date.now();
        const cacheExpTime = parseInt(localStorage.getItem(`allTransactionsCacheExpTime`));
        const cachedData = JSON.parse(localStorage.getItem(`allTransactionsCacheRows`));
        const cachedDataCategoryRows = JSON.parse(localStorage.getItem(`allTransactionsCacheCategoryRows`));
        if (!cacheExpTime || !cachedData) {
            fetchData();
        } else if (cacheExpTime < currentTime) {
            fetchData();
        } else if (cacheExpTime > currentTime) {
            setCategoriesToDisplay(cachedData);
            setCategoryRows(cachedDataCategoryRows)
        }
      };*/

    const fetchData = async (forceRefresh:boolean) => {
        return await callApi.fetchAllTransactions(forceRefresh);
    }

    useEffect(() => {
        if (!auth.user) return;
        fetchData(false)
            .then((res) => {
                setCategoriesToDisplay(res.categoriesToDisplay);
                setCategoryRows(res.categoryRows);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setFatalError(true)
            })
    }, [auth.user])
    
    useEffect(() => {
        if (success) {
            setSelectionModel([]);
            setNewDataGrid(dataGridPlaceholder);
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
            selectedRowIds.push(categoriesToDisplay.find(item => item.id == row));
        });
    };
    
    useEffect(() => {
        if (!selectionModel || selectionModel.length == 0) {
            console.error("selectionModel is null");
            setNewDataGrid(<></>);
            return;
        };
        setRows();

        if (selectedRowIds.length > 0) {
            setNewDataGrid(
                <DataGridComponent checkboxSelection={true} message="No transactions selected" rows={categoriesToDisplay} columns={displayColumns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
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
            <DataGridComponent checkboxSelection={true} message="No transactions found" rows={categoriesToDisplay} columns={displayColumns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
            {!selectionModel || selectionModel.length == 0 ? dataGridPlaceholder : newDataGrid}
        </section>
        </>
      );
}




export default DataGridTransactions;