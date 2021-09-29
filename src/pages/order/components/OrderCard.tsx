import { Flex } from '@chakra-ui/layout'
import { FC } from 'react'
import { formatTime } from 'utils/formatters'
import CardBody, { OrderCardBodyProps } from './Card/CardBody'
import CardFooter, { OrderCardFooterProps } from './Card/CardFooter'
import CardHeader, { OrderCardHeaderProps } from './Card/CardHeader'

type Props = { order: EntityWithID<Order> }
interface OrderCardComposition {
  Header: React.FC<OrderCardHeaderProps>
  Body: React.FC<OrderCardBodyProps>
  Footer: React.FC<OrderCardFooterProps>
}

const OrderCard: FC<Props> & OrderCardComposition = ({ order }) => {
  const getSubTotal = (orders: OrderItem[]) =>
    orders.reduce((acc, current) => acc + current.quantity * current.price, 0)
  return (
    <Flex
      sx={{
        shadow: 'sm',
        marginBottom: 4,
        padding: 4,
        borderWidth: 1,
        borderRadius: 'md',
        borderColor: 'secondary.100',
      }}
      direction="column">
      <OrderCard.Header
        orderNumber={order.orderNumber}
        orderTime={formatTime(order.time)}
      />
      <OrderCard.Body orders={order.items} />
      <OrderCard.Footer
        subTotal={getSubTotal(order.items)}
        status={order.status}
      />
    </Flex>
  )
}

OrderCard.Header = CardHeader
OrderCard.Body = CardBody
OrderCard.Footer = CardFooter

export default OrderCard
