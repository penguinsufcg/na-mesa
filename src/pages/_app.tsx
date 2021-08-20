import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from '@/theme/index'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
