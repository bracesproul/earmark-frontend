/* eslint-disable */
import React, {
    useEffect,
    useMemo
} from 'react';
import '../styles/globals.css';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { ProvideAuth } from '../lib/hooks/useAuth';
import { ProvideFirestore } from '../lib/hooks/useFirestore';
import { ProvideRemoveCache } from '../lib/hooks/useRemoveCache';
import { ProvideBackgroundFetch } from "../lib/hooks/useBackgroundFetch";
import { CookiesProvider } from "react-cookie"
import { ProvideColorTheme, useColorTheme } from '../lib/hooks/useColorTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideNavCopy from "../components/Nav/SideNavCopy";
import ColorThemeSwitch from "../components/v2/ColorThemeSwitch";
import { Box } from '@mui/material';
import { useCookies } from "react-cookie";
import CssBaseline from "@mui/material/CssBaseline";

const getDesignTokens = (mode: any) => ({
  palette: {
    mode,
    ...(mode === 'light'
        ? {
          // palette values for light mode
          primary: {
            main: '#42a5f5',
            contrastText: "#fff",
          },
          secondary: {
            main: '#ba68c8',
            contrastText: "#fff",
          },
          error: {
            main: '#c62828',
            contrastText: "#fff",
          },
          warning: {
            main: '#ff9800',
            contrastText: "#fff",
          },
          success: {
            main: '#4caf50',
            contrastText: "#fff",
          },
          background: {
            default: '#f2f2f2',
          },
          settingButton: {
            main: '#242526',
          }
        }
        : {
          // palette values for dark mode
          divider: 'rgba(255, 255, 255, 0.12)',
          background: {
            default: '#121212',
            paper: '#1f1f1f',
          },
          text: {
            primary: '#f2f2f2',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        }),
  },
});

function AppWithSideNav({ Component, pageProps }) {
    return (
        <>
            <Box sx={{
                maxWidth: {md: '240px', lg: 'none'},
                minWidth: {md: 'none', lg: '17%'},
                float: 'left',
                position: 'absolute',
            }}>
                <SideNavCopy />
            </Box>
            <Box sx={{
                maxWidth: {sm: '100%', md: 'calc(100% - 240px)'},
                marginLeft: {sm: 'none', md: 'auto'},
                marginRight: {sm: 'none', md: '0'},
                margin: {sm: 'auto', md: 'none'}
            }}>
                <ColorThemeSwitch />
                <Component {...pageProps} />
            </Box>
        </>
    )
}

function AppWithoutSideNav({ Component, pageProps }) {
    return (
        <>
            <ColorThemeSwitch />
            <Component {...pageProps} />
        </>
    )
}


function MyApp({ Component, pageProps }) {
    const appTheme = useColorTheme();
    const router = useRouter();
    const [ cookies ] = useCookies();
    const theme = React.useMemo(() => createTheme(getDesignTokens(appTheme.mode)), [appTheme.mode]);
    console.log(router.pathname);

    return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>Earmark</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{
                    minWidth: '100%',
                    minHeight: '100%',
                }}>
                    { router.pathname === '/' && <AppWithoutSideNav Component={Component} pageProps={pageProps} /> }
                    { router.pathname.includes('/testing') && <AppWithSideNav Component={Component} pageProps={pageProps} /> }
                    { router.pathname.includes('/dashboard') && <AppWithSideNav Component={Component} pageProps={pageProps} /> }
                    { router.pathname.includes('/account') && <AppWithSideNav Component={Component} pageProps={pageProps} /> }
                    { router.pathname.includes('/auth') && <AppWithSideNav Component={Component} pageProps={pageProps} /> }
                </Box>
            </ThemeProvider>
        </>
    );
}


const AppProviders = ({ Component, pageProps }) => {
  return (
      <>
        <ProvideAuth>
          <CookiesProvider>
            <ProvideFirestore>
              <ProvideRemoveCache>
                <ProvideBackgroundFetch>
                  <ProvideColorTheme>
                    <MyApp Component={Component} pageProps={pageProps} />
                  </ProvideColorTheme>
                </ProvideBackgroundFetch>
              </ProvideRemoveCache>
            </ProvideFirestore>
          </CookiesProvider>
        </ProvideAuth>
      </>
  )
}

export default AppProviders;


function MyAppOld({ Component, pageProps }) {
    const appTheme = useColorTheme();
    const router = useRouter();
    const [ cookies ] = useCookies();
    const theme = React.useMemo(() => createTheme(getDesignTokens(appTheme.mode)), [appTheme.mode]);
    console.log(router.pathname);

    return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>Earmark</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{
                    minWidth: '100%',
                    minHeight: '100%',
                }}>
                    { router.pathname === ('/testing' || '/') && (
                        <>
                            <ColorThemeSwitch />
                            <Component {...pageProps} />
                        </>
                    )}
                    { router.pathname !== ( '/testing' || '/' ) && (
                        <>
                            <Box sx={{
                                maxWidth: {md: '240px', lg: 'none'},
                                minWidth: {md: 'none', lg: '17%'},
                                float: 'left',
                                position: 'absolute',
                            }}>
                                <SideNavCopy />
                            </Box>
                            <Box sx={{
                                maxWidth: {sm: '100%', md: 'calc(100% - 240px)'},
                                marginLeft: {sm: 'none', md: 'auto'},
                                marginRight: {sm: 'none', md: '0'},
                                margin: {sm: 'auto', md: 'none'}
                            }}>
                                <ColorThemeSwitch />
                                <Component {...pageProps} />
                            </Box>
                        </>
                    )}
                </Box>
            </ThemeProvider>
        </>
    );
}