import React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

import Logo from '@/components/Logo'
import Menu from '@/components/client/Menu'

const MenuPage = () => {

  return (
    <Flex direction="column" sx={{ alignItems: 'center', padding: 4 }}>
      <Box>
        <Logo />
      </Box>
      <Flex direction="column" sx={{ padding: '10px', height: 'calc(100vh - 120px)',maxHeight: 'calc(100vh - 120px)' }}>
        <Menu />
      </Flex>
      <Flex justifyContent="center" sx={{ height: '70px' }}>
        <Link href={'/joinTable'} passHref>
          <Button>Entrar na mesa</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default MenuPage