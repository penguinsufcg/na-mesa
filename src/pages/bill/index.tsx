import { useState } from 'react'
import useSession from '@/hooks/useSession'
import useSessionReceipt from '@/hooks/useSessionReceipt'

import { useToast } from '@chakra-ui/react'
import { Container } from '@chakra-ui/layout'
import { updateTableStatus } from '@/api/tables'
import { updateSessionStatus } from '@/api/session'
import Layout from '@/components/client/Layout'
import BillDetails from '@/components/BillDetails'

const BillPage = () => {
  const { session, sessionRef, underPayment } = useSession()
  const { items: receiptItems, total: billTotal } = useSessionReceipt({
    sessionRef,
  })

  const toast = useToast()

  const handleClick = async () => {
    if (!session?.table) {
      return
    }
    await updateTableStatus({
      id: session?.table,
      newStatus: 'PAYMENT',
    })

    await updateSessionStatus(session.id, 'PAYMENT')

    toast({
      title: 'Pagamento solicitado!',
      description: 'Aguarde pelo garçom :)',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Layout
      headerProps={{ title: 'Conta' }}
      footerProps={{
        value: billTotal || 0,
        buttonProps: {
          children: 'Solicitar pagamento',
          onClick: handleClick,
          disabled: underPayment
        },
      }}>
      <Container px={10}>
        <BillDetails items={receiptItems} />
      </Container>
    </Layout>
  )
}

export default BillPage
