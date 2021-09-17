import Layout from '@/components/client/Layout'
import PageHeader from '@/components/client/PageHeader'
import { Button } from '@chakra-ui/button'
import { Container, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import ordersData from './mockData'
import OrderCard from './OrderCard'

const MenuPage = () => {
  return (
    <Layout
      headerProps={{ title: 'Conta' }}
      footerProps={{
        value: 50.0,
        buttonProps: { label: 'Fechar Conta', onClick: () => {} },
      }}>
      <Container p={4} sx={{ overflowY: 'auto' }}>
        {ordersData.map((order, index) => (
          <OrderCard order={order} key={index} />
        ))}
      </Container>
    </Layout>
  )
}

export default MenuPage
