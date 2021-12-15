import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import TableCard from './components/TableCard'

const Section = ({ title, status }: { title: string; status: TableStatus }) => {
  const { data } = useFirestoreListQuery<Table>(
    'tables',
    { where: ['status', '==', status] },
    [status],
  )

  return (
    <Box>
      <Heading size="md" sx={{ marginBottom: 8 }}>
        {title}
      </Heading>
      <Flex flexWrap="wrap" sx={{ gap: 12 }}>
        {data?.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </Flex>
    </Box>
  )
}

const TablesList = () => {
  return (
    <Flex direction="column" sx={{ gap: 24, marginTop: 8 }}>
      <Section title="Aguardando pagamento" status="PAYMENT" />
      <Section title="Ocupadas" status="OCCUPIED" />
      <Section title="Disponíveis" status="AVAILABLE" />
    </Flex>
  )
}

export default TablesList
