import { Box, Flex, Grid, GridItem, HStack, Text } from '@chakra-ui/layout'
import { BiTimeFive } from 'react-icons/bi'
import react, { FC } from 'react'
import { Tag, TagLabel } from '@chakra-ui/tag'

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

      <HStack sx={{ marginBottom: 4 }} justify="space-between">
        <Text
          lineHeight="normal"
          fontSize="sm"
          color="secondary.700"
          fontWeight="normal">
          1x
        </Text>
        <Text
          lineHeight="normal"
          fontSize="sm"
          color="secondary.700"
          fontWeight="normal">
          Macarrão com carne
        </Text>
        <Text
          lineHeight="normal"
          fontSize="sm"
          color="secondary.700"
          fontWeight="normal">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(15.0)}
        </Text>
      </HStack>

      <HStack justify="space-between">
        <Text
          lineHeight="normal"
          fontSize="sm"
          color="secondary.700"
          fontWeight="normal">
          Subtotal:{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(15.0)}
        </Text>
        <Tag size="md" borderRadius="full" variant="solid" colorScheme="green">
          <TagLabel>Pendente</TagLabel>
        </Tag>
      </HStack>
    </Flex>
  )
}

export default OrderCard
