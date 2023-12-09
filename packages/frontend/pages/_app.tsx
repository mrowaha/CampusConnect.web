import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider as StoreProvider } from 'jotai';

import { MuiThemeProvider } from '@/theme'
import Layout from "@/layout";
import ProtectedRoute from '@/auth';

export default function App({ Component, pageProps }: AppProps) {


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
