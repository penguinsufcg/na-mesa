import React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import Logo from '@/components/logo'
import Menu from '@/components/client/Menu'
import { Button } from '@chakra-ui/react'

const MenuPage = () => {

  return (
    <Flex direction="column">
      <Box sx={{ width: '100%' }}>
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