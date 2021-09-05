import React from 'react'
import { VStack } from '@chakra-ui/react'
import CartItem from './components/CartItem'
import useMinicart from '@/hooks/useMinicart'

const CartList = () => {
  const { items, removeItem, updateItem } = useMinicart()

  const handleDelete = (id: number) => {
    removeItem?.({ id })
  }
  
  const handleUpdate = (id: number, updatedItem: Partial<OrderItem>) => {
    updateItem?.({ id, updatedItem })
  }

  return (
    <VStack direction="column" sx={{ width: 'full', paddingBottom: 2 }}>
      {items.map((item, index) => (
        <CartItem
          key={index}
          data={item}
          onDelete={() => handleDelete(index)}
          onUpdate={(updatedItem) => handleUpdate(index, updatedItem)}
          />
      ))}
    </VStack>
  )
}

export default CartList
