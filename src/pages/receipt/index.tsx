import { updateTableStatus } from '@/api/tables'
import Layout from '@/components/client/Layout'
import { useRouter } from 'next/router'
import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import useSession from '@/hooks/useSession'
import { Container } from '@chakra-ui/layout'
import React, { FC } from 'react'
import OrderCard from './components/OrderCard'

const CloseOrder: FC = () => {
  const router = useRouter()
  const { session, sessionRef } = useSession()
  const { data } = useFirestoreListQuery<Order>(
    `orders`,
    {
      where: ['session', '==', sessionRef],
    },
    [sessionRef],
  )

  const getSubtotal = (orders: OrderItem[]) =>
    orders.reduce((acc, current) => acc + current.quantity * current.price, 0)

  const ordersWithSubtotal =
    data?.map((order) => ({ ...order, subtotal: getSubtotal(order.items) })) ||
    []

  const total = ordersWithSubtotal.reduce(
    (acc, current) => acc + current.subtotal,
    0,
  )

  return (
    <Layout
      headerProps={{ title: 'Conta' }}
      footerProps={{
        value: total || 0,
        buttonProps: {
          label: 'Fechar Conta',
          onClick: () => {
            router.push('bill')
          },
        },
      }}>
      <Container p={4} sx={{ overflowY: 'auto' }}>
        {ordersWithSubtotal.map((order, index) => (
          <OrderCard order={order} key={index} />
        ))}
      </Container>
    </Layout>
  )
}

export default CloseOrder
