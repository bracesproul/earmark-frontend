/* eslint-disable */
import '../styles/globals.css';
import { ProvideAuth } from '../src/lib/hooks/useAuth';
import { ProvideFirestore } from '../src/lib/hooks/useFirestore';
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <CookiesProvider>
        <ProvideFirestore>
          <Component {...pageProps} />
        </ProvideFirestore>
      </CookiesProvider>
    </ProvideAuth>
    
  );
}

export default MyApp;
