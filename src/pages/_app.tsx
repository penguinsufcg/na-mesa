import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from '@/theme/index'
import '@/styles/globals.css'
import AuthProvider from '@/components/Auth/AuthProvider'
import React from 'react'

import SessionProvider from '@/components/Session/SessionProvider'
import { MinicartProvider } from '@/components/client/Minicart'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <SessionProvider>
          <MinicartProvider>
            <Component {...pageProps} />
          </MinicartProvider>
        </SessionProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
