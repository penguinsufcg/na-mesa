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

type SignInModalProps = Omit<ModalProps, 'children'>

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
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
              Logando no sistema..
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
