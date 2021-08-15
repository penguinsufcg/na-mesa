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
  FormLabel,
  Input,
  FormControl,
  Box,
} from '@chakra-ui/react'
import { Upload } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import React from 'react'

type DishModalProps = {
  update: boolean
  isOpen: boolean
  onClose: () => void
}

function DishModal({ isOpen, onClose, update }: DishModalProps): JSX.Element {
  const { Dragger } = Upload
  const [filesList, setFilesList] = useState<any[]>([])

  const initialRef = React.useRef().current
  const finalRef = React.useRef().current

  const props = {
    async onChange(info: any) {
      console.log(info)

      setFilesList([...filesList, ...[info.fileList]])
    },
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
          {update ? (
            <ModalHeader>Mudar Produto</ModalHeader>
          ) : (
            <ModalHeader>Novo Produto</ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome do Produto</FormLabel>
              <Input ref={initialRef} placeholder="Nome do Produto" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descrição</FormLabel>
              <Input height="7rem" placeholder="Descrição" />
            </FormControl>
            <Box display="flex">
              <FormControl mt={4}>
                <FormLabel width="10rem">Preço</FormLabel>
                <Input width="10rem" placeholder="Preço" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel width="10rem">Serve</FormLabel>
                <Input width="10rem" placeholder="Serve" />
              </FormControl>
            </Box>
            <FormControl mt={4}>
              <FormLabel>Imagem do prato</FormLabel>
              <Box textAlign="center" height="7.688rem" borderWidth="2px">
                <Dragger
                  style={{ marginTop: '2rem' }}
                  {...props}
                  beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                >
                  <p className="ant-upload-drag-icon">
                    <FileImageOutlined style={{ fontSize: '2rem' }} />
                  </p>
                  <p className="ant-upload-text">Insira uma imagem</p>
                </Dragger>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="secondary" mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DishModal
