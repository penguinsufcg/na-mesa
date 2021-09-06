import React, { FC } from 'react'
import { Stack, StackProps } from '@chakra-ui/react'
import DishCard from './DishCard'

interface Props {
  items: EntityWithID<Dish>[]
}

const DishList: FC<Props & StackProps> = ({ items, ...props }) => {
  return (
    <Stack direction="column" {...props} w="full">
      {items.map((item) => (
        <DishCard key={item.id} item={item} />
      ))}
    </Stack>
  )
}

export default DishList
