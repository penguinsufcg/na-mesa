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
  initialTableNumber?: string
  modalProps: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>
  handleSubmit: ({
    tableNumber,
    newTableNumber,
  }: {
    tableNumber?: string
    newTableNumber?: string
  }) => Promise<void>
}

const TableModal = ({
  title,
  modalProps,
  initialTableNumber,
  handleSubmit,
}: Props) => {
  const { isOpen, onClose } = modalProps
  const [tableNumber, setTableNumber] = useState<string>(
    initialTableNumber ?? '',
  )

  const handleCreate = async () => {
    await handleSubmit({
      tableNumber: initialTableNumber ?? tableNumber,
      newTableNumber: tableNumber,
    })

    onClose()
    setTableNumber('')
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
            <Button
              variant="secondary"
              onClick={() => {
                onClose()
                setTableNumber('')
              }}>
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

export default TableModal
