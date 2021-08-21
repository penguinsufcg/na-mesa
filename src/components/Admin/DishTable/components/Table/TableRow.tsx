import { Tr, Td, Flex, Text, Image, HStack } from '@chakra-ui/react'
import TableRowActions from './TableRowActions'
import { Dish as DishType } from '@/api/dishes'

type TableRowProps = {
  data: DishType
}

const TableRow = ({ data }: TableRowProps) => (
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
    <Td>{`${data.preparationTime} min`}</Td>
    <Td>{data.servings}</Td>
    <Td>{`R$ ${data.price}`}</Td>
    <Td borderBottomRightRadius="md" borderTopRightRadius="md" align="right">
      <TableRowActions data={data} />
    </Td>
  </Tr>
)

export default TableRow
