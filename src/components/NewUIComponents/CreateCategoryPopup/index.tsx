/* eslint-disable */
import React, {
    useEffect,
    useState,
} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from '../../../styles/Dashboard/Dashboard.module.css';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useFirestore } from '../../../lib/hooks/useFirestore'
import { Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material';

const CreateCategoryPopup = ({ transactions, disabled }) => {
    const [category, setCategory] = useState('');
    const auth = useAuth();
    const firestore = useFirestore();
    if (!transactions) return <button disabled={disabled} >Create Category</button>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // @ts-ignore
        firestore.updateCategory(category, transactions);
    };

    return (
        <Popup
        trigger={ <button disabled={disabled} >Create Category</button> }
        modal
        nested
      >
        {/* @ts-ignore */ }
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className={styles.popupHeaderContainer}><h3 className={styles.popupHeader}>Create new transaction category</h3></div>
            <div className={styles.popupContentContainer}>
            <h4></h4>
            <div className={styles.muiSelectContainer}>
                <FormControl required={true} fullWidth={true}>
                    <InputLabel id="select-label">Age</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={category}
                        label="Age"
                        onChange={e => setCategory(e.target.value)}
                    >
                        <MenuItem value="Travel">Travel</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Fun">Fun</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {transactions.map((item, itemIdx) => {
                return (
                    <div className={styles.confirmTxnsContainer} key={itemIdx}>
                        <p>Name: {item.col1}</p>
                        <p>Amount: ${item.col3}</p>
                        <p>Date: {item.col2}</p>
                        <hr />
                    </div>
                )
            })}
                <button 
                id="submit" 
                value="submit" 
                type="submit"
                onClick={(e) => {
                handleSubmit(e);
                close();
                }} 
                >
                    Submit
                </button>

            </div>
            <div className="actions">
                <button
                className="button"
                onClick={() => {
                  close();
                }}
                >
                Exit
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
};

export default CreateCategoryPopup;