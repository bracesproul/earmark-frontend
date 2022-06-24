/* eslint-disable */
import '../styles/globals.css';
import { ProvideAuth } from '../../src/lib/hooks/useAuth';
import { ProvideFirestore } from '../../src/lib/hooks/useFirestore';
import { CookiesProvider } from "react-cookie"
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

interface ITheme {
  buttonNormal: {
    maxWidth: string,
    minWidth: string,
    fontSize: string,
    color: string,
  };
}

let theme = createTheme({
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


function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <GoogleReCaptchaProvider
      reCaptchaKey="6LcMGSggAAAAAIgdzhS4NVFFq4_qaOKIJZ_Mfwvj"
      >
      <CookiesProvider>
        <ProvideFirestore>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ProvideFirestore>
      </CookiesProvider>
      </GoogleReCaptchaProvider>
    </ProvideAuth>
  );
}

export default MyApp;
