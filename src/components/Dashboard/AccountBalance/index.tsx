/* eslint-disable */
import React, {
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import { Box,
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItemButton,
    ListItemIcon,
    Tooltip,
    IconButton,
    Alert,
    AlertTitle
} from '@mui/material';
import FatalErrorComponent from '../../FatalError';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // for institutions link
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from "../../../lib/hooks/useBackgroundFetch";
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaidIcon from '@mui/icons-material/Paid';

const AccountBalance = (props) => {
  const callApi = useBackgroundFetch();
  const auth = useAuth();
  const [accountDetails, setAccountDetails] = useState([]);
  const [fatalError, setFatalError] = useState(false);
  const [loading, setLoading] = useState(true);

/*  const fetchData = async () => {
    try {
      const currentTime = Date.now();
      const expTime = currentTime + 86400000;
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/api/dashboard',
        params: {
          user_id: props.cookie,
          queryType: 'accountDetails',
          startDate: '2021-01-01',
          endDate: '2022-01-01',
        }
      }
      const { data } = await axios(config);
      if (data.accountDetails) {
        setAccountDetails(data.accountDetails);
        setLoading(false)
        localStorage.setItem(`accountBalanceCachedData`, JSON.stringify(data.accountDetails));
        localStorage.setItem(`accountBalanceCacheExpTime`, expTime.toString());
        return;
      } else {
        setFatalError(true);
        setLoading(false)
        return;
      }
    } catch (error) {
      setFatalError(true);
      setLoading(false)
      console.error(error)
    }
  };

  const cacheData = () => {
    if (typeof window == "undefined") return;
    try {
      const currentTime = Date.now();
      const cacheExpTime = parseInt(localStorage.getItem(`accountBalanceCacheExpTime`));
      if (!cacheExpTime || cacheExpTime < currentTime) {
        fetchData();
      } else if (cacheExpTime > currentTime) {
        const cachedData = JSON.parse(localStorage.getItem(`accountBalanceCachedData`));
        setAccountDetails(cachedData);
      }
    } catch (error) {
      setFatalError(true);
      console.error('the below error occurred in `components/Dashboard/SpendingOverview` - line 67 - method: cachedData()')
      console.error(error)
    }
  };*/

  const fetchData = async (forceRefresh:boolean) => {
    const apiCall = await callApi.fetchAccountBalance(forceRefresh);
    if (apiCall.fatalError) {
      setFatalError(true);
      setLoading(false);
      return;
    }
    setAccountDetails(apiCall.accountDetails);
    setLoading(false);
  }

  useEffect(() => {
    if (typeof window == "undefined") return;
    if (!auth.user) return;
    fetchData(false);
  }, [auth.user]);

  const handleForceRetry = () => {
    setFatalError(false);
    setLoading(true);
    fetchData(true);
  }

  const ContentToDisplay = () => {
    if (fatalError) {
        return <FatalErrorComponent handleForceRetry={handleForceRetry} />
    } else if (!fatalError && loading) {
        return null;
    } else if (!loading && !fatalError) {
        return accountDetailsComponent;
    }
  }

  const accountDetailsComponent = (
    <>
      {accountDetails.map((ins, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 'bold' }}>{ins.institution}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {ins.accounts.map((account) => {
              return (
                <React.Fragment key={account.accountId}>
                  <Grid item xs={12} md={12}>
                    <List sx={{ display: 'flex', flexDirection: 'row' }}>
                      <ListItem>
                        <ListItemText
                          primary={`${account.name} - ${account.accountNumber.slice(-4)}`}
                          secondary={`$${account.balance}`}
                        />
                      </ListItem>
                      <Tooltip title={`Transactions for ${account.name}`}>
                        <ListItemButton onClick={() => Router.push(`/dashboard/${account.ins_id}?account_id=${account.accountId}`)}>
                          <ListItemIcon>
                            <PaidIcon />
                          </ListItemIcon>
                        </ListItemButton>
                      </Tooltip>
                    </List>
                  </Grid>
                </React.Fragment>
              )
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )


  // TODO: make sure account details show when api call works
  
    const card = (
      <CardContent>
        {/* desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row'}}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
            Account Information
          </Typography>
          <Button
          variant="contained" 
          onClick={() => Router.push('/dashboard/institutions')}
          sx={{ marginLeft: '15px', marginBottom: '15px', maxWidth: 'fitContent', maxHeight: 'fitContent', fontSize: '12px' }}
          >
            Detailed account information
          </Button>
        </Box>
        {/* mobile */}
        <Box sx={{ 
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'row'
        }}>
          <List sx={{
            display: 'flex', 
            flexDirection: 'row'
          }}>
            <ListItem sx={{
              display: 'flex', 
              justifyContent: 'flex-start'
            }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
                Account Information
              </Typography>
            </ListItem>
            <ListItem sx={{
              display: 'flex', 
              justifyContent: 'flex-end'
            }}>
              <IconButton
              onClick={() => Router.push('/dashboard/institutions')}
              >
                <AccountBalanceIcon />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <ContentToDisplay />
      </CardContent>
    )
    
    return (
        <Box sx={{ padding: '30px' }}>
            <Card
                sx={{
                    minWidth: 600,
                    minHeight: 'fitContent'
                }}
                variant="outlined"
            >
                {card}
            </Card>
        </Box>
    );
}
  
export default AccountBalance;