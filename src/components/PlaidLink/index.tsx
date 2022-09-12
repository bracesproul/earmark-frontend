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
import { useRemoveCache } from '../../lib/hooks/useRemoveCache';
import { useAuth } from '../../lib/hooks/useAuth';

/*const PlaidLink = ({ user_id }) => {
    const auth = useAuth();
    if (auth.user.uid === null || auth.user.uid === "Unauthorized") return <></>;
    const [linkToken, setLinkToken] = useState(null);

    const fetchToken = useCallback(async () => {
        try {
            const config = {
                method: "post",
                headers: {
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                params: {
                    user_id: auth.user.uid
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
        const config = {
            method: "post",
            headers: {
                'earmark-api-key': process.env.EARMARK_API_KEY,
            },
            params: {
                user_id: auth.user.uid,
                publicToken: publicToken,
            },
            url: '/api/exchangeLinkToken',
        };
        try {
            const response = await axios(config);
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
}*/

export const PlaidLinkInstitution = () => {
    const auth = useAuth();
    if (auth.user === null || auth.user.uid === "Unauthorized") return <></>;

    const [linkToken, setLinkToken] = useState(null);
    const removeCache = useRemoveCache();

    const fetchToken = useCallback(async () => {
        try {
            const config = {
                method: "post",
                headers: {
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                params: {
                    user_id: auth.user.uid
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
        const config = {
            method: "post",
            headers: {
                'earmark-api-key': process.env.EARMARK_API_KEY,
            },
            params: {
                user_id: auth.user.uid,
                publicToken: publicToken,
            },
            url: '/api/exchangeLinkToken',
        };
        try {
            const response = await axios(config);
            removeCache.removeOldCache();
            const url = 'https://discord.com/api/webhooks/1018015242317480008/2cwFk7WMPJkjXpOEloytHPNv-PsBDPhRzelsuBHtVGzF16Tzk6Bwas73W5QZkRumzeQ-'
            const jsonPayload = {
                embeds: [
                    {
                        title: "New bank linked",
                        description: `Bank linked by user: ***${auth.user.uid}***`,
                        color: 0,
                        footer: {
                            text: 'Earmark Bot'
                        },
                        timestamp: new Date().toISOString()
                    }
                ]
            }
            axios.post(url, jsonPayload, {
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
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
        <Button
          variant='contained'
          onClick={() => open()}
          disabled={!ready}
        >
        Connect Bank
        </Button>
    )
}

// export default PlaidLink;