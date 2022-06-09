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
    Button,
} from '@mui/material';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLink = ({ user_id }) => {
    if (user_id === null || user_id === "Unauthorized") return <></>;
    const [linkToken, setLinkToken] = useState(null);

    const fetchToken = useCallback(async () => {
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
            console.error("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
        }
    }, []);

    useEffect(() => {
        fetchToken();
    }, [fetchToken]);

    const onSuccess = useCallback(async (publicToken, metadata) => {
        console.log('PLAID LINK TOKEN METADATA:', metadata);
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
            console.log('PLAID LINK TOKEN SUCCESS RESPONSE:', response.data)
        } catch (error) {
            console.error("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
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

export const PlaidLinkInstitution = (props) => {
    if (props.user_id === null || props.user_id === "Unauthorized") return <></>;
    const [linkToken, setLinkToken] = useState(null);

    const fetchToken = useCallback(async () => {
        try {
            const config = {
                method: "post",
                headers: {
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                params: {
                    user_id: props.user_id
                },
                url:'/api/createLinkToken',
            }
            const response = await axios(config);
            setLinkToken(response.data.linkToken);
        } catch (error) {
            console.error("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
        }
    }, []);

    useEffect(() => {
        fetchToken();
    }, [fetchToken]);

    const onSuccess = useCallback(async (publicToken, metadata) => {
        console.log('PLAID LINK TOKEN METADATA:', metadata);
        const config = {
            method: "post",
            headers: {
                'earmark-api-key': process.env.EARMARK_API_KEY,
            },
            params: {
                user_id: props.user_id,
                publicToken: publicToken,
            },
            url: '/api/exchangeLinkToken',
        };
        try {
            const response = await axios(config);
            console.log('PLAID LINK TOKEN SUCCESS RESPONSE:', response.data)
        } catch (error) {
            console.error("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
        }
    }, []);

    const config = {
        token: linkToken,
        onSuccess,
    }
    const { open, exit, ready } = usePlaidLink(config);

    return (
        <Button
          variant='contained'
          onClick={() => open()}
          disabled={!ready}
        >
        Connect Bank
        </Button>
    )
}

export default PlaidLink;