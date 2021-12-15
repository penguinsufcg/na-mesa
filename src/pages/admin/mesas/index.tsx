import React from 'react'
import Layout from '@/components/admin/Layout'
import { Flex, Heading, Spacer } from '@chakra-ui/layout'
import TableModal from '@/components/admin/TableModal'
import TablesList from '@/components/admin/TablesList'
import pageWithAuth from '@/pages/admin/auth/pageWithAuth'
import { Button, useDisclosure } from '@chakra-ui/react'
import { createTable } from '@/api/tables'

const Header = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const handleSubmit = async ({ tableNumber }: { tableNumber?: string }) => {
    if (!tableNumber) {
      return
    }
    await createTable(tableNumber)
  }
  return (
    <Flex sx={{ width: '100%' }}>
      <Heading>Mesas</Heading>
      <Spacer />
      <Button onClick={onOpen}>Adicionar mesa</Button>
      <TableModal
        title="Adicionar Mesa"
        modalProps={{ isOpen, onClose }}
        handleSubmit={handleSubmit}
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

export default pageWithAuth(MesasPage)
