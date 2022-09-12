/* eslint-disable */
import React, { useContext, createContext } from "react";
import axios from 'axios';

const webhookContext = createContext({});

export function ProvideWebhook({ children }) {
    const webhook = useProvideWebhook();
    return <webhookContext.Provider value={webhook}>{children}</webhookContext.Provider>;
}

const useProvideWebhook = () => {

    const newLogin = async (userId) => {
        const url = 'https://discord.com/api/webhooks/1018015242317480008/2cwFk7WMPJkjXpOEloytHPNv-PsBDPhRzelsuBHtVGzF16Tzk6Bwas73W5QZkRumzeQ-'
        const jsonPayload = {
            content: `<@479069058864775180>`,
            embeds: [
                {
                    title: "New login",
                    description: `User ID: ${userId}`,
                    color: 65280,
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
        return undefined;
    }

    const newAxiosError = async (error) => {
        const url = 'https://discord.com/api/webhooks/1018015242317480008/2cwFk7WMPJkjXpOEloytHPNv-PsBDPhRzelsuBHtVGzF16Tzk6Bwas73W5QZkRumzeQ-'
        const jsonPayload = {
            content: `<@479069058864775180>`,
            embeds: [
                {
                    title: "Axios Error",
                    description: `Error message: ${error.response.data}, Code: ${error.response.status}`,
                    color: 16711680,
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
        return undefined;
    }

    const newGeneralError = async (errorMessage) => {
        const url = 'https://discord.com/api/webhooks/1018015242317480008/2cwFk7WMPJkjXpOEloytHPNv-PsBDPhRzelsuBHtVGzF16Tzk6Bwas73W5QZkRumzeQ-'
        const jsonPayload = {
            content: `<@479069058864775180>`,
            embeds: [
                {
                    title: "Axios Error",
                    description: `Error message: ${errorMessage}`,
                    color: 16711680,
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
        return undefined;
    }

    return {
        newLogin,
        newAxiosError,
        newGeneralError
    };
}
interface IUseProvideWebhook {
    newLogin: (userId: string) => Promise<any>;
    newAxiosError: (error: any) => Promise<any>;
    newGeneralError: (errorMessage: string) => Promise<any>;
}

export const useWebhook = () => useContext(webhookContext) as IUseProvideWebhook;