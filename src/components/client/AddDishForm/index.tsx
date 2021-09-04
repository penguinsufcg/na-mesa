import { Button, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import DishQuantityInput from '../DishQuantityInput'
import CommentInput from './components/CommentsInput'

type AddDishFormProps = {
  onSubmit: (quantity: number, comments: string) => void
}

const AddDishForm = ({ onSubmit }: AddDishFormProps) => {
  const [comments, setComments] = React.useState('')
  const [quantity, setQuantity] = React.useState(1)

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value)
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(value)
  }

  const handleSubmit = () => {
    onSubmit(quantity, comments)
  }

  return (
    <VStack
      spacing={4}
      sx={{
        padding: 5,
        borderTopWidth: '1px',
        borderTopColor: 'secondary.100',
      }}>
      <CommentInput onChange={handleCommentsChange} />
      <HStack spacing={4} width="full">
        <DishQuantityInput onChange={handleQuantityChange} />
        <Button width="full" size="sm" onClick={handleSubmit}>
          Adicionar ao pedido
        </Button>
      </HStack>
    </VStack>
  )
}

export default AddDishForm
