import React, { FC } from 'react'
import { Box, Flex, Image, Heading, Text, Spacer } from '@chakra-ui/react'

const DishOrder = ({ comments, quantity, name, price }: Item) => {
  return (
    <Box sx={{ width: '90%', display: 'flex' }}>
      <Spacer />
      <Text isTruncated width="150px">
        {`${quantity}X`}
      </Text>
      <Text isTruncated width="150px">
        {name}
        <Spacer />
        {comments}
      </Text>
      <Text isTruncated width="150px">
        {`R$ ${price}`}
      </Text>
      <Spacer />
    </Box>
  )
}
export default DishOrder
