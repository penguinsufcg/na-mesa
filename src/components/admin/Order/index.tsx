import React, { FC } from 'react'
import { Box, Flex, Image, Heading, Text, Spacer } from '@chakra-ui/react'

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
  dishs?: Dish[]
}

const OrderCard = ({ id, code, subtotal, time }: Order) => {
  return (
    <Flex
      sx={{
        width: '329px',
        height: '231px',
        padding: '2px',
        _hover: {
          shadow: 'md',
          borderWidth: '1px',
          borderRadius: 'md',
          cursor: 'pointer',
        },
        overflow: 'hidden',
      }}>
      <Box sx={{ width: '100%' }}>
        <Flex sx={{ width: '100%' }}>
          <Text isTruncated width="150px">
            {`MESA ${id}`}
          </Text>

          <Text isTruncated width="150px">
            {time}
          </Text>
        </Flex>
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
