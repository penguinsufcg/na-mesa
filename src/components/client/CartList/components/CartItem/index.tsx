import React from 'react'
import { Flex, Text, useDisclosure, useToast } from '@chakra-ui/react'
import QuantityInput from './components/QuantityInput'
import DeleteItemButton from './components/DeleteItemButton'
import DeleteItemModal from './components/DeleteItemModal'
import ItemImage from './components/ItemImage'

type Item = {
  name: string
  price: number
  quantity: number
  comments: string
  imageURL: string
}

type CartItemProps = {
  data: Item
}

const CartItem = ({ data }: CartItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // TODO: add integration with context
  const handleDeleteItem = () => {
    toast({
      title: 'Produto excluído',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  // TODO: add integration with context
  const handleChangeItemQuantity = () => {
    console.log('Quantity changed')
  }

  return (
    <Flex width="full" maxHeight={20}>
      <ItemImage src={data.imageURL} alt={`Foto do prato ${data.name}`} />
      <Flex direction="column" width="full">
        <Flex justifyContent="space-between">
          <Text
            isTruncated
            fontSize="sm"
            color="secondary.700"
            fontFamily="heading">
            {data.name}
          </Text>
          <Text
            flexShrink={0}
            fontSize="sm"
            color="secondary.700"
            fontFamily="heading">
            {`R$ ${data.price.toFixed(2)}`}
          </Text>
        </Flex>
        <Text
          isTruncated
          sx={{ fontSize: 'xs', fontFamily: 'body', color: 'secondary.500' }}>
          {data.comments}
        </Text>
        <Flex mt="auto" justifyContent="space-between" alignItems="center">
          <QuantityInput onChange={handleChangeItemQuantity} />
          <DeleteItemButton onClick={onOpen} />
        </Flex>
      </Flex>

      <DeleteItemModal
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleDeleteItem}
      />
    </Flex>
  )
}

export default CartItem
