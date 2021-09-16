import { Box, Flex, Grid, GridItem, HStack, Text } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { FC } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { formatCurrency } from 'utils/formaters'
import ordersData from './mockData'

type Props = {}

const OrderComments = ({ comments }: { comments: any }) => {
  return (
    <>
      {comments && (
        <>
          <GridItem />
          <GridItem
            fontSize="xs"
            fontFamily="body"
            fontWeight="light"
            colSpan={2}>
            <Text>{comments}</Text>
          </GridItem>
          <GridItem />
        </>
      )}
    </>
  )
}

const OrderItem = ({ order }: { order: any }) => {
  return (
    <>
      <GridItem colSpan={1}>
        <Text>{order.quantity}</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text>{order.name}</Text>
      </GridItem>
      <GridItem justifySelf="end">
        <Text>{formatCurrency(order.price)}</Text>
      </GridItem>
      <OrderComments comments={order.comments} />
    </>
  )
}

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

      <Grid
        sx={{ marginBottom: 4 }}
        templateRows="repeat(auto, minmax(250px, 1fr))"
        templateColumns="repeat(4, 1fr)"
        justify="space-between"
        fontFamily="heading"
        lineHeight="normal"
        fontSize="sm"
        color="secondary.700"
        fontWeight="normal">
        {ordersData.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </Grid>

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
