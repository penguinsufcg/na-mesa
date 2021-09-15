import React, { FC } from 'react'
import { Flex, Text, Spacer } from '@chakra-ui/react'

type InfoRowProps = {
  label: string,
  info: string
}

const InfoRow = ({ label, info }: InfoRowProps) => {
  return (
    <Flex>
      <Text fontSize="16px" fontWeight="medium">{label}</Text>
      <Spacer />
      <Text fontSize="14px" color="secondary.600">{info}</Text>
    </Flex>
  )
}

interface Props {
  time: string
  status: string
  clientName: string
}

const TableStatus: FC<Props> = ({ time, status, clientName }) => {
  return (
    <Flex direction="column" gridGap="8px">
      <InfoRow label="Aberto às" info={time} />
      <InfoRow label="Status" info={status} />
      <InfoRow label="Cliente" info={clientName} />
    </Flex>
  )
}

export default TableStatus