import { Flex, Text, Spacer } from '@chakra-ui/react'
import { BiCoffee } from 'react-icons/bi'

const Logo = () => {
  return (
    <Flex paddingX={4} align="center" color="secondary.700">
      <BiCoffee size={35} />
      <Text fontSize="2xl" fontFamily="Lexend Deca">
        NaMesa
      </Text>
    </Flex>
  )
}

export default Logo
