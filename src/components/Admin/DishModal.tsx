import { FileImageOutlined } from '@ant-design/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Upload } from 'antd'
import type { Dish } from 'api/dishes'
import { createDish, updateDish } from 'api/dishes'
import React, { useState } from 'react'

type DishModalProps = {
  dish?: Dish
  dishId?: string
  update: boolean
  isOpen: boolean
  onClose: () => void
}

function DishModal({
  isOpen,
  onClose,
  update,
  dish,
  dishId,
}: DishModalProps): JSX.Element {
  const { Dragger } = Upload
  const initialRef = React.useRef().current
  const finalRef = React.useRef().current

  const [uploadImg, setUploadImg] = useState(false)

  const [dishValues, setDishValues] = useState<Dish>({
    name: dish?.name ?? '',
    price: dish?.price ?? 0,
    servings: dish?.servings ?? 0,
    description: dish?.description ?? '',
    preparationTime: dish?.preparationTime ?? 0,
    imageURL: dish?.imageURL ?? '',
    available: dish?.available ?? true,
  })

  const saveDish = async () => {
    await createDish(dishValues)
  }

  const changeDish = async () => {
    if(dishId) await updateDish(dishId, dishValues)
  }

  const closeModal = async () => {
    setUploadImg(false)
    onClose()
  }

  const setBase64 = (file: File) => {
    return new Promise(() => {
      let baseURL = ''
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        baseURL = reader.result as string
        setDishValues({ ...dishValues, imageURL: baseURL })
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
    setDishValues({ ...dishValues, servings: event.target.value })
  }

  const propsImage = {
    async onChange(info: any) {
      console.log(info)
      setUploadImg(!uploadImg)
      info.fileList[0] && (await setBase64(info.fileList[0].originFileObj))
    },
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={{ width: '31.375rem' }}>
        {update ? (
          <ModalHeader
            color="secondary.700"
            fontWeight="400"
            fontFamily="heading"
            fontSize="lg">
            Mudar Produto
          </ModalHeader>
        ) : (
          <ModalHeader
            color="secondary.700"
            fontWeight="400"
            fontFamily="heading">
            Novo Produto
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody
          color="secondary.600"
          fontFamily="body"
          fontSize="sm"
          fontWeight="500"
          pb={6}>
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
                placeholder="Tempo"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel width="10rem">Serve</FormLabel>
              <Input
                onChange={handleServing}
                value={dishValues.servings}
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
                beforeUpload={() => false}>
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
          <Button onClick={closeModal} variant="secondary" mr={3}>
            Cancelar
          </Button>
          <Button onClick={update ? changeDish : saveDish} colorScheme="blue">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DishModal
