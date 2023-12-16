import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider as StoreProvider } from 'jotai';

import { MuiThemeProvider } from '@/theme'
import Layout from "@/layout";
import ProtectedRoute from '@/auth';
import { BACKEND_URL } from '@/routes';

export default function App({ Component, pageProps }: AppProps) {

  console.log(BACKEND_URL);

  return (
    <StoreProvider> 
      <MuiThemeProvider>
        <Layout>
          { 
            pageProps.protected ?
            <ProtectedRoute>
              <Component  {...pageProps} />        
            </ProtectedRoute>
            : <Component  {...pageProps} />        
          } 
        </Layout>
      </MuiThemeProvider> 
    </StoreProvider>
  )
}
