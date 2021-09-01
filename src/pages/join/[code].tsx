import Logo from '@/components/Logo'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { BiCopyAlt } from 'react-icons/bi'
import { useClipboard } from '@chakra-ui/react'

const TableCodePage: FC = () => {
  const router = useRouter()
  const { code } = router.query
  const { hasCopied, onCopy } = useClipboard(code ? code.toString() : '')

  return (
    <Flex
      direction="column"
      sx={{ alignContent: 'spaceBetween', alignItems: 'center' }}>
      <Box sx={{ marginBottom: '50%' }}>
        <Logo />
      </Box>
      <Heading size="lg" color="gray.600" fontWeight="medium" mb="10px">
        Sua mesa está pronta!
      </Heading>
      <Text sx={{ padding: 8 }}>
        Copie o código de acesso abaixo para acessar sua mesa de qualquer
        celular!
      </Text>
      <Flex sx={{ alignItems: 'center', color: 'primary.500' }}>
        <Text
          size="lg"
          fontSize="xl"
          color="primary.500"
          sx={{ textAlign: 'center' }}>
          {`${code}`}&nbsp;
        </Text>
        <BiCopyAlt size="20" />
      </Flex>
      <Button
        sx={{
          position: 'fixed',
          bottom: '3rem',
          alignSelf: 'center',
        }}
        onClick={() => router.push('/')}
        width="80%">
        Acessar
      </Button>
    </Flex>
  )
}

export default TableCodePage
