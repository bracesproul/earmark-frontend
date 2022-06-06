/* eslint-disable */
import React from 'react';
  import { Box,
    Card,
    CardContent,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccountBalance = () => {
  
    const accounts2 = [
        {
        institution: 'Bank of America',
        accounts: [
            {
            balance: '664.11',
            subtype: 'Checking',
            name: 'Plaid Checking',
            accountNumber: '9900009652',
            accountId: 'vzeNDwK7KQIm4yEog683uElbp9seefsXGK98D',
            },
            {
            balance: '12,019.77',
            subtype: 'Savings',
            name: 'Plaid Savings',
            accountNumber: '9900004526',
            accountId: 'vzeNDwK7KQsefsefseGRLEFXGK98D',
            }
        ],
        image: 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/Logos/en_US/logos/colored_flagscape-v2.png'
        },
        {
        institution: 'JP Morgan Chase',
        accounts: [
            {
            balance: '129.08',
            institutionName: 'Chase',
            subtype: 'Checking',
            name: 'Plaid Checking',
            accountNumber: '9900009606',
            accountId: 'vzeNDwK7KQIm4yEog683uElbp9GRLEFXGK98D',
            },
        ],
        image: 'https://p.kindpng.com/picc/s/133-1333825_chase-logo-logo-chase-manhattan-bank-hd-png.png'
        }
    ];
  
    const card = (
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
          Account Balances
        </Typography>
        {accounts2.map((ins) => (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{ins.institution}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {ins.accounts.map((account) => (
              <React.Fragment key={account.accountId}>
                <Grid xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                      primary={`${account.name} - ${account.accountNumber.slice(-4)}`}
                      secondary={`$${account.balance}`}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </React.Fragment>
            ))}
            </AccordionDetails>
        </Accordion>
        ))}
      </CardContent>
    )
    
    return (
        <Box sx={{ padding: '30px', minWidth: '500px', maxWidth: '600px' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}
  
export default AccountBalance;