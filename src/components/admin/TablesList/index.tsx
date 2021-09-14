import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import TableCard from './components/TableCard'

const Section = ({ title, available }: { title: string, available: boolean }) => {
  const { data } = useFirestoreListQuery<Table>(
    'tables',
    { where: ['available', '==', available] },
    [available],
  )

  return (
    <Box>
      <Heading size="md" sx={{ marginBottom: 8 }}>{title}</Heading>
      <Flex sx={{ gap: 12 }}>
        {data?.map(table => <TableCard key={table.id} table={table} />)}
      </Flex>
    </Box>
  )
}

const TablesList = () => {
  
  return (
    <Flex direction="column" sx={{ gap: 24 }}>
      <Section title="Ocupadas" available={false} />
      <Section title="Disponíveis" available={true} />
    </Flex>
  )

}

export default TablesList