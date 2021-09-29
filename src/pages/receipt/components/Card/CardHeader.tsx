import { HStack, Text } from '@chakra-ui/layout'
import React, { FC } from 'react'
import { BiTimeFive } from 'react-icons/bi'

export type OrderCardHeaderProps = {
  orderTime: string
}

const OrderCardHeader: FC<OrderCardHeaderProps> = ({ orderTime }) => {
  return (
    <HStack
      sx={{ marginBottom: 4 }}
      justify="space-between"
      alignItems="stretch">
      <Text
        color="secondary.700"
        lineHeight="normal"
        fontSize="sm"
        fontWeight="normal"
        fontFamily="heading">
        PEDIDO
      </Text>
      <HStack color="secondary.500">
        <BiTimeFive />
        <Text fontWeight="light" fontSize="xs">
          {orderTime}
        </Text>
      </HStack>
    </HStack>
  )
}

export default OrderCardHeader
