import React, { useState } from 'react'
import { 
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

import { createTable } from '@/api/tables'


const CreateTableModal = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [tableNumber, setTableNumber] = useState<string>()
  
  const handleCreate = async () => {
    if (!tableNumber) {
      return
    }
    await createTable(tableNumber)

    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>
        Adicionar mesa
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar mesa</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Número da mesa</FormLabel>
              <NumberInput
                isInvalid={!!!tableNumber}
                value={tableNumber}
                onChange={(value) => setTableNumber(value)}
              >
                <NumberInputField placeholder="Número da mesa" />
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button mr={3} onClick={handleCreate}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTableModal
