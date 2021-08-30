import { useFirestoreListQuery } from '@/hooks/useFirestoreQuery'
import {
  Button,
  Flex,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { db } from '@/config/firebaseClient'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'

const AccessTableForm = () => {
  const [sessionCode, setSessionCode] = useState<string>('')
  const router = useRouter()
  const { data: session } = useFirestoreListQuery(
    db.collection('sessions').where('code', '==', sessionCode),
  )

  const handlePinChange = (value: string) => setSessionCode(value)
  const debouncedHandlePinChange = useMemo(
    () => debounce(handlePinChange, 300),
    [sessionCode],
  )

  useEffect(() => {
    return () => {
      debouncedHandlePinChange.cancel()
    }
  }, [])

  const handleSubmit = () => {
    if (session != null && session.length) {
      router.push('/')
    }
  }

  return (
    <Flex
      direction="column"
      sx={{ alignItems: 'center', gap: '12px', width: '100%' }}>
      <Heading size="lg" color="gray.600" fontWeight="medium" mb="10px">
        Acessar mesa
      </Heading>
      <HStack>
        <PinInput type="number" onChange={debouncedHandlePinChange}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Button onClick={handleSubmit} disabled={!sessionCode} width="100%">
        Acessar
      </Button>
      <Text fontSize="sm" sx={{ marginTop: '5%', textAlign: 'center' }}>
        Não sabe qual o código de acesso ? Peça ao cliente titutar da mesa
      </Text>
    </Flex>
  )
}

export default AccessTableForm
