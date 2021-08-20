import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Button,
  Text,
  Image,
  HStack,
  Tooltip,
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { BiEditAlt, BiShow, BiTrash } from 'react-icons/bi'

interface DishType {
  name: string
  description: string
  time: number
  servings: number
  price: number
  id: string
  imageURL: string
  [key: string]: string | number // DishType is indexable; not a new property
}

const TableRowActions = () => {
  const IconButton = ({
    label,
    icon,
  }: {
    label: string
    icon: ReactElement
  }) => (
    <Tooltip hasArrow label={label}>
      <Button variant="ghost">{icon}</Button>
    </Tooltip>
  )

  return (
    <HStack spacing={10} justifyContent="flex-end">
      <IconButton label="Exibir no cardápio" icon={<BiShow size={20} />} />
      <IconButton label="Editar" icon={<BiEditAlt size={20} />} />
      <IconButton label="Excluir" icon={<BiTrash size={20} />} />
    </HStack>
  )
}

type TableRowProps = {
  data: DishType
}

const TableRow = ({ data }: TableRowProps) => {
  return (
    <Tr
      color="secondary.600"
      fontSize="sm"
      fontWeight="normal"
      fontFamily="heading"
      _hover={{ bg: 'secondary.100', cursor: 'pointer' }}>
      <Td borderTopLeftRadius="md" borderBottomLeftRadius="md">
        <HStack spacing={5}>
          <Image
            height={12}
            width={16}
            borderRadius="5px"
            objectFit="cover"
            src={data.imageURL ? data.imageURL : ''}
            alt={data.name}
          />
          <Flex direction="column">
            <Text>{data.name}</Text>
            <Text fontFamily="body" fontSize="xs" fontWeight="light">
              {data.description}
            </Text>
          </Flex>
        </HStack>
      </Td>
      <Td>{`${data.time} min`}</Td>
      <Td>{data.servings}</Td>
      <Td>{`R$ ${data.price.toFixed(2)}`}</Td>
      <Td borderBottomRightRadius="md" borderTopRightRadius="md" align="right">
        <TableRowActions />
      </Td>
    </Tr>
  )
}

type DishTableProps = {
  data: DishType[]
}

const DishTable = ({ data }: DishTableProps) => {
  const TableHead = ({ label }: { label: string }) => (
    <Th paddingY={5} color="secondary.300" fontSize="sm" fontWeight="normal">
      {label}
    </Th>
  )

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <TableHead label="PRODUTO" />
          <TableHead label="TEMPO DE PREPARO" />
          <TableHead label="SERVE" />
          <TableHead label="PREÇO" />
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <TableRow key={item.name} data={item} />
        ))}
      </Tbody>
    </Table>
  )
}

export default DishTable
