import { Flex, Heading, Box, Text, Spacer, Button, useDisclosure, CloseButton } from '@chakra-ui/react'
import ConfirmationModal from '@/components/admin/ConfirmationModal'
import BillTable from './BillTable'

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

const TableDetails = ({ tableInfo, items }) => {
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure()

  const getTotal = (items) => {
    return items.reduce((prevSum, item) => prevSum + (item.price * item.quantity), 0)
  }

  return (
    <Flex
      direction="column"
      gridGap="36px"
      height="100vh"
      width="400px"
      borderLeft="solid 1px"
      borderColor="secondary.200"
      position="absolute"
      right={0}
      padding="40px"
      color="secondary.700"
    >
      <CloseButton position="absolute" top="20px" right="20px" onClick={()=>{}}/>
      <Heading fontSize="24px" fontWeight="light">
        {`Mesa ${tableInfo.numTable}`}
      </Heading>

      <Flex direction="column" gridGap="8px">
        <InfoRow label="Aberto às" info={tableInfo.time} />
        <InfoRow label="Status" info={tableInfo.status} />
        <InfoRow label="Cliente" info={tableInfo.clientName} />
      </Flex>
      
      <BillTable items={items}/>

      <Spacer/>
      <Box>
        <Text fontSize="18px" fontWeight="medium" mb="20px">
          {`Total R$ ${getTotal(items).toFixed(2)}`}
        </Text>
        <Button width="100%" margin="0" onClick={onOpen}>Encerrar Mesa</Button>
      </Box>
      <ConfirmationModal
        label={'Encerrar mesa'}
        message={'Tem certeza que deseja encerrar a mesa?'}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={() => {}}
      />
    </Flex>
  )
}

export default TableDetails
