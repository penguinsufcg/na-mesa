import React from 'react'
import { VStack } from '@chakra-ui/react'
import CartItem from './components/CartItem'

type Item = {
  name: string
  price: number
  quantity: number
  comments: string
  imageURL: string
}

type CartListProps = {
  data: Item[]
}

const CartList = ({ data }: CartListProps) => {
  return (
    <VStack direction="column" sx={{ width: 'full', paddingBottom: 2 }}>
      {data.map((item, index) => (
        <CartItem key={`item-${item.name}-${index}`} data={item} />
      ))}
    </VStack>
  )
}

export default CartList
