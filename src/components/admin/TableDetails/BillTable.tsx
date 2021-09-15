import { Heading, Box, Table, Thead, Tbody, Td, Tr, Th, ResponsiveValue } from '@chakra-ui/react'

type ItemBill = {
  quantity: number,
  name: string,
  price: number
}

const TableRow = ({ quantity, name, price }: ItemBill) => {
  return (
    <Tr color="secondary.600" fontSize="14px">
      <Td paddingY="4px" paddingX={0}>{quantity}</Td>
      <Td paddingY="4px" paddingX={0}>{name}</Td>
      <Td paddingY="4px" paddingX={0} textAlign="end">
        {`R$ ${price.toFixed(2)}`}
      </Td>
    </Tr>
  )
}

type TableHeadProps = {
  label: string,
  align: ResponsiveValue<AlignSetting>
}

const TableHead = ({ label, align }: TableHeadProps) => (
  <Th 
    p="0 0 10px 0" 
    fontSize="14px" 
    fontWeight="medium" 
    textTransform="none" 
    textAlign={align}
  >
    {label}
  </Th>
)

const BillTable = ({ items }: ItemBill[]) => {
  return (
    <Box overflow="auto">
      <Heading fontSize="18px" fontWeight="light" mb="18px">
        Conta
      </Heading>
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <TableHead label="Qtd." align="start"/>
            <TableHead label="Item" align="start"/>
            <TableHead label="Preço" align="end"/>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <TableRow quantity={item.quantity} name={item.name} price={item.price}/>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default BillTable
