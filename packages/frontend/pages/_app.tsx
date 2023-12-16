import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider as StoreProvider } from 'jotai';

import { MuiThemeProvider } from '@/theme'
import Layout from "@/layouts";
import ProtectedRoute from '@/auth';


export type PageLayoutType = "profile";

export default function App({ Component, pageProps }: AppProps) {

  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <StoreProvider> 
      <MuiThemeProvider>
        <Layout>
            { 
              pageProps.protected ?
              <ProtectedRoute>
                {getLayout(<Component  {...pageProps} />)}        
              </ProtectedRoute>
              : getLayout(<Component  {...pageProps} />)        
            } 
        </Layout>
      </MuiThemeProvider> 
    </StoreProvider>
  )
}
