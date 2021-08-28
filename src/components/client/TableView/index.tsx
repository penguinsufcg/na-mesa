import { Button } from '@chakra-ui/button'
import { Flex, Spacer, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import React, { FC } from 'react'

type Props = {
  code: string
}

const TableView: FC<Props> = () => {
  const handleSubmit = () => {}

  return (
    <Flex direction="column" sx={{ alignContent: 'spaceBetween' }}>
      <Text fontSize="lg" sx={{ padding: 4 }}>
        Sua mesa está pronta!
      </Text>
      <Text sx={{ padding: 4 }}>
        Copie o código de acesso abaixo para acessar sua mesa de qualquer
        celular!
      </Text>
      <Text size="lg" sx={{ padding: 4, textAlign: 'center' }}>
        #2ADE4FS
      </Text>
      <Button sx={{ alignSelf: 'end' }} onClick={handleSubmit} width="100%">
        Acessar
      </Button>
    </Flex>
  )
}

export default TableView
