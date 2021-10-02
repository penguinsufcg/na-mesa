import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import { Flex, Select } from '@chakra-ui/react'
import React, { FC } from 'react'

type TableSelectProps = {
  onSelect: React.Dispatch<string>
}

const TableSelect: FC<TableSelectProps> = ({ onSelect }: TableSelectProps) => {
  const { data } = useFirestoreListQuery<Table>('tables', {
    where: ['status', '==', 'AVAILABLE'],
  })

  return (
    <>
      <Flex
        direction="column"
        sx={{ alignItems: 'center', gap: '12px', width: '100%' }}>
        <Select
          placeholder="Número da mesa"
          onChange={(event) => onSelect(event.target.value)}>
          {data?.map((table) => (
            <option key={table.id} value={table.name}>
              {table.name}
            </option>
          ))}
        </Select>
      </Flex>
    </>
  )
}

export default TableSelect
