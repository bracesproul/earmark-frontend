/* eslint-disable */
import React, { 
    useState, 
    useEffect,
    useCallback,
} from 'react';
import axios from 'axios';
import CableIcon from '@mui/icons-material/Cable';
import { ListItem, 
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLink = ({ user_id }) => {
    if (user_id === null || user_id === "Unauthorized") return <></>;
    const [linkToken, setLinkToken] = useState(null);

    const fetchToken = useCallback(async () => {
        console.log('fetching plaid link token...');
        try {
            const config = {
                method: "post",
                headers: {
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                params: {
                    user_id: user_id
                },
                url:'/api/createLinkToken',
            }
            const response = await axios(config);
            setLinkToken(response.data.linkToken);
        } catch (error) {
            console.log("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
        }
    }, []);

    useEffect(() => {
        fetchToken();
    }, [fetchToken]);

    const onSuccess = useCallback(async (publicToken, metadata) => {
        console.log(metadata);
        console.log('api key:', process.env.EARMARK_API_KEY);
        console.log('inside onsuc cb')
        const config = {
            method: "post",
            headers: {
                'earmark-api-key': process.env.EARMARK_API_KEY,
            },
            params: {
                user_id: user_id,
                publicToken: publicToken,
            },
            url: '/api/exchangeLinkToken',
        };
        try {
            const response = await axios(config);
            console.log(response.data)
        } catch (error) {
            console.log("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
        }
    }, []);

    const config = {
        token: linkToken,
        onSuccess,
    }
    const { open, exit, ready } = usePlaidLink(config);

    return (
        <ListItem onClick={() => open()} disabled={!ready} key={'plaidLink'} disablePadding>
            <ListItemButton>
            <ListItemIcon>
            <CableIcon />
            </ListItemIcon>
            <ListItemText primary='Connect Bank' />
            </ListItemButton>
        </ListItem>
    )
}

export default PlaidLink;