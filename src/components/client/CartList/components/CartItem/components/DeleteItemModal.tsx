import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type DeleteItemModalProps = {
  isOpen: boolean
  handleSubmit: () => void
  onClose: () => void
}

const DeleteItemModal = ({
  isOpen,
  onClose,
  handleSubmit,
}: DeleteItemModalProps) => {
  const handleConfirm = async () => {
    handleSubmit()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent marginX={5}>
        <ModalHeader>
          <Text fontSize="lg" fontFamily="heading" fontWeight="normal">
            Excluir produto
          </Text>
        </ModalHeader>

        <ModalCloseButton sx={{ _focus: { border: 'none' } }} />
        <ModalBody paddingBottom={6}>
          <Text fontSize="sm" fontWeight="light">
            Tem certeza que deseja excluir o produto?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleConfirm} variant="secondary" size="sm">
            CONFIRMAR
          </Button>
          <Button onClick={onClose} size="sm">
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteItemModal
