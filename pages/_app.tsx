/* eslint-disable */
import '../styles/globals.css';
import { ProvideAuth } from '../src/lib/hooks/useAuth';
import { ProvideFirestore } from '../src/lib/hooks/useFirestore';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <ProvideFirestore>
        <Component {...pageProps} />
      </ProvideFirestore>
    </ProvideAuth>
    
  );
}

export default MyApp;
