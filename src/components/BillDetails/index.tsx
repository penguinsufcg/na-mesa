import React, { FC } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

interface Item {
  quantity: number
    name: string
    price: number
}

interface Props {
  items: Item[]
  total: number
}

const ItemRow = ({ item }: { item: Item }) => {
  const formattedPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)

  return (
    <Tr>
      <Td>{item.quantity}</Td>
      <Td>{item.name}</Td>
      <Td isNumeric>{formattedPrice(item.price)}</Td>
    </Tr>
  )
} 

const BillDetails: FC<Props> = ({ items, total }) => {

  return (
    <Flex direction="column" sx={{ gap: 12 }}>
      <Heading size="md" fontWeight="medium" color="secondary.700">Conta</Heading>
      <Table size="sm" variant="unstyled">
        <Thead>
          <Tr>
            <Th>Qtd.</Th>
            <Th>Item</Th>
            <Th isNumeric>Preço</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => <ItemRow key={index} item={item} />)}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default BillDetails
