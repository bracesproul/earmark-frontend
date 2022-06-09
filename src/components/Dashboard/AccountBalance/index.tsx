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
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // for institutions link
import { useAuth } from '../../../lib/hooks/useAuth';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaidIcon from '@mui/icons-material/Paid';

const AccountBalance = (props) => {
  const auth = useAuth();
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    if (!auth.user) {
      console.error('no user logged in');
      return;
    }
    const fetchData = async () => {
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
      setAccountDetails(data.accountDetails);
      console.log('acc balance', data)
    };
    fetchData();
  }, []);
  
    const card = (
      <CardContent>
        {/* desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row'}}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
            Account Information
          </Typography>
          <Button
          variant="contained" 
          onClick={() => console.log('more clicked')}
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
              onClick={() => console.log('more clicked')}
              >
                <AccountBalanceIcon />
              </IconButton>
            </ListItem>
          </List>

        </Box>
        {!accountDetails ? (<h1>No accounts</h1>) : (
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
                  console.log('acc', account);
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
        )}

      </CardContent>
    )
    
    return (
        <Box sx={{ padding: '30px', minWidth: '500px', maxWidth: '600px' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}
  
export default AccountBalance;