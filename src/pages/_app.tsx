import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from '@/theme/index'
import '@/styles/globals.css'
import AuthProvider from '@/components/Auth/AuthProvider'
import React from 'react'

import SessionProvider from '@/components/Session/SessionProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
