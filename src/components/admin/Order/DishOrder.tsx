import React, { FC } from 'react'
import { Box, Flex, Image, Heading, Text, Spacer } from '@chakra-ui/react'

const DishOrder = ({ comments, quantity, name, price }: Item) => {
  return (
    <Box>
      <Flex sx={{ textAlign: 'left' }}>
        <Text>{`${quantity}X`}</Text>
        <Text sx={{ paddingLeft: '2.7rem' }}>{name}</Text>

        <Flex sx={{ marginLeft: 'auto' }}>
          <Text>{`R$ ${price}`}</Text>
        </Flex>
      </Flex>

      <Text sx={{ textAlign: 'left', paddingLeft: '3.5rem' }}>{comments}</Text>
      <Spacer />
    </Box>
  )
}
export default DishOrder
