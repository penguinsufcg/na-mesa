import Layout from '@/components/client/Layout'
import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import useSession from '@/hooks/useSession'
import { Container } from '@chakra-ui/layout'
import React, { FC } from 'react'
import OrderCard from './components/OrderCard'

const CloseOrder: FC = () => {
  const { session } = useSession()
  const { data } = useFirestoreListQuery(
    `orders`,
    {
      where: ['session', '==', `sessions/${session?.id}`],
    },
    [session],
  )

  return (
    <Layout
      headerProps={{ title: 'Conta' }}
      footerProps={{
        value: 50.0,
        buttonProps: { label: 'Fechar Conta', onClick: () => {} },
      }}>
      <Container p={4} sx={{ overflowY: 'auto' }}>
        {data?.map((order, index) => (
          <OrderCard order={order} key={index} />
        ))}
      </Container>
    </Layout>
  )
}

export default CloseOrder
