import React, { useState } from 'react'
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
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import { Upload } from 'antd'
import { createDish, updateDish } from 'api/dishes'
import DishCard from '@/components/client/Menu/components/DishCard'

type DishModalProps = {
  dish?: Dish
  update: boolean
  isOpen: boolean
  onClose: () => void
}

const DEFAULT_DISH = {
  name: '',
  price: 0,
  servings: 0,
  description: '',
  preparationTime: 0,
  imageURL: '',
  available: true,
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

  const [newDish, setNewDish] = useState<Dish>(dish ?? DEFAULT_DISH)

  const saveDish = () => {
    createDish(newDish)
      .then(() => {
        onClose()
        setNewDish(DEFAULT_DISH)
        setUploadImg(false)
      })
      .catch((error) => {
        console.error('Error: ', error)
      })
  }

  const changeDish = () => {
    updateDish({ id: dish?.id, ...newDish })
      .then(() => {
        onClose()
        setUploadImg(false)
      })
      .catch((error) => {
        console.error('Error: ', error)
      })
  }

  const closeModal = async () => {
    onClose()
    setUploadImg(false)
  }

  const setBase64 = (file: File) => {
    return new Promise(() => {
      let baseURL = ''
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        baseURL = reader.result as string
        setNewDish({ ...newDish, imageURL: baseURL })
      }
    })
  }

  const handleChange =
    (attr: keyof Dish) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, type },
      } = event
      if (type === 'number' && isFinite(Number(value))) {
        setNewDish({ ...newDish, [attr]: Number(value) })
        return
      }
      setNewDish({ ...newDish, [attr]: value })
    }

  const propsImage = {
    async onChange(info: any) {
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
          <FormControl id="name" isRequired>
            <FormLabel>Nome do Produto</FormLabel>
            <Input
              onChange={handleChange('name')}
              value={newDish.name}
              ref={initialRef}
              placeholder="Nome do Produto"
            />
          </FormControl>
          <FormControl id="description" mt={4}>
            <FormLabel>Descrição</FormLabel>
            <Input
              onChange={handleChange('description')}
              value={newDish.description}
              height="7rem"
              placeholder="Descrição"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Preço</FormLabel>
            <NumberInput defaultValue={newDish.price} precision={2}>
              <NumberInputField
                value={newDish.price}
                onChange={handleChange('price')}
                type="number"
                placeholder="Preço"
              />
            </NumberInput>
          </FormControl>
          <Box display="flex">
            <FormControl mt={4}>
              <FormLabel width="10rem">Tempo de preparo</FormLabel>
              <NumberInput min={0} value={newDish.preparationTime}>
                <NumberInputField
                  onChange={handleChange('preparationTime')}
                  width="10rem"
                  placeholder="Tempo"
                />
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel width="10rem">Serve</FormLabel>
              <NumberInput min={1} value={newDish.servings}>
                <NumberInputField
                  onChange={handleChange('servings')}
                  width="10rem"
                  placeholder="Serve"
                />
              </NumberInput>
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

        <Box
          style={{
            paddingTop: '0.5rem',
            width: '430px',
            alignSelf: 'center',
            borderTopWidth: 'medium',
          }}>
          <DishCard key={newDish.id} item={newDish as EntityWithID<Dish>} />
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default DishModal
