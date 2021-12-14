import { createTable } from '@/api/tables'
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  UseDisclosureReturn,
} from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
  title: string
  defaultTableNumber?: number
  modalProps: {
    isOpen: Pick<UseDisclosureReturn, 'isOpen'>
    onClose: Pick<UseDisclosureReturn, 'onClose'>
  }
}

const CreateTableModal = ({ title, modalProps, defaultTableNumber }: Props) => {
  const { isOpen, onClose } = modalProps
  const [tableNumber, setTableNumber] = useState<string>(
    defaultTableNumber?.toString() ?? '',
  )

  const handleCreate = async () => {
    if (!tableNumber) {
      return
    }
    await createTable(tableNumber)

    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Número da mesa</FormLabel>
              <NumberInput
                isInvalid={!!!tableNumber}
                value={tableNumber}
                onChange={(value) => setTableNumber(value)}>
                <NumberInputField placeholder="Número da mesa" />
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
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
