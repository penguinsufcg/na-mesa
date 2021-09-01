import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Spinner,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type Props = Omit<ModalProps, 'children'>

const LoadingModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xs'}>
      <ModalOverlay />
      <ModalContent sx={{ padding: 8, justifyContent: 'center' }}>
        <ModalBody>
          <Flex direction="column" sx={{ gap: 32 }}>
            <Spinner
              color="primary.500"
              size="xl"
              sx={{ alignSelf: 'center' }}
            />
            <Text sx={{ textAlign: 'center' }}>
              Aguarde, estamos preparando a mesa para você!
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default LoadingModal
