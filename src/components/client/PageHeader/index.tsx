import React from 'react'
import { Box, Button, Center, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import useSession from '@/hooks/useSession'

type HeaderProps = {
  title: string
}

const PageHeader = ({ title }: HeaderProps) => {
  const router = useRouter()
  const { session } = useSession()

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
      <Text sx={{ fontSize: 'lg' }}>
        {title} - Mesa {session?.table ?? ''}
      </Text>
      <Box flex={1}></Box>
    </Center>
  )
}

export default PageHeader
