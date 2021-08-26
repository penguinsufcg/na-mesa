import React, { useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import { generateRandomCode } from 'utils/codeGenerator'

const JoinTableForm = () => {
  const [tableNumber, setTableNumber] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleSubmit = () => {
    const secretCode = generateRandomCode()

    window.alert(`Your code is: ${secretCode}`)
  }

  return (
    <Flex
      direction="column"
      sx={{ alignItems: 'center', gap: '12px', width: '100%' }}>
      <Heading size="lg" color="gray.600" fontWeight="medium" mb="10px">
        Entrar na mesa
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
      <Input
        placeholder="Nome do consumidor"
        isRequired
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <Button
        onClick={handleSubmit}
        disabled={!name || !tableNumber}
        width="100%">
        Entrar
      </Button>
    </Flex>
  )
}

export default JoinTableForm
