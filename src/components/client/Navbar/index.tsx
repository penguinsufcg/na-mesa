import useSession from '@/hooks/useSession'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BiHome, BiCartAlt, BiReceipt, BiLogOut } from 'react-icons/bi'
import NavbarOption from './components/NavbarOption'

const Navbar = () => {
  const { logout } = useSession()

  return (
    <Flex justifyContent="space-around">
      <NavbarOption isSelected icon={<BiHome size={24} />} href="/" />
      <NavbarOption icon={<BiCartAlt size={24} />} href="/cart" />
      <NavbarOption icon={<BiReceipt size={24} />} href="/receipt" />
      <NavbarOption icon={<BiLogOut size={24} />} href="/" onClick={logout} />
    </Flex>
  )
}

export default Navbar
