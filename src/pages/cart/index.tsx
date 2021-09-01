import React from 'react'
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'

import { DATA } from './mockedData'
import CartList from '@/components/client/CartList'
import ProcessingOrderModal from '@/components/client/ProcessingOrderModal'
import PageHeader from '@/components/client/PageHeader'

type FooterProps = {
  onSendOrder: () => void
  totalValue: number
}

const Footer = ({ onSendOrder, totalValue }: FooterProps) => {
  return (
    <VStack
      spacing={4}
      sx={{
        padding: 5,
        borderTopWidth: '1px',
        borderTopColor: 'secondary.100',
      }}>
      <Flex
        sx={{
          width: 'full',
          justifyContent: 'space-between',
          fontFamily: 'heading',
          color: 'secondary.700',
        }}>
        <Text>Total</Text>
        <Text>{`R$ ${totalValue.toFixed(2)}`}</Text>
      </Flex>
      <Button w="full" size="sm" onClick={onSendOrder}>
        Fazer pedido
      </Button>
    </VStack>
  )
}

const CartPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // TODO: add integration with context
  const onSendOrder = () => {
    onOpen()
    setTimeout(() => {
      onClose()
      toast({
        title: 'Pedido realizado!',
        description: 'Veja detalhes na tela da conta da mesa',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }, 3000)
  }

  return (
    <Grid h="100vh">
      <GridItem rowSpan={1}>
        <PageHeader title="Carrinho" />
      </GridItem>
      <GridItem rowSpan={8} sx={{ overflowY: 'auto', paddingX: 5 }}>
        <CartList data={DATA} />
      </GridItem>
      <GridItem rowSpan={1}>
        <Footer totalValue={56.7} onSendOrder={onSendOrder} />
      </GridItem>

      <ProcessingOrderModal isOpen={isOpen} onClose={onClose} />
    </Grid>
  )
}

export default CartPage
