import React from 'react'
import { Box, Button, Center, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

type HeaderProps = {
  title: string
}

const PageHeader = ({ title }: HeaderProps) => {
  const router = useRouter()

  return (
    <Center sx={{ paddingY: 4, paddingX: 5 }}>
      <Box flex={1}>
        <Button
          variant="ghost"
          sx={{ fontSize: '2xl', boxSize: 10 }}
          onClick={() => router.back()}>
          <ChevronLeftIcon />
        </Button>
      </Box>
      <Text sx={{ fontSize: 'lg' }}>{title}</Text>
      <Box flex={1}></Box>
    </Center>
  )
}

export default PageHeader
