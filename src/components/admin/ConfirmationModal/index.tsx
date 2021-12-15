import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import React from 'react'

type ModalProps = {
  label: string
  message: string
  isOpen: boolean
  handleSubmit: () => void
  onClose: () => void
}

function ConfirmationModal({
  isOpen,
  label,
  onClose,
  message,
  handleSubmit,
}: ModalProps): JSX.Element {
  const initialRef = React.useRef().current
  const finalRef = React.useRef().current

  const confirm = async () => {
    handleSubmit()
    onClose()
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>{message}</p>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="secondary" mr={3}>
              CANCELAR
            </Button>
            <Button onClick={confirm} colorScheme="blue">
              CONFIRMAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmationModal
