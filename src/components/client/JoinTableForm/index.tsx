import {
  Button,
  Flex,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  useDisclosure,
} from '@chakra-ui/react'
import { createSession } from 'api/session'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { generateRandomCode } from 'utils/codeGenerator'
import LoadingModal from './components/LoadingModal'

const JoinTableForm: FC = () => {
  const [tableNumber, setTableNumber] = useState<string>('')
  const [name, setName] = useState<string>('')
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = () => {
    const secretCode = generateRandomCode()

    onOpen()
    createSession({
      code: secretCode.toString(),
      client: name,
      orders: [],
      table: tableNumber,
    })
      .then((_) => {
        onClose()
        router.push(`/join/${secretCode}`)
      })
      .catch((error) => `[createSessionError] ${error}`)
  }

  return (
    <>
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
      <LoadingModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default JoinTableForm
