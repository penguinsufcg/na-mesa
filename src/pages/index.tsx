import React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'

import Logo from '@/components/Logo'
import Menu from '@/components/Client/Menu'

const MenuPage = () => {

  return (
    <Flex direction="column" sx={{ alignItems: 'center', padding: 4 }}>
      <Box>
        <Logo />
      </Box>
      <Flex direction="column" sx={{ padding: '10px', minHeight: 'calc(100vh - 100px)' }}>
        <Menu />
      </Flex>
      <Flex justifyContent="center" sx={{ height: '100px' }}>
        <Button>Entrar na mesa</Button>
      </Flex>
    </Flex>
  )
}

export default MenuPage