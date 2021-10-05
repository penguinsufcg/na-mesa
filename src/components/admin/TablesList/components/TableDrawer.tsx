import React, { FC } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Heading,
  useDisclosure,
  VStack,
  Box,
} from '@chakra-ui/react'
import { updateTableStatus } from '@/api/tables'
import { updateSessionStatus } from '@/api/session'
import BillDetails from '@/components/BillDetails'
import ConfirmationModal from '@/components/admin/ConfirmationModal'
import TableStatus from './TableStatus'
import useSessionReceipt from '@/hooks/useSessionReceipt'
import { formatCurrency, formatTime } from 'utils/formatters'

type Props = Pick<DrawerProps, 'isOpen' | 'onClose'> & {
  table: Table
  session?: Session | null
  sessionRef?: Reference<Session> | null
}

const TableDrawer: FC<Props> = ({
  isOpen,
  onClose,
  table,
  session,
  sessionRef,
}) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()

  const { items: receiptItems, total: receiptTotal } = useSessionReceipt({
    sessionRef,
  })

  const closeTable = async () => {
    updateSessionStatus(sessionRef?.id, 'FINISHED')
      .catch((e) => console.log(e))
    updateTableStatus({
      id: table.id,
      newStatus: 'AVAILABLE',
      currentSession: null,
    })
      .then(onClose)
      .catch((e) => console.log(e))
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            fontSize="24px"
            fontWeight="medium"
            color="secondary.700">
            Mesa {table.id}
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing="25px" align="stretch">
              {session && (
                <TableStatus
                  time={session.openTime}
                  status={table.status}
                  clientName={session.client}
                />
              )}
              <Box>
                <Heading size="md" fontWeight="medium" color="secondary.700">
                  Conta
                </Heading>
                <BillDetails items={receiptItems} />
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter flexDirection="column" alignItems="flex-start">
            <Heading size="sm">Total: {formatCurrency(receiptTotal)}</Heading>
            <Button marginX="0" width="100%" onClick={onOpenModal}>
              Encerrar mesa
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ConfirmationModal
        label={'Encerrar mesa'}
        message={'Tem certeza que deseja encerrar a mesa?'}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        handleSubmit={closeTable}
      />
    </>
  )
}

export default TableDrawer
