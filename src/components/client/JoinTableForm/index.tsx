import useSession from '@/hooks/useSession'
import {
  Button,
  Flex,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import LoadingModal from './components/LoadingModal'
import TableSelect from './components/TableSelect'

const JoinTableForm: FC = () => {
  const [tableNumber, setTableNumber] = useState<string>('')
  const [name, setName] = useState<string>('')
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { createNewSession, isLoading } = useSession()

  const handleSubmit = async () => {
    if (!createNewSession) {
      return
    }
    onOpen()
    const sessionCode = await createNewSession({
      client: name,
      table: tableNumber,
    })
    onClose()
    router.push(`/join/${sessionCode}`)
  }

  return (
    <>
      <Flex
        direction="column"
        sx={{ alignItems: 'center', gap: '12px', width: '100%' }}>
        <Heading size="lg" color="gray.600" fontWeight="medium" mb="10px">
          Entrar na mesa
        </Heading>

        <TableSelect onSelect={setTableNumber} />
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
