import { Table as ChakraTable, Thead, Tr, Th, Tbody } from '@chakra-ui/react'
import TableRow from './TableRow'
import { Dish as DishType } from '@/api/dishes'

type TableHeadProps = {
  label: string
}

const TableHead = ({ label }: TableHeadProps) => (
  <Th paddingY={5} color="secondary.300" fontSize="sm" fontWeight="normal">
    {label}
  </Th>
)

type TableProps = {
  data: DishType[]
}

const Table = ({ data }: TableProps) => (
  <ChakraTable variant="simple">
    <Thead>
      <Tr>
        <TableHead label="PRODUTO" />
        <TableHead label="TEMPO DE PREPARO" />
        <TableHead label="SERVE" />
        <TableHead label="PREÇO" />
      </Tr>
    </Thead>
    <Tbody>
      {data.map((item) => (
        <TableRow
          key={item.name.toLowerCase().replaceAll(' ', '-')}
          data={item}
        />
      ))}
    </Tbody>
  </ChakraTable>
)

export default Table
