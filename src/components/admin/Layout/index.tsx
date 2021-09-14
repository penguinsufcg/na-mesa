import React, { FC } from 'react'
import { Flex } from '@chakra-ui/layout'

import Navbar from '@/components/admin/Navbar'

const Layout: FC = ({ children }) => {
  return (
    <Flex w="full" h="full">
      <Navbar />
      {children}
    </Flex>
  )
}

export default Layout
