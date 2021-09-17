import { HStack, Text } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { FC } from 'react'
import { formatCurrency } from 'utils/formaters'

export type CardFooterProps = {
  subTotal: number
  status: string
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
      <Tag size="sm" borderRadius="full" variant="solid" colorScheme="green">
        <TagLabel>{status}</TagLabel>
      </Tag>
    </HStack>
  )
}

export default CardFooter
