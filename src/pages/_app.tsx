import { MinicartProvider } from '@/components/client/Minicart'
import SessionProvider from '@/components/Session/SessionProvider'
import '@/styles/globals.css'
import theme from '@/theme/index'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import AdminAuthProvider from './admin/auth/AdminAuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <ChakraProvider theme={theme}>
      {router.pathname.startsWith('/admin') ? (
        <AdminAuthProvider>
          <Component {...pageProps} />
        </AdminAuthProvider>
      ) : (
        <SessionProvider>
          <MinicartProvider>
            <Component {...pageProps} />
          </MinicartProvider>
        </SessionProvider>
      )}
    </ChakraProvider>
  )
}

export default MyApp
