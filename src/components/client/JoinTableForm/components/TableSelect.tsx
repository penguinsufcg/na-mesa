import { db } from '@/config/firebaseClient'
import { useFirestoreListQuery } from '@/hooks/useFirestoreQuery'
import { Flex, Select } from '@chakra-ui/react'
import React, { FC } from 'react'

type TableSelectProps = {
  onSelect: React.Dispatch<string>
}

const TableSelect: FC<TableSelectProps> = ({ onSelect }: TableSelectProps) => {
  const { data } = useFirestoreListQuery<Table>(
    db.collection('tables').where('available', '==', true),
  )

  return (
    <>
      <Flex
        direction="column"
        sx={{ alignItems: 'center', gap: '12px', width: '100%' }}>
        <Select
          placeholder="Número da mesa"
          onChange={(event) => onSelect(event.target.value)}>
          {data?.map((table) => (
            <option value={table.name}>{table.name}</option>
          ))}
        </Select>
      </Flex>
    </>
  )
}

export default TableSelect
