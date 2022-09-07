import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    InputLabel, MenuItem,
    Select,
    Typography,
    Alert, List, ListItem, ListItemIcon, ListItemText, Slide, ListItemButton
} from "@mui/material";
import { useAuth } from '../lib/hooks/useAuth';
import { getAuth, sendEmailVerification, linkWithRedirect } from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useColorTheme} from "../lib/hooks/useColorTheme";
import { useRouter } from "next/router";
import SettingsOptionsBar from "../components/v2/SettingsOptionsBar";
import SettingsProfile from "../components/v2/SettingsProfile";
import SettingsSecurity from "../components/v2/SettingsSecurity";
import SettingsIntegrations from "../components/v2/SettingsIntegrations";
import SettingsHelp from "../components/v2/SettingsHelp";
import SettingsFaq from "../components/v2/SettingsFaq";
import SettingsDemo from "../components/v2/SettingsDemo";
import { useBackgroundFetch } from "../lib/hooks/useBackgroundFetch";

function App() {
    const callApi = useBackgroundFetch();
    const fetchData = async () => {
        return await callApi.fetchSettingsInfo()
    }

    fetchData()
        .then((data) => {
            console.log('settings info', data);
        })
    return (
        <SettingsAppBar />
    )
}

export default App;

const getDesignTokens = (mode: any) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: '#242526',
                },
            }
            : {
                // palette values for dark mode
                primary: {
                    main: '#f2f2f2',
                },
            }),
    },
});

function SettingsAppBar() {
    const appTheme = useColorTheme();
    const router = useRouter();
    const theme = React.useMemo(() => createTheme(getDesignTokens(appTheme.mode)), [appTheme.mode]);
    const [selectedOption, setSelectedOption] = useState<any>('profile');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [])

    useEffect(() => {
        if (!mounted) return undefined;
        setSelectedOption(router.query.s);
    }, [mounted, router.query.s])


    return (
        <Box sx={{
            padding: '2rem'
        }}>
            <Typography sx={{
                fontSize: '2rem',
                fontWeight: 700,
            }}>
               Settings
            </Typography>
            <SettingsOptionsBar />
            <Divider sx={{ paddingTop: '5px' }} />
            { selectedOption === 'profile' && <SettingsProfile /> }
            { selectedOption === 'security' && <SettingsSecurity /> }
            { selectedOption === 'integrations' && <SettingsIntegrations /> }
            { selectedOption === 'help' && <SettingsHelp /> }
            { selectedOption === 'faq' && <SettingsFaq /> }
            { selectedOption === 'demo' && <SettingsDemo /> }
        </Box>
    )
}






