import {
  Button,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const AccessTableForm = () => {
  const [tableNumber, setTableNumber] = useState<string>('')

  const handleSubmit = () => {
    console.log('Log in!')
  }

  return (
    <Flex
      direction="column"
      sx={{ alignItems: 'center', gap: '12px', width: '100%' }}>
      <Heading size="lg" color="gray.600" fontWeight="medium" mb="10px">
        Acessar mesa
      </Heading>
      <NumberInput width="100%">
        <NumberInputField
          placeholder="Número da mesa"
          isRequired
          value={tableNumber}
          onChange={(e) => {
            setTableNumber(e.target.value)
          }}
        />
      </NumberInput>
      <Button onClick={handleSubmit} disabled={!tableNumber} width="100%">
        Acessar
      </Button>
      <Text fontSize="sm" sx={{ marginTop: '5%', textAlign: 'center' }}>
        Não sabe qual o código de acesso ? Peça ao cliente titutar da mesa
      </Text>
    </Flex>
  )
}

export default AccessTableForm
