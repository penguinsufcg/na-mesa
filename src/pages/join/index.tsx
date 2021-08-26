import React from 'react'
import Logo from '@/components/Logo'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import JoinTableForm from '@/components/client/JoinTableForm'

const JoinTablePage = () => {
  return (
    <Flex
      direction="column"
      sx={{
        alignItems: 'center',
        padding: 8,
      }}>
      <Box sx={{ marginBottom: '50%' }}>
        <Logo />
      </Box>
      <JoinTableForm />
      <Text fontSize="sm" sx={{ marginTop: '5%', textAlign: 'center' }}>
        A mesa já está aberta ?{' '}
        <Button variant="link">Acessar mesa pelo código de acesso </Button>
      </Text>
    </Flex>
  )
}

export default JoinTablePage
