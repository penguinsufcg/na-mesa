import React, { FC } from 'react'
import { Box, Flex, Text, HStack, VStack } from '@chakra-ui/react'
import { DragHandleIcon, TimeIcon } from '@chakra-ui/icons'
import DishOrder from './DishOrder'
import { formatTime } from '@/utils/formatters'

interface Dish {
  comments: string
  quantity: number
  name: string
  price: number
}

type Order = {
  id: number
  code: string
  time: string
  dishs: Dish[]
  table: string
}

const OrderCard = ({ time, dishs, table }: Order) => {
  const calcSubtotal = (dishs: Dish[]) => {
    return dishs.reduce(
      (prevSum, dish) => prevSum + dish.price * dish.quantity,
      0,
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '15px',
        overflow: 'hidden',
      }}>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <HStack spacing="8px" alignItems="baseline">
          <DragHandleIcon h="12px" color="primary.300" />
          <Text fontSize="16px">{`MESA ${table ?? ''}`}</Text>
        </HStack>
        <HStack spacing="6px" alignItems="baseline" color="secondary.500">
          <TimeIcon h="10px" />
          <Text fontSize="12px">
            {formatTime(time, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </HStack>
      </Flex>
      <VStack margin="15px 0">
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
      </VStack>
      <Flex>
        <Text isTruncated width="150px" color="secondary.700">
          {`Subtotal: R$ ${calcSubtotal(dishs).toFixed(2)}`}
        </Text>
      </Flex>
    </Box>
  )
}
export default OrderCard
