import React from 'react'
import Layout from '@/components/admin/Layout'
import { Flex, Heading, Spacer } from '@chakra-ui/layout'
import Login from '@/pages/admin/auth/index'

const InitialPage = () => {
  return (
    <Flex direction="column" sx={{ width: 'full', padding: 4 }}>
      <Login />
    </Flex>
  )
}

export default InitialPage
