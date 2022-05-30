/* eslint-disable */
import '../styles/globals.css';
import { ProvideAuth } from '../src/lib/hooks/useAuth';
import { ProvideFirestore } from '../src/lib/hooks/useFirestore';
import { CookiesProvider } from "react-cookie"
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <GoogleReCaptchaProvider
      reCaptchaKey="6LcMGSggAAAAAIgdzhS4NVFFq4_qaOKIJZ_Mfwvj"
      >
      <CookiesProvider>
        <ProvideFirestore>
            <Component {...pageProps} />
        </ProvideFirestore>
      </CookiesProvider>
      </GoogleReCaptchaProvider>
    </ProvideAuth>
    
  );
}

export default MyApp;
