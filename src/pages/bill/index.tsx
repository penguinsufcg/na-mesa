import { updateTableStatus } from '@/api/tables'
import Layout from '@/components/client/Layout'
import useSession from '@/hooks/useSession'
import useSessionReceipt from '@/hooks/useSessionReceipt'
import { Container } from '@chakra-ui/layout'
import React, { FC } from 'react'
import BillDetails from '@/components/BillDetails'

const BillPage = () => {
  const { session, sessionRef } = useSession()
  const { items: receiptItems, total: billTotal } = useSessionReceipt({
    sessionRef,
  })

  return (
    <Layout
      headerProps={{ title: 'Conta' }}
      footerProps={{
        value: billTotal || 0,
        buttonProps: {
          label: 'Solicitar pagamento',
          onClick: async () => {
            if (!session?.table) {
              return
            }
            await updateTableStatus({
              id: session?.table,
              newStatus: 'PAYMENT',
            })
          }
        },
      }}>
      <Container px={10}>
        <BillDetails items={receiptItems}/>
      </Container>
    </Layout>
  )
}

export default BillPage
