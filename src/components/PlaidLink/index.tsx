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

    const [linkToken, setLinkToken] = useState(null);

    const fetchToken = useCallback(async () => {
        try {
            const config = {
                method: "post",
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
        const config = {
            method: "post",
            params: {
                user_id: user_id,
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
    <>
    <a onClick={() => open()} hidden={!ready}>
    <h3 id="plaidLink" className={styles.sideNavOption}>Connect an Account</h3>
    </a>
    </>
    )
}

export default PlaidLink;