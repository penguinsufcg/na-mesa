import React, { useEffect } from 'react'
import {
  Button,
  ButtonProps,
  Flex,
  Input,
  useNumberInput,
} from '@chakra-ui/react'
import { BiPlus, BiMinus } from 'react-icons/bi'

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
type QuantityInputProps = {
  onChange: (newQuantity: number) => void
  value?: number
}

const QuantityInput = ({ onChange, value }: QuantityInputProps) => {
  const { valueAsNumber, getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: value ?? 1,
      min: 1,
      max: 30,
      precision: 0,
    })

  const incrementProps = getIncrementButtonProps()
  const decrementProps = getDecrementButtonProps()
  const inputProps = getInputProps({ readOnly: true })

  useEffect(() => {
    onChange(valueAsNumber)
  }, [valueAsNumber])

  return (
    <Flex
      sx={{
        maxW: 32,
        alignItems: 'center',
        spacing: '0',
        borderColor: 'secondary.100',
        borderWidth: '1px',
        borderRadius: '5px',
      }}>
      <QuantityButton
        {...decrementProps}
        _active={{ bg: 'secondary.50' }}
        color="secondary.200">
        <BiMinus size={18} />
      </QuantityButton>
      <Input
        {...inputProps}
        size="xs"
        sx={{
          border: 'none',
          textAlign: 'center',
          fontFamily: 'body',
          fontSize: 'xs',
          fontWeight: 'medium',
          color: 'secondary.700',
          paddingY: 0,
        }}
      />
      <QuantityButton
        {...incrementProps}
        color="primary.400"
        _active={{ bg: 'primary.50' }}>
        <BiPlus size={18} />
      </QuantityButton>
    </Flex>
  )
}

export default QuantityInput
