import { Heading, Flex } from '@chakra-ui/react'
import Layout from '@/components/admin/Layout'
import DragAndDrop from '@/components/admin/Dnd'
import pageWithAuth from '@/pages/admin/auth/pageWithAuth'

const Orders = () => {
  return (
    <Layout>
      <Flex direction="column" height="full" padding={12}>
        <Flex paddingBottom={14}>
          <Heading fontWeight="normal">Pedidos</Heading>
        </Flex>
        <DragAndDrop />
      </Flex>
    </Layout>
  )
}

export default pageWithAuth(Orders)
