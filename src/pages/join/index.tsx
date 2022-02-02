import AccessTableForm from '@/components/client/AccessTableForm'
import JoinTableForm from '@/components/client/JoinTableForm'
import Logo from '@/components/Logo'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

const PageHeader = () => {
  const router = useRouter()
  return (
    <Flex w='full' align='center' marginBottom='40%'>
      <Box flex={1}>
        <Button
          variant='ghost'
          sx={{ fontSize: '2xl', boxSize: 10 }}
          onClick={() => router.back()}>
          <ChevronLeftIcon />
        </Button>
      </Box>
      <Logo />
      <Box flex={1}></Box>
    </Flex>
  )
}

const JoinTablePage = () => {
  const [showJoin, setShowJoin] = useState<boolean>(true)

  return (
    <Flex
      direction="column"
      sx={{
        alignItems: 'center',
        paddingY: 4,
        paddingX: 5,
      }}>

      <PageHeader />
      
      {showJoin ? (
        <>
          <JoinTableForm />
          <Text fontSize="sm" sx={{ marginTop: '5%', textAlign: 'center' }}>
            A mesa já está aberta ?{' '}
            <Button variant="link" onClick={() => setShowJoin(false)}>
              Acessar mesa pelo código de acesso{' '}
            </Button>
          </Text>
        </>
      ) : (
        <AccessTableForm />
      )}
    </Flex>
  )
}

export default JoinTablePage
