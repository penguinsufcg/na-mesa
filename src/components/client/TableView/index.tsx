import { Button } from '@chakra-ui/button'
import { Flex, Spacer, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import { fixControlledValue } from 'antd/lib/input/Input'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  code: string
}

const TableView: FC<Props> = ({ code }) => {
  return (
    <Flex direction="column" sx={{ alignContent: 'spaceBetween' }}>
      <Text fontSize="lg" sx={{ padding: 4, textAlign: 'center' }}>
        Sua mesa está pronta!
      </Text>
      <Text sx={{ padding: 4 }}>
        Copie o código de acesso abaixo para acessar sua mesa de qualquer
        celular!
      </Text>
      <Text
        size="lg"
        fontSize="xl"
        color="primary.500"
        sx={{ padding: 4, textAlign: 'center' }}>
        {`#${code}`}
      </Text>
      <Button
        sx={{
          position: 'fixed',
          bottom: '3rem',
          alignSelf: 'center',
        }}
        width="80%">
        <Link href="/">Acessar</Link>
      </Button>
    </Flex>
  )
}

export default TableView
