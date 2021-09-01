import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { BiTrashAlt } from 'react-icons/bi'

const DeleteItemButton = ({ onClick }: ButtonProps) => (
  <Button
    onClick={onClick}
    variant="ghost"
    sx={{
      color: 'secondary.600',
      textAlign: 'center',
      boxSize: 10,
      fontSize: 'md',
      padding: 2,
      justifyContent: 'center',
      _hover: { bg: 'none' },
      _active: { bg: 'primary.50', color: 'primary.500' },
    }}>
    <BiTrashAlt size={18} />
  </Button>
)

export default DeleteItemButton
