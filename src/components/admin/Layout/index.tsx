import React, { FC } from 'react'
import { Flex } from '@chakra-ui/layout'

import Navbar from '@/components/admin/Navbar'

const Layout: FC = ({ children }) => {
  return (
    <Flex direction="row" overflow="hidden" maxHeight="100vh">
      <Navbar />
      <Flex width="full" overflow="auto">
        {children}
      </Flex>
    </Flex>
  )
}

export default Layout
