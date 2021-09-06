import { Center, Box, Heading, Flex } from '@chakra-ui/react'
import Layout from '@/components/admin/Layout'
import DragAndDrop from '@/components/admin/Dnd'

export default function Orders() {
  return (
    <Layout>
      <Center h="100vh" w="100vw">
        <Flex direction="column" height="100%">
          <Box padding="40px 30px">
            <Heading size="lg" fontWeight="light">Pedidos</Heading>
          </Box>
          <DragAndDrop />
        </Flex>
      </Center>
    </Layout>
  )
}
