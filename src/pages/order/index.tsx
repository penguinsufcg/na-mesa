import Layout from '@/components/client/Layout'
import { Container } from '@chakra-ui/layout'
import React, { FC } from 'react'
import ordersData from './mockData'
import OrderCard from './components/OrderCard'

const CloseOrder: FC = () => {
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

export default CloseOrder
