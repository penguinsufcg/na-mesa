import { Textarea } from '@chakra-ui/react'
import React from 'react'

type CommentInputFormProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const CommentInput = ({ onChange }: CommentInputFormProps) => (
  <Textarea
    placeholder="Insira detalhes adicionais..."
    sx={{}}
    fontFamily="body"
    fontSize="sm"
    borderColor="secondary.100"
    fontWeight="light"
    paddingX={4}
    paddingY={3}
    onChange={onChange}
  />
)

export default CommentInput
