import React, {useEffect, useState} from 'react';
import SeeAccount from '../../components/Account'
import {useColorTheme} from "../../lib/hooks/useColorTheme";
import {useRouter} from "next/router";
import {createTheme} from "@mui/material/styles";
import {Box, Divider, Typography} from "@mui/material";
import SettingsOptionsBar from "../../components/v2/SettingsOptionsBar";
import SettingsProfile from "../../components/v2/SettingsProfile";
import SettingsSecurity from "../../components/v2/SettingsSecurity";
import SettingsIntegrations from "../../components/v2/SettingsIntegrations";
import SettingsHelp from "../../components/v2/SettingsHelp";
import SettingsFaq from "../../components/v2/SettingsFaq";
import SettingsDemo from "../../components/v2/SettingsDemo";
import {parseCookies} from "../../lib/parseCookies";

export async function getServerSideProps({ req, res }) {
    const cookie = parseCookies(req).user_id
    console.log('cookie', cookie)
    if (res) {
        if (!cookie) {
            return {
                props: {
                    cookie: null,
                },
            }
        }
        if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }
    return {
        props: {
            cookie: cookie,
        },
    }
}

const AccountPage = () => {
    return (
        <>
        <SeeAccount />
        </>
    )
}

AccountPage;

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

export default function SettingsAppBar({ cookie }) {
    const appTheme = useColorTheme();
    const router = useRouter();
    const theme = React.useMemo(() => createTheme(getDesignTokens(appTheme.mode)), [appTheme.mode]);
    const [selectedOption, setSelectedOption] = useState<any>('profile');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!cookie) {
            router.push("/auth/signin")
        }
    }, [cookie])

    useEffect(() => {
        if (!mounted) return undefined;
        if (!router.query.s) {
            router.push('?s=profile');
        } else return undefined;
    }, [mounted])

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