import React from 'react'
import { Box, Button, Center, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => (
  <Center sx={{ paddingY: 4, paddingX: 5 }}>
    <Box flex={1}>
      <Button variant="ghost" sx={{ fontSize: '2xl', boxSize: 10 }}>
        <ChevronLeftIcon />
      </Button>
    </Box>
    <Text sx={{ fontSize: 'lg' }}>{title}</Text>
    <Box flex={1}></Box>
  </Center>
)

export default Header
