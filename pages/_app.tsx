/* eslint-disable */
import '../styles/globals.css';
import { ProvideAuth } from '../lib/hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
    
  );
}

export default MyApp;
