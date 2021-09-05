import React from 'react'
import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'

import CartList from '@/components/client/CartList'
import ProcessingOrderModal from '@/components/client/ProcessingOrderModal'
import PageHeader from '@/components/client/PageHeader'
import useMinicart from '@/hooks/useMinicart'
import { useRouter } from 'next/router'

const EmptyCart = () => (
  <Center h="full">
    <Text
      sx={{
        fontSize: "lg",
        color: "secondary.600",
        fontWeight: "light",
        maxWidth: "3xs",
        textAlign: "center",
      }}>
      Nenhum produto adicionado até o momento!
    </Text>
  </Center>
)

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
  const { total, sendOrder, items } = useMinicart()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  const onSendOrder = async () => {
    console.log(sendOrder)
    onOpen()
    await sendOrder?.()
    onClose()
    toast({
      title: 'Pedido realizado!',
      description: 'Veja detalhes na tela da conta da mesa',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    router.push('/')
  }

  return (
    <Grid h="100vh" templateRows="repeat(10, 1fr)">
      <GridItem rowSpan={1}>
        <PageHeader title="Carrinho" />
      </GridItem>
      <GridItem rowSpan={8} sx={{ overflowY: 'auto', paddingX: 5 }}>
        {items.length !== 0 ? (
          <CartList />
        ) : (
          <EmptyCart />
        )}
      </GridItem>
      <GridItem rowSpan={1}>
        {items.length !== 0 && (
          <Footer totalValue={total} onSendOrder={onSendOrder} />
        )}
      </GridItem>

      <ProcessingOrderModal isOpen={isOpen} onClose={onClose} />
    </Grid>
  )
}

export default CartPage
