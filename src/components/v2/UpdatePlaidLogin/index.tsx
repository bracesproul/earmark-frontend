import {useAuth} from "../../../lib/hooks/useAuth";
import React, {useCallback, useEffect, useState} from "react";
import {useRemoveCache} from "../../../lib/hooks/useRemoveCache";
import axios from "axios";
import {usePlaidLink} from "react-plaid-link";
import {Button} from "@mui/material";

export const UpdatePlaidLogin = (newLinkToken) => {
    const auth = useAuth();
    if (auth.user === null || auth.user.uid === "Unauthorized") return <></>;

    const removeCache = useRemoveCache();

    const onSuccess = useCallback(async (publicToken, metadata) => {
        console.log('PLAID LINK TOKEN METADATA:', metadata);
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
            console.log('PLAID LINK TOKEN SUCCESS RESPONSE:', response.data)
            removeCache.removeOldCache();

        } catch (error) {
            console.error("FETCH LINK TOKEN FAILURE, inside PlaidLink", error);
        }
    }, []);

    const config = {
        token: newLinkToken,
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