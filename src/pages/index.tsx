import React, { ReactNode } from 'react'
import { Box, Button, Center, Grid, GridItem, Text } from '@chakra-ui/react'
import Link from 'next/link'

import Logo from '@/components/Logo'
import Menu from '@/components/client/Menu'
import { useState } from 'react'
import Navbar from '@/components/client/Navbar'
import useSession from '@/hooks/useSession'

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
  const { isLogged, session } = useSession()

  return (
    <Grid
      h="100vh"
      templateRows="repeat(10, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}>
      <GridItem rowSpan={1} colSpan={4}>
        <Logo />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        {session && isLogged && (
          <Text size="sm" color="gray.500" sx={{ paddingTop: 6 }}>
            MESA {session?.table}
          </Text>
        )}
      </GridItem>
      <GridItem rowSpan={1} colSpan={5}>
        <Center paddingX={5} marginBottom={3}>
          <Menu.Search onSearch={(key: string) => setSearchKey(key)} />
        </Center>
      </GridItem>
      <GridItem rowSpan={8} colSpan={5} sx={{ overflowY: 'scroll' }}>
        <Menu searchKey={searchKey} />
      </GridItem>
      <GridItem rowSpan={1} colSpan={5}>
        <Footer>
          {isLogged ? (
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

export default MenuPage
