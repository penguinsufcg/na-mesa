import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React, { ReactElement } from 'react'

type NavbarOptionProps = {
  isSelected?: boolean
  onClick?: () => void
  href: string
  icon: ReactElement
}

const NavbarOption = ({
  href,
  icon,
  isSelected = false,
  onClick,
}: NavbarOptionProps) => (
  <Link href={href} passHref>
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      color={isSelected ? 'primary.400' : 'secondary.400'}
      sx={{
        boxSize: 10,
        fontSize: 'md',
        padding: 2,
        justifyContent: 'center',
        _hover: { bg: 'none' },
        _active: { bg: 'primary.50', color: 'primary.500' },
      }}>
      {icon}
    </Button>
  </Link>
)

export default NavbarOption
