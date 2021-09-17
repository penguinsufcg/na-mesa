import { Button } from '@chakra-ui/button'
import { Text, VStack, HStack } from '@chakra-ui/layout'
import react, { FC } from 'react'
import { formatCurrency } from 'utils/formaters'

export type FooterProps = {
  value: number
  buttonProps: {
    label: string
    onClick: () => void
  }
}

const Footer: FC<FooterProps> = ({ value, buttonProps }) => {
  return (
    <VStack
      w="full"
      align="end"
      sx={{
        padding: 5,
        marginTop: 'auto',
        borderTopWidth: '1px',
        borderTopColor: 'secondary.100',
      }}>
      <HStack w="full" justify="space-between" fontFamily="heading">
        <Text>Total</Text>
        <Text>{formatCurrency(value)}</Text>
      </HStack>
      <Button
        w="100%"
        size="sm"
        background="primary.400"
        onClick={buttonProps.onClick}>
        {buttonProps.label}
      </Button>
    </VStack>
  )
}

export default Footer
