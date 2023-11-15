import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider as StoreProvider } from 'jotai';

import { MuiThemeProvider } from '@/theme'
import Layout from "@/layout";

export default function App({ Component, pageProps }: AppProps) {


  return (
    <StoreProvider> 
      <MuiThemeProvider>
        <Layout>
          <Component  {...pageProps} />
        </Layout>
      </MuiThemeProvider> 
    </StoreProvider>
  )
}
