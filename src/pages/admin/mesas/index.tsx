import React from 'react'
import Layout from '@/components/admin/Layout'
import { Flex, Heading, Spacer } from '@chakra-ui/layout'
import CreateTableModal from '@/components/admin/TableModal'
import TablesList from '@/components/admin/TablesList'
import { Button, useDisclosure } from '@chakra-ui/react'

const Header = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  return (
    <Flex sx={{ width: '100%' }}>
      <Heading>Mesas</Heading>
      <Spacer />
      <Button onClick={onOpen}>Adicionar mesa</Button>
      <CreateTableModal
        title="Adicionar Mesa"
        modalProps={{ isOpen, onClose }}
      />
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

export default MesasPage
