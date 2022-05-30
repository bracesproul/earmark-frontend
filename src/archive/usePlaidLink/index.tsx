/* eslint-disable */
import React, { useState, useEffect, useContext, createContext, useCallback } from "react";
import { useAuth } from "../../lib/hooks/useAuth";
import { usePlaidLink } from 'react-plaid-link';
import axios from "axios";

const plaidLinkContext = createContext({});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvidePlaidLink({ children }) {
  const plaidLink = useProvidePlaidLink();
  return <plaidLinkContext.Provider value={plaidLink}>{children}</plaidLinkContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const usePLink = () => {
  return useContext(plaidLinkContext);
};

function useProvidePlaidLink() {
    const auth = useAuth();

    const [linkToken, setLinkToken] = useState(null);

    const fetchToken = useCallback(async () => {
        console.log('fetching token before user check')
        if (!auth.user) return null;
        console.log('fetching token AFTER user check')
        try {
            const config = {
                method: "post",
                headers: {
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                params: {
                    // @ts-ignore
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
        console.log('api key:', process.env.EARMARK_API_KEY);
        console.log('inside onsuc cb')
        const config = {
            method: "post",
            headers: {
                'earmark-api-key': process.env.EARMARK_API_KEY,
            },
            params: {
                // @ts-ignore
                user_id: auth.user.uid,
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

    return { 
        open, 
        exit, 
        ready, 
        fetchToken 
    }
}

// TODO: setup interface so I don't need to add @ts-ignore above every call of this hook
/*
interface AuthContextType {
  user: IUser;
  signOut: () => void;
  signIn: () => void;
}

export const useAuth = () => React.useContext(AuthContext) as AuthContextType;
*/