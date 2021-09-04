import React, { ReactNode } from 'react'
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import Link from 'next/link'

import Logo from '@/components/Logo'
import Menu from '@/components/client/Menu'
import { useState } from 'react'
import Navbar from '@/components/client/Navbar'

type FooterProps = {
  children: ReactNode
}

const Footer = ({ children }: FooterProps) => (
  <Box
    sx={{
      padding: 5,
      borderTopWidth: '1px',
      borderTopColor: 'secondary.100',
    }}>
    {children}
  </Box>
)

const MenuPage = () => {
  const [searchKey, setSearchKey] = useState<string>()

  // TODO: add integration with context
  const userLogged = false

  return (
    <Grid h="100vh" templateRows="repeat(10, 1fr)" gap={2}>
      <GridItem rowSpan={1}>
        <Logo />
        <Center>
          <Menu.Search onSearch={(key: string) => setSearchKey(key)} />
        </Center>
      </GridItem>
      <GridItem rowSpan={8} sx={{ overflowY: 'scroll' }}>
        <Menu searchKey={searchKey} />
      </GridItem>
      <GridItem rowSpan={1}>
        <Footer>
          {userLogged ? (
            <Navbar />
          ) : (
            <Link href={'/join'} passHref>
              <Button size="sm" margin="0" isFullWidth>
                Entrar na mesa
              </Button>
            </Link>
          )}
        </Footer>
      </GridItem>
    </Grid>
  )
}

/**
 *         <Center>
          <Link href={'/join'} passHref>
            <Button>Entrar na mesa</Button>
          </Link>
        </Center>
 */

export default MenuPage
