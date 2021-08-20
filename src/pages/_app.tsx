import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from '@/theme/index'
import '@/styles/globals.css'
import AuthProvider from '@/components/Auth/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
