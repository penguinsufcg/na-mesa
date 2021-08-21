import React, { useState } from 'react'
import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { generateRandomCode } from 'utils/codeGenerator'
 
const JoinTableForm = () => {
  const [tableCode, setTableCode] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleSubmit = () => {
    const secretCode = generateRandomCode()
    
    window.alert(`Your code is: ${secretCode}`)
  }

  return (
    <Flex direction="column" sx={{ alignItems: 'center', gap: '12px' }}>
      <Heading size="lg">Entrar na mesa</Heading>
      <Input
        placeholder="Código da mesa"
        isRequired
        value={tableCode}
        onChange={(e) => { setTableCode(e.target.value) }}/>
      <Input
        placeholder="Nome do consumidor"
        isRequired
        value={name}
        onChange={(e) => { setName(e.target.value) }}/>
      <Button onClick={handleSubmit} disabled={!name || !tableCode} width="100%">
        Entrar
      </Button>
    </Flex>
  )
}

export default JoinTableForm