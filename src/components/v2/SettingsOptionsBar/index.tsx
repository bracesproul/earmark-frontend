import {Box, Button} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import React from "react";
import {useColorTheme} from "../../../lib/hooks/useColorTheme";
import {useRouter} from "next/router";
import TimeframeSelector from "../TimeframeSelector";

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

function SettingsOptionsBar() {
    const appTheme = useColorTheme();
    const router = useRouter();
    const theme = React.useMemo(() => createTheme(getDesignTokens(appTheme.mode)), [appTheme.mode]);

    const settingButtonOptions = [
        {
            label: 'Profile',
            id: 'profile'
        },
        {
            label: 'Security',
            id: 'security'
        },
        {
            label: 'Integrations',
            id: 'integrations'
        },
        {
            label: 'FAQ',
            id: 'faq'
        },
        {
            label: 'Help',
            id: 'help'
        },
        {
            label: 'Demo',
            id: 'demo'
        },
    ];

    function handleClick(e) {
        e.preventDefault();
        router.push(`?s=${e.currentTarget.id}`);
        console.log('button id:', e.target.id);
    }
    return (
        <Box sx={{
            marginTop: '1rem',
            display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
            flexDirection: 'row',
        }}>
            <ThemeProvider theme={theme}>
                { settingButtonOptions.map((option, index) => (
                    <Button
                        size='small'
                        key={index}
                        sx={{
                            marginRight: '1rem',
                        }}
                        id={option.id}
                        onClick={(e) => handleClick(e)}
                    >
                        {option.label}
                    </Button>
                ))}
            </ThemeProvider>
        </Box>
    )
}

export default SettingsOptionsBar;