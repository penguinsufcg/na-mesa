import { HStack, Text } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { FC } from 'react'
import { formatCurrency } from 'utils/formatters'

export type CardFooterProps = {
  subTotal: number
  status: string
}

const StatusLabel = ({ status }: { status: string }) => {
  const getColor: { [key: string]: string } = {
    Pendente: '#EFA238',
    'Na cozinha': '#8BA451',
    Pronto: '#3EA299',
    Entregue: '#2B2D57',
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

const CardFooter: FC<CardFooterProps> = ({ subTotal, status }) => {
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

export default CardFooter
