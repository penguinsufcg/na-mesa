import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Spinner,
  Flex,
} from '@chakra-ui/react'
import React from 'react'

type ProcessingOrderModalProps = Omit<ModalProps, 'children'>

const ProcessingOrderModal = ({
  isOpen,
  onClose,
}: ProcessingOrderModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent marginX={5}>
        <ModalBody paddingY={6}>
          <Flex direction="column" alignItems="center">
            <Spinner size="xl" color="primary.400" marginBottom={4} />
            <Text fontSize="sm" fontWeight="light" color="secondary.600">
              Aguarde, estamos processando seu pedido!
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ProcessingOrderModal
