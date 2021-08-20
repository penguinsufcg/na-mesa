import { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Flex, Box } from '@chakra-ui/react'
import Logo from '@/components/Logo'

import { NavbarData } from './NavbarData'

type OptionProps = {
  text: string
  href: string
  isSelected: boolean
  icon: ReactElement
}

const Option = ({ text, href, isSelected, icon }: OptionProps) => {
  return (
    <Link href={href} passHref>
      <Button
        leftIcon={icon}
        color={isSelected ? 'primary.400' : 'secondary.700'}
        variant="ghost"
        borderRadius="5px"
        fontSize="lg"
        fontFamily="Lexend Deca"
        fontWeight="400"
        border="0"
        height="3.5rem"
        justifyContent="flex-start"
        _focus={{ border: 'none' }}
        _hover={{ bg: 'primary.50', color: 'primary.500' }}
        _active={{ bg: 'primary.50', color: 'primary.500' }}>
        {text}
      </Button>
    </Link>
  )
}

const Navbar = () => {
  const { asPath } = useRouter()

  function isSelected(optionPath: string): boolean {
    return optionPath === asPath
  }

  return (
    <Box
      w="xs"
      minW="xs"
      h="100vh"
      paddingX={5}
      paddingY={7}
      borderRight="1px solid"
      borderColor="secondary.200"
      position="sticky"
      top={0}>
      <Logo />
      <Flex direction="column" marginTop={7}>
        {NavbarData.map((item) => (
          <Option
            key={item.id}
            text={item.title}
            href={item.path}
            icon={item.icon}
            isSelected={isSelected(item.path)}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default Navbar
