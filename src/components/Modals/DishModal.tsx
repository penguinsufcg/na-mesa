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

type DishValues = {
  name: string
  price: number
  serving: number
  description: string
  preparationTime: number
  img: string
}

type DishModalProps = {
  dish?: DishValues
  update: boolean
  isOpen: boolean
  onClose: () => void
}

function DishModal({
  isOpen,
  onClose,
  update,
  dish,
}: DishModalProps): JSX.Element {
  const { Dragger } = Upload
  const initialRef = React.useRef().current
  const finalRef = React.useRef().current

  const [uploadImg, setUploadImg] = useState(false)

  const [dishValues, setDishValues] = useState<DishValues>({
    name: dish?.name ?? '',
    price: dish?.price ?? 0,
    serving: dish?.serving ?? 0,
    description: dish?.description ?? '',
    preparationTime: dish?.preparationTime ?? 0,
    img: dish?.img ?? '',
  })
  const saveDish = () => {
    console.log(dishValues)
  }

  const getBase64 = (file: File) => {
    return new Promise(() => {
      let baseURL = ''
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        baseURL = reader.result as string
        console.log(baseURL)
        setDishValues({ ...dishValues, img: baseURL })
      }
    })
  }

  const handleName = (event: any) => {
    setDishValues({ ...dishValues, name: event.target.value })
  }

  const handleDescription = (event: any) => {
    setDishValues({ ...dishValues, description: event.target.value })
  }

  const handlePrice = (event: any) => {
    setDishValues({ ...dishValues, price: event.target.value })
  }

  const handleTime = (event: any) => {
    setDishValues({ ...dishValues, preparationTime: event.target.value })
  }

  const handleServing = (event: any) => {
    setDishValues({ ...dishValues, serving: event.target.value })
  }

  const propsImage = {
    async onChange(info: any) {
      setUploadImg(!uploadImg)
      info.fileList[0] && (await getBase64(info.fileList[0].originFileObj))
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
              <Input
                onChange={handleName}
                value={dishValues.name}
                ref={initialRef}
                placeholder="Nome do Produto"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descrição</FormLabel>
              <Input
                onChange={handleDescription}
                value={dishValues.description}
                height="7rem"
                placeholder="Descrição"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Preço</FormLabel>
              <Input
                value={dishValues.price}
                onChange={handlePrice}
                placeholder="Preço"
              />
            </FormControl>
            <Box display="flex">
              <FormControl mt={4}>
                <FormLabel width="10rem">Tempo de preparo</FormLabel>
                <Input
                  onChange={handleTime}
                  value={dishValues.preparationTime}
                  width="10rem"
                  placeholder="Tempo de preparo"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel width="10rem">Serve</FormLabel>
                <Input
                  onChange={handleServing}
                  value={dishValues.serving}
                  width="10rem"
                  placeholder="Serve"
                />
              </FormControl>
            </Box>
            <FormControl mt={4}>
              <FormLabel>Imagem do prato</FormLabel>
              <Box textAlign="center" height="7.688rem" borderWidth="2px">
                <Dragger
                  style={{ marginTop: '2rem' }}
                  {...propsImage}
                  beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                >
                  {!uploadImg && (
                    <Box>
                      <p className="ant-upload-drag-icon">
                        <FileImageOutlined style={{ fontSize: '2rem' }} />
                      </p>
                      <p className="ant-upload-text">Insira uma imagem</p>
                    </Box>
                  )}
                </Dragger>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="secondary" mr={3}>
              Cancelar
            </Button>
            <Button onClick={saveDish} colorScheme="blue">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DishModal
