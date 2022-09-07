/* eslint-disable */
import React, {
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // for institutions link
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from "../../../lib/hooks/useBackgroundFetch";
import FatalErrorComponent from '../../FatalError';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaidIcon from '@mui/icons-material/Paid';

const AccountBalance = (props) => {
  const callApi = useBackgroundFetch();
  const auth = useAuth();
  const [accountDetails, setAccountDetails] = useState([]);
  const [fatalError, setFatalError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      if (!mounted) {
          setMounted(true);
      }
  }, [mounted])

    useEffect(() => {
        if (typeof window == "undefined") return undefined;
        if (!auth.user) return undefined;
        fetchData(false);
    }, [auth.user]);

  useEffect(() => {
      console.log('loading is: ', loading);
      console.log('accountDetails is: ', accountDetails);
  }, [loading])

  if (!mounted) return null;

  async function fetchData(forceRefresh:boolean) {
    const apiCall = await callApi.fetchAccountBalance(forceRefresh);
    if (apiCall.fatalError) {
      setFatalError(true);
      // setLoading(false);
      return;
    }
    setAccountDetails(apiCall.accountDetails);
    if (apiCall.accountDetails.length > 0) {
        setLoading(false);
    }
    console.log('data', apiCall);
    // setLoading(false);
  }

  const handleForceRetry = () => {
    setFatalError(false);
    // setLoading(true);
    fetchData(true);
  }


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
          {/*<ContentToDisplay/>*/}
          { fatalError && <FatalErrorComponent handleForceRetry={handleForceRetry} />}
          {
              !loading && (
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
          }
      </CardContent>
    )
    
    return (
        <Box sx={{ padding: '30px', margin: 'auto' }}>
            <Card
                sx={{
                    width: {sm: '95%', md: 'none'},
                    minWidth: {sm: 'none', md: 350},
                    maxWidth: {sm: 'none', md: 550},
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