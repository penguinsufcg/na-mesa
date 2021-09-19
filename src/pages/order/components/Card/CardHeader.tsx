import { HStack, Text } from '@chakra-ui/layout'
import React, { FC } from 'react'
import { BiTimeFive } from 'react-icons/bi'

export type OrderCardHeaderProps = {
  orderNumber: number
  orderTime: string
}

const OrderCardHeader: FC<OrderCardHeaderProps> = ({
  orderNumber,
  orderTime,
}) => {
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
        PEDIDO #{orderNumber}
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
