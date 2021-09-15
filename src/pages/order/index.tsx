import PageHeader from '@/components/client/PageHeader'
import { Button } from '@chakra-ui/button'
import { Box, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import OrderCard from './OrderCard'

const MenuPage = () => {
  return (
    <Flex h="100vh" direction="column">
      <PageHeader title="Conta" />
      <OrderCard />

      {/**To fix to be at the bottom, fix spacing */}
      <VStack
        w="full"
        spacing={4}
        sx={{
          padding: 5,
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
    </Flex>
  )
}

export default MenuPage
