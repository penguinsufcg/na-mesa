import React from 'react'
import { Button, Center, Grid, GridItem, Box } from '@chakra-ui/react'
import Link from 'next/link'

import Logo from '@/components/Logo'
import Menu from '@/components/client/Menu'
import DragAndDrop from '@/components/admin/Dnd'
import { useState } from 'react'

const MenuPage = () => {
  const [searchKey, setSearchKey] = useState<string>()

  return (
    <Box>
      <DragAndDrop />
    </Box>

    /*    <Grid h="100vh" templateRows="repeat(10, 1fr)" gap={2}>
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
        <Center>
          <Link href={'/join'} passHref>
            <Button>Entrar na mesa</Button>
          </Link>
        </Center>
      </GridItem>
  </Grid> */
  )
}

export default MenuPage
