import React, { FC, useEffect, useState } from 'react'
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  ResponsiveValue
} from '@chakra-ui/react'

interface Item {
  quantity: number
  name: string
  price: number
}

interface Props {
  items: OrderItem[]
}

const ItemRow = ({ item }: { item: Item }) => {
  const formattedPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)

  return (
    <Tr>
      <Td paddingY="4px" color="secondary.600" paddingX={0}>
        {item.quantity}
      </Td>
      <Td paddingY="4px" color="secondary.600" paddingX={0}>
        {item.name}
      </Td>
      <Td paddingY="4px" color="secondary.600" paddingX={0} textAlign="end">
        {formattedPrice(item.price)}
      </Td>
    </Tr>
  )
}

const ThCell = ({ label, align }: { label: string; align: ResponsiveValue<AlignSetting> }) => {
  return (
    <Th fontWeight="medium" textTransform="none" paddingX={0} textAlign={align}>
      {label}
    </Th>
  )
}

const BillDetails: FC<Props> = ({ items }) => {
  return (
    <Table fontSize="14px" variant="unstyled">
      <Thead>
        <Tr>
          <ThCell label="Qtd." align="start" />
          <ThCell label="Item" align="start" />
          <ThCell label="Preço" align="end" />
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item, index) => (
          <ItemRow key={index} item={item} />
        ))}
      </Tbody>
    </Table>
  )
}

export default BillDetails
