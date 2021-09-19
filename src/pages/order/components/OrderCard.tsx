import { Flex } from '@chakra-ui/layout'
import { FC } from 'react'
import CardBody, { CardBodyProps } from './Card/CardBody'
import CardFooter, { CardFooterProps } from './Card/CardFooter'
import CardHeader, { CardHeaderProps } from './Card/CardHeader'

type Props = { order: any }
interface OrderCardComposition {
  Header: React.FC<CardHeaderProps>
  Body: React.FC<CardBodyProps>
  Footer: React.FC<CardFooterProps>
}

const OrderCard: FC<Props> & OrderCardComposition = ({ order }) => {
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
        orderTime={order.time}
      />
      <OrderCard.Body orders={order.items} />
      <OrderCard.Footer subTotal={order.subTotal} status={order.status} />
    </Flex>
  )
}

OrderCard.Header = CardHeader
OrderCard.Body = CardBody
OrderCard.Footer = CardFooter

export default OrderCard
