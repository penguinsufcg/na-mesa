import React, { FC } from 'react'
import { Box, Flex, Image, Heading, Text, Spacer } from '@chakra-ui/react'
import DishOrder from './DishOrder'

interface Dish {
  comments: string
  quantity: number
  name: string
  price: number
}

type Order = {
  id: number
  code: string
  subtotal: number
  time: string
  dishs: Dish[]
}

const OrderCard = ({ id, code, subtotal, time, dishs }: Order) => {
  return (
    <Flex
      sx={{
        padding: '2px',
        _hover: {
          shadow: 'md',
          borderWidth: '1px',
          borderRadius: 'md',
          cursor: 'pointer',
        },
        overflow: 'hidden',
      }}>
      <Box sx={{ width: '90%' }}>
        <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Text>{`MESA ${id}`}</Text>
          <Text sx={{ textAlign: 'right' }}>{time}</Text>
        </Flex>

        {dishs?.map((dish, i) => {
          return (
            <DishOrder
              key={i}
              name={dish.name}
              comments={dish.comments}
              price={dish.price}
              quantity={dish.quantity}
            />
          )
        })}

        <Flex>
          <Text isTruncated width="150px">
            {`Subtotal: ${subtotal}`}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}
export default OrderCard
