/* eslint-disable */
import React, { 
    useState, 
    useEffect, 
    useCallback 
} from 'react';
import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
    PlaidLinkOnExit,
    PlaidLinkError,
    PlaidLinkOnExitMetadata,
} from 'react-plaid-link';
import axios from 'axios';

import styles from '../../../styles/SideNav/SideNav.module.css';

const PlaidLink = ({ user_id }) => {
    if (user_id === null || user_id === "Unauthorized") return <></>;
    console.log(process.env.EARMARK_API_KEY)
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
            console.log("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
        }
    }, []);

    useEffect(() => {
        fetchToken();
    }, [fetchToken]);

    const onSuccess = useCallback(async (publicToken, metadata) => {
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
    <a onClick={() => open()} hidden={!ready} id="plaidLink" className={styles.sideNavOption}>
    Connect an Account
    </a>
    )
}

export default PlaidLink;