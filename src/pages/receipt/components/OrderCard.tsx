import { Flex } from '@chakra-ui/layout'
import { FC } from 'react'
import { formatTime } from 'utils/formatters'
import CardBody, { OrderCardBodyProps } from './Card/CardBody'
import CardFooter, { OrderCardFooterProps } from './Card/CardFooter'
import CardHeader, { OrderCardHeaderProps } from './Card/CardHeader'

type OrderWithSubtotal = EntityWithID<Order> & { subtotal: number }
type Props = { order: OrderWithSubtotal }
interface OrderCardComposition {
  Header: React.FC<OrderCardHeaderProps>
  Body: React.FC<OrderCardBodyProps>
  Footer: React.FC<OrderCardFooterProps>
}

const OrderCard: FC<Props> & OrderCardComposition = ({ order }) => {
  if (!order) return <></>

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
        orderTime={formatTime(order.time, {
          hour: '2-digit',
          minute: '2-digit',
        })}
      />
      <OrderCard.Body orders={order.items} />
      <OrderCard.Footer subTotal={order.subtotal} status={order.status} />
    </Flex>
  )
}

OrderCard.Header = CardHeader
OrderCard.Body = CardBody
OrderCard.Footer = CardFooter

export default OrderCard
