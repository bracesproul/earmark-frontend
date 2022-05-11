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

const PlaidLink = ({ user_id }) => {
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
            console.log("FETCH LINK TOKEN UI END SUCCESS", response.data);
            setLinkToken(response.data.linkToken);
        } catch (error) {
            console.log("FETCH LINK TOKEN UI END FAILURE", error);
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
            console.log("EXCHANGE LINK TOKEN UI END SUCCESS", response);
        } catch (error) {
            console.log("EXCHANGE LINK TOKEN UI END ERROR", error);
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
    <h3 id="plaidLink" className="plaidLink_side_nav">Connect an Account</h3>
    </a>
    </>
    )
}

export default PlaidLink;