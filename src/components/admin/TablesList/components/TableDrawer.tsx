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
  HStack,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { updateTableName, updateTableStatus } from '@/api/tables'
import { updateSessionStatus } from '@/api/session'
import BillDetails from '@/components/BillDetails'
import ConfirmationModal from '@/components/admin/ConfirmationModal'
import TableStatus from './TableStatus'
import useSessionReceipt from '@/hooks/useSessionReceipt'
import { formatCurrency, formatTime } from 'utils/formatters'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import CreateTableModal from '../../TableModal'

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

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure()

  const {
    isOpen: isOpenRemoveModal,
    onOpen: onOpenRemoveModal,
    onClose: onCloseRemoveModal,
  } = useDisclosure()

  const { items: receiptItems, total: receiptTotal } = useSessionReceipt({
    sessionRef,
  })

  const closeTable = async () => {
    updateSessionStatus(sessionRef?.id, 'FINISHED').catch((e) => console.log(e))
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
          <DrawerHeader>
            <HStack>
              <Text
                fontSize="24px"
                fontWeight="medium"
                color="secondary.700"
                marginRight={8}>
                Mesa {table.id}
              </Text>
              <IconButton
                onClick={() => {
                  onClose()
                  onOpenEditModal()
                }}
                variant="unstyled"
                aria-label="Edite a mesa"
                icon={<MdModeEdit size={24} />}
              />
              <IconButton
                onClick={() => {
                  onClose()
                  onOpenRemoveModal()
                }}
                variant="unstyled"
                aria-label="Delete a mesa"
                icon={<MdDelete size={24} />}
              />
            </HStack>
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
      <CreateTableModal
        title="Editar Mesa"
        defaultTableNumber={table.id}
        modalProps={{
          onClose: onCloseEditModal,
          isOpen: isOpenEditModal,
        }}
        handleSubmit={updateTableName}
      />
      <ConfirmationModal
        label={'Encerrar mesa'}
        message={'Tem certeza que deseja encerrar a mesa?'}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        handleSubmit={closeTable}
      />
      <ConfirmationModal
        label={'Excluir mesa'}
        message={'Tem certeza que deseja excluir a mesa?'}
        isOpen={isOpenRemoveModal}
        onClose={onCloseRemoveModal}
        handleSubmit={() => {}}
      />
    </>
  )
}

export default TableDrawer
