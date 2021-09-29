import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'

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
      <Td paddingY="4px" paddingX={0}>
        {item.quantity}
      </Td>
      <Td paddingY="4px" paddingX={0}>
        {item.name}
      </Td>
      <Td paddingY="4px" paddingX={0} textAlign="end" isNumeric>
        {formattedPrice(item.price)}
      </Td>
    </Tr>
  )
}

const BillDetails: FC<Props> = ({ sessionRef }) => {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  const { data } = useFirestoreListQuery<Order>(
    'orders',
    { where: ['session', '==', sessionRef] },
    [sessionRef],
  )

  useEffect(() => {
    const generateReceipt = (orders: Order[]) => {
      const receiptItems: OrderItem[] = []
      let total = 0
      orders.forEach((order) => {
        order.items.forEach((item) => {
          const itemIndex = receiptItems.findIndex(
            (i) => item.dishId === i.dishId,
          )
          if (itemIndex === -1) {
            receiptItems.push(item)
          } else {
            receiptItems[itemIndex] = {
              ...receiptItems[itemIndex],
              quantity: receiptItems[itemIndex].quantity + item.quantity,
            }
          }
          total += item.quantity * item.price
        })
      })

      return [receiptItems, total]
    }
    if (!data) {
      return
    }
    const [receiptItems, total] = generateReceipt(data)
    setItems(receiptItems)
    setTotal(total)
  }, [data])

  return (
    <Flex direction="column" sx={{ gap: 12, height: '100%' }}>
      <Heading size="md" fontWeight="medium" color="secondary.700">
        Conta
      </Heading>
      <Table size="sm" variant="unstyled">
        <Thead>
          <Tr>
            <Th textTransform="none" paddingX={0}>
              Qtd.
            </Th>
            <Th textTransform="none" paddingX={0}>
              Item
            </Th>
            <Th textTransform="none" paddingX={0} textAlign="end" isNumeric>
              Preço
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => (
            <ItemRow key={index} item={item} />
          ))}
        </Tbody>
      </Table>
      <Heading size="sm" alignSelf="flex-end" justifySelf="flex-end">
        Total R$ {total}{' '}
      </Heading>
    </Flex>
  )
}

export default BillDetails
