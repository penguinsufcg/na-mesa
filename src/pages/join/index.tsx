import React from 'react'
import Logo from '@/components/Logo'
import { Box, Flex } from '@chakra-ui/react'
import JoinTableForm from '@/components/client/JoinTableForm'

const JoinTablePage = () => {
  return (
    <Flex direction="column" sx={{ alignItems: 'center', padding: 4 }}>
      <Box sx={{ marginBottom: '50%' }}>
        <Logo />
      </Box>
      <JoinTableForm />
    </Flex>
  )
}

export default JoinTablePage
