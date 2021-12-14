import { HStack, Text } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import React, { FC } from 'react'
import { formatCurrency } from 'utils/formatters'

export type OrderCardFooterProps = {
  subTotal: number
  status: string
}

const StatusLabel = ({ status }: { status: string }) => {
  const getColor: { [key: string]: string } = {
    PENDENTE: '#EFA238',
    COZINHA: '#8BA451',
    PRONTO: '#3EA299',
    ENTREGUE: '#2B2D57',
  }

  return (
    <Tag
      size="md"
      borderRadius="full"
      variant="solid"
      fontSize="xs"
      backgroundColor={getColor[status]}>
      <TagLabel>{status}</TagLabel>
    </Tag>
  )
}

const OrderCardFooter: FC<OrderCardFooterProps> = ({ subTotal, status }) => {
  return (
    <HStack justify="space-between">
      <Text
        fontFamily="heading"
        lineHeight="normal"
        fontSize="sm"
        color="secondary.700"
        fontWeight="normal">
        Subtotal: {formatCurrency(subTotal)}
      </Text>
      <StatusLabel status={status} />
    </HStack>
  )
}

export default OrderCardFooter
