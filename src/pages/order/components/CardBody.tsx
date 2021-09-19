import { Grid, GridItem, Text } from '@chakra-ui/layout'
import { FC } from 'react'
import { formatCurrency } from 'utils/formatters'

export type CardBodyProps = {
  orders: any
}

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

const CardBody: FC<CardBodyProps> = ({ orders }) => {
  return (
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
      {orders.map((value: any, index: number) => (
        <OrderItem key={index} order={value} />
      ))}
    </Grid>
  )
}

export default CardBody
