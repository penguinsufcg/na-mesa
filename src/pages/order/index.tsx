import PageHeader from '@/components/client/PageHeader'
import { Button } from '@chakra-ui/button'
import { Container, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import ordersData from './mockData'
import OrderCard from './OrderCard'

const Footer = () => {
  return (
    <VStack
      w="full"
      align="end"
      sx={{
        padding: 5,
        marginTop: 'auto',
        borderTopWidth: '1px',
        borderTopColor: 'secondary.100',
      }}>
      <HStack w="full" justify="space-between" fontFamily="heading">
        <Text>Total</Text>
        <Text>R$ 50.00</Text>
      </HStack>
      <Button w="100%" size="sm" background="primary.400">
        Fechar Conta
      </Button>
    </VStack>
  )
}
const MenuPage = () => {
  return (
    <Flex h="100vh" direction="column">
      <PageHeader title="Conta" />
      <Container p={4}>
        {ordersData.map((order, index) => (
          <OrderCard order={order} key={index} />
        ))}
      </Container>

      <Footer />
    </Flex>
  )
}

export default MenuPage
