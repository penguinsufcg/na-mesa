import { Flex, Text } from '@chakra-ui/react'
import { BiCoffee } from 'react-icons/bi'

const Logo = ({ padding = 4 }: { padding: number }) => {
  return (
    <Flex padding={padding} align="center" color="secondary.700">
      <BiCoffee size={35} />
      <Text fontSize="2xl" fontFamily="Lexend Deca">
        NaMesa
      </Text>
    </Flex>
  )
}

export default Logo
