import React, { useState } from 'react'
import Logo from '@/components/Logo'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import JoinTableForm from '@/components/client/JoinTableForm'
import AccessTableForm from '@/components/client/AccessTableForm'
import TableView from '@/components/client/TableView'

const JoinTablePage = () => {
  const [showJoin, setShowJoin] = useState<boolean>(true)

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
