import useSession from "@/hooks/useSession"
import { Flex } from "@chakra-ui/react"
import React from "react"
import { BiHome, BiCartAlt, BiReceipt } from "react-icons/bi"
import NavbarOption from "./components/NavbarOption"

const Navbar = () => {
  const { underPayment } = useSession()
  return (
    <Flex justifyContent="space-around">
      <NavbarOption isSelected icon={<BiHome size={24} />} href="/" />
      <NavbarOption icon={<BiCartAlt size={24} />} href="/cart" />
      <NavbarOption icon={<BiReceipt size={24} />} href={underPayment ? "/bill" : "/receipt"} />
    </Flex>
  )
}

export default Navbar