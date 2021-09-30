import React, { FC, useMemo } from 'react'
import { Flex, Text, Spacer } from '@chakra-ui/react'
import { TABLE_STATUS_TO_LABEL } from 'utils/parsers'
import { formatTime } from 'utils/formatters'

type InfoRowProps = {
  label: string
  info: string
}

const InfoRow = ({ label, info }: InfoRowProps) => {
  return (
    <Flex>
      <Text fontSize="16px" fontWeight="medium">
        {label}
      </Text>
      <Spacer />
      <Text fontSize="14px" color="secondary.600">
        {info}
      </Text>
    </Flex>
  )
}

interface Props {
  time: string
  status: TableStatus
  clientName: string
}

const TableStatus: FC<Props> = ({ time, status, clientName }) => {
  return (
    <Flex direction="column" gridGap="8px">
      {time && (
        <InfoRow
          label="Aberto às"
          info={formatTime(time, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        />
      )}
      <InfoRow label="Status" info={TABLE_STATUS_TO_LABEL[status]} />
      <InfoRow label="Cliente" info={clientName} />
    </Flex>
  )
}

export default TableStatus
