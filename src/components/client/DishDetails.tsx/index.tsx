import React from 'react'
import { Text, Box } from '@chakra-ui/react'
import DishImage from './components/DishImage'
import DishTitle from './components/DishTitle'

type DishDetailsProps = {
  dish: EntityWithID<Dish>
}

const DishDetails = ({ dish }: DishDetailsProps) => {
  return (
    <Box>
      <DishImage src={dish.imageURL} />
      <Box padding={5}>
        <DishTitle dish={dish} />
        <Text
          sx={{
            fontFamily: 'body',
            fontSize: 'sm',
            fontWeight: 'light',
            color: 'secondary.600',
          }}>
          {dish.description}
        </Text>
      </Box>
    </Box>
  )
}

export default DishDetails
