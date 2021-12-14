import React from 'react'
import Layout from '@/components/admin/Layout'
import { Flex, Heading, Spacer } from '@chakra-ui/layout'
import CreateTableModal from '@/components/admin/CreateTableModal'
import TablesList from '@/components/admin/TablesList'
import pageWithAuth from '@/pages/admin/auth/pageWithAuth'

const Header = () => {
  return (
    <Flex sx={{ width: '100%' }}>
      <Heading>Mesas</Heading>
      <Spacer />
      <CreateTableModal />
    </Flex>
  )
}

const MesasPage = () => {
  return (
    <Layout>
      <Flex direction="column" sx={{ width: 'full', padding: 4 }}>
        <Header />
        <TablesList />
      </Flex>
    </Layout>
  )
}

export default pageWithAuth(MesasPage)
