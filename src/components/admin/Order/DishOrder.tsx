import React from 'react'
import { Text, Grid, GridItem } from '@chakra-ui/react'

const DishOrder = ({ comments, quantity, name, price }: Item) => {
  return (
    <Grid
      w='100%'
      templateColumns="1fr 3fr 1fr"
    >
      <GridItem colSpan={1} display='flex'>
        <Text>{`${quantity}X`}</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Text>{name}</Text>
      </GridItem>
      <GridItem colSpan={1} textAlign='right'>
        <Text>{`R$ ${price}`}</Text>
      </GridItem>
      <GridItem colStart={2} colEnd={3}>
        <Text color='secondary.600' fontSize='11px'>{comments}</Text>
      </GridItem>
    </Grid>
  )
}
export default DishOrder
