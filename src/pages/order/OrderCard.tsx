import { Flex, HStack, Text } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { FC } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { formatCurrency } from 'utils/formaters'

type Props = {}

const OrderCard: FC<Props> = () => {
  return (
    <Flex
      sx={{
        shadow: 'sm',
        margin: 4,
        padding: 4,
        borderWidth: 1,
        borderRadius: 'md',
        borderColor: 'secondary.100',
      }}
      direction="column">
      <HStack sx={{ marginBottom: 8 }} justify="space-between">
        <Text
          lineHeight="normal"
          fontSize="sm"
          fontWeight="normal"
          color="secondary.700">
          PEDIDO #4
        </Text>
        <HStack>
          <BiTimeFive />
          <Text color="secondary.500" fontWeight="light" fontSize="xs">
            18:30
          </Text>
        </HStack>
      </HStack>

      <HStack
        sx={{ marginBottom: 4 }}
        justify="space-between"
        fontFamily="heading"
        lineHeight="normal"
        fontSize="sm"
        color="secondary.700"
        fontWeight="normal">
        <Text>1x</Text>
        <Text>Macarrão com carne</Text>
        <Text>{formatCurrency(15.0)}</Text>
      </HStack>

      <HStack justify="space-between">
        <Text
          fontFamily="heading"
          lineHeight="normal"
          fontSize="sm"
          color="secondary.700"
          fontWeight="normal">
          Subtotal: {formatCurrency(15.0)}
        </Text>
        <Tag size="sm" borderRadius="full" variant="solid" colorScheme="green">
          <TagLabel>Pendente</TagLabel>
        </Tag>
      </HStack>
    </Flex>
  )
}

export default OrderCard
