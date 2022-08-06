/* eslint-disable */
import React, {
    useEffect,
    useMemo
} from 'react';
import '../styles/globals.css';
import Head from 'next/head'
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
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        }),
  },
});

function MyApp({ Component, pageProps }) {
  const appTheme = useColorTheme();
  const [ cookies ] = useCookies();
  console.log('mode from cookies', cookies['earmark-theme']);
  const theme = React.useMemo(() => createTheme(getDesignTokens(appTheme.mode)), [appTheme.mode]);


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
                  <Box sx={{
                      maxWidth: {md: '240px', lg: 'none'},
                      minWidth: {md: 'none', lg: '17%'},
                      float: 'left',
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


// unused maybe need later
/*
interface ITheme {
  buttonNormal: {
    maxWidth: string,
    minWidth: string,
    fontSize: string,
    color: string,
  };
}

let themeV = createTheme({
  palette: {
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
  },
});
* */