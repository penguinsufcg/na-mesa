import React, { FC } from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { Header } from './components/Header'
 
const MenuLayout: FC = ({ children }) => {

  return (
   <Flex direction="column">
      {children}
    </Flex>
  )
}

const MenuLayout.Header = MenuLayout


export default Layout