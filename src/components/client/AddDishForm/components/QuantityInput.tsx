import React from 'react'
import {
  Button,
  ButtonProps,
  Flex,
  Input,
  useNumberInput,
} from '@chakra-ui/react'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { useEffect } from 'react'

const QuantityButton = ({ children, ...props }: ButtonProps) => (
  <Button
    {...props}
    variant="ghost"
    sx={{
      margin: 0,
      padding: 0,
      height: 6,
      maxWidth: 4,
      borderRadius: '5px',
      _hover: { bg: 'none' },
    }}>
    {children}
  </Button>
)

type DishQuantityInputProps = {
  onChange: (value: number) => void
}

const DishQuantityInput = ({ onChange }: DishQuantityInputProps) => {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 30,
    precision: 0,
  })

  useEffect(() => {
    onChange(valueAsNumber)
  }, [onChange, valueAsNumber])

  const incrementProps = getIncrementButtonProps()
  const decrementProps = getDecrementButtonProps()
  const inputProps = getInputProps()

  return (
    <Flex
      sx={{
        maxW: 32,
        alignItems: 'center',
        spacing: '0',
        borderColor: 'secondary.100',
        borderWidth: '1px',
        borderRadius: '5px',
        height: 'full',
      }}>
      <QuantityButton
        {...decrementProps}
        color="secondary.200"
        _active={{ bg: 'secondary.50' }}>
        <BiMinus size={20} />
      </QuantityButton>
      <Input
        {...inputProps}
        size="xs"
        sx={{
          border: 'none',
          textAlign: 'center',
          fontFamily: 'body',
          fontSize: 'sm',
          fontWeight: 'medium',
          color: 'secondary.700',
          paddingY: 0,
        }}
      />
      <QuantityButton
        {...incrementProps}
        color="primary.400"
        _active={{ bg: 'primary.50' }}>
        <BiPlus size={20} />
      </QuantityButton>
    </Flex>
  )
}

export default DishQuantityInput
