import JoinTableForm from '@/components/Client/JoinTableForm'
import Logo from '@/components/Logo'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

const JoinTablePage = () => {

  return (
    <Flex direction="column" sx={{ alignItems: 'center', padding: 4 }}>
      <Box sx={{ marginBottom: '20px' }}>
        <Logo />
      </Box>
      <JoinTableForm />
    </Flex>
  )
}

export default JoinTablePage