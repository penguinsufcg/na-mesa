import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from '@/theme/index'
import '@/styles/globals.css'

import AuthProvider from '@/components/Auth/AuthProvider'
import Navbar from '@/components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Flex h="full">
          <Navbar />
          <Component {...pageProps} />
        </Flex>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
