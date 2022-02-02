import React, { FC, useRef } from 'react'
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
import { removeTable, updateTableName, updateTableStatus } from '@/api/tables'
import { updateSessionStatus } from '@/api/session'
import BillDetails from '@/components/BillDetails'
import ConfirmationModal from '@/components/admin/ConfirmationModal'
import TableStatus from './TableStatus'
import useSessionReceipt from '@/hooks/useSessionReceipt'
import { formatCurrency, formatTime } from 'utils/formatters'
import { MdModeEdit, MdDelete, MdReceipt } from 'react-icons/md'
import TableModal from '../../TableModal'
import Pdf from 'react-to-pdf'

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

  const billRef = useRef(null);

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
              <Pdf targetRef={billRef} filename={`comprovante-mesa-${table.id}`}>
                {({toPdf}: {toPdf: () => unknown}) => (
                    <IconButton
                     onClick={toPdf}
                     variant="unstyled"
                     aria-label="Imprimir comprovante"
                     icon={<MdReceipt size={24} />}
                   />
                )}
              </Pdf>
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
                <div ref={billRef}>
                  <BillDetails items={receiptItems} />
                </div>
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
      <TableModal
        title="Editar Mesa"
        initialTableNumber={table.id}
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
        handleSubmit={() => removeTable({ tableNumber: table.id })}
      />
    </>
  )
}

export default TableDrawer
