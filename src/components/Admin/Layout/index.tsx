import React, { FC } from 'react'
import { Flex } from '@chakra-ui/layout'

import AuthProvider from '@/components/Auth/AuthProvider'
import Navbar from '@/components/Navbar'

const Layout: FC = ({ children }) => {
  return (
    <AuthProvider>
      <Flex h="100vh" w="100vw">
        <Navbar />
        {children}
      </Flex>
    </AuthProvider>
  )
}

export default Layout