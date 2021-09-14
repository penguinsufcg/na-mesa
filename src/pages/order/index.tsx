import PageHeader from '@/components/client/PageHeader'
import { Button } from '@chakra-ui/button'
import { Box, Divider, Flex, HStack, Text } from '@chakra-ui/layout'
import React from 'react'
import OrderCard from './OrderCard'

const MenuPage = () => {
  return (
    <Flex h="100vh" direction="column">
      <PageHeader title="Conta" />
      <OrderCard />
      <Divider color="secondary.100" />

      {/**To fix to be at the bottom, fix spacing */}
      <Box w="full" alignSelf="flex-end">
        <HStack justify="space-between">
          <Text>Total</Text>
          <Text>R$ 50.00</Text>
        </HStack>
        <Button w="full" size="sm" background="primary.400">
          Fechar Conta
        </Button>
      </Box>
    </Flex>
  )
}

export default MenuPage
