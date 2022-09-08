/* eslint-disable */
import React, {
  useState,
  useEffect
} from 'react';
import Router from 'next/router';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Box,
  Tooltip, Typography
} from '@mui/material';
import { PlaidLinkInstitution } from '../PlaidLink';
import { useAuth } from '../../lib/hooks/useAuth';
import { useBackgroundFetch } from '../../lib/hooks/useBackgroundFetch';
import LoadingSkeleton from '../LoadingSkeleton';


const DatagridAccounts = () => {
  const auth = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fatalError, setFatalError] = useState(false);
  const callApi = useBackgroundFetch();

  const fetchData = async () => {
    return await callApi.fetchInstitutions();
  }

  useEffect(() => {
    if (!auth.user || typeof window == "undefined") {
      setLoading(true);
        return undefined;
    }
    fetchData()
        .then(data => {
          if (data.fatalError) {
            setFatalError(true);
            setLoading(false);
            return;
          }
          setAccounts(data.accounts);
          setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
            setFatalError(true);
        })
  }, [auth.user])


  const handleRemoveInstitution = (institutionId) => {
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
    )
    },
    { field: 'col8', 
    headerName: 'Remove Institution', 
    width: 150, 
    renderCell: (data) => (
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
    )
    },
    { field: 'ins_id', headerName: 'Ins_id', width: 60, hide: true },
  ];


    return (
        <Box sx={{
          padding: '2rem',
          height: 600,
          minWidth: "100%",
          margin: "auto"
        }}>
          <Typography
              variant='h4'
              sx={{
                textAlign: "center",
                fontWeight: '700',
                fontSize: '33px'
          }}
          >
            Connected Institutions
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '15px'
          }}>
            <PlaidLinkInstitution />
          </Box>
          <DataGrid
              autoHeight={true}
              sx={{
                  minHeight: '300px',
                  boxShadow: 1,
              }}
              rows={accounts}
              columns={columns}
              loading={loading}
              components={{
                LoadingOverlay: LoadingSkeleton
              }}
          />
        </Box>
    );
}

export default DatagridAccounts