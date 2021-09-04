import { Flex } from "@chakra-ui/react"
import React from "react"
import { BiHome, BiCartAlt, BiReceipt } from "react-icons/bi"
import NavbarOption from "./components/NavbarOption"

const Navbar = () => {
  return (
    <Flex justifyContent="space-around">
      <NavbarOption isSelected icon={<BiHome size={24} />} href="/" />
      <NavbarOption icon={<BiCartAlt size={24} />} href="/cart" />
      <NavbarOption icon={<BiReceipt size={24} />} href="/receipt" />
    </Flex>
  )
}

export default Navbar