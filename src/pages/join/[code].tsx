import { Button } from '@chakra-ui/button'
import { Flex, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const TableCodePage: FC = () => {
  const router = useRouter()
  const { code } = router.query

  return (
    <Flex direction="column" sx={{ alignContent: 'spaceBetween' }}>
      <Text fontSize="lg" sx={{ padding: 4, textAlign: 'center' }}>
        Sua mesa está pronta!
      </Text>
      <Text sx={{ padding: 4 }}>
        Copie o código de acesso abaixo para acessar sua mesa de qualquer
        celular!
      </Text>
      <Text
        size="lg"
        fontSize="xl"
        color="primary.500"
        sx={{ padding: 4, textAlign: 'center' }}>
        {`#${code}`}
      </Text>
      <Button
        sx={{
          position: 'fixed',
          bottom: '3rem',
          alignSelf: 'center',
        }}
        onClick={() => router.push('/')}
        width="80%">
        Acessar
      </Button>
    </Flex>
  )
}

export default TableCodePage
