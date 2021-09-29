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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { makeAvailable } from '@/api/tables'
import BillDetails from '@/components/BillDetails'
import ConfirmationModal from '@/components/admin/ConfirmationModal'
import TableStatus from './TableStatus'

type Props = Pick<DrawerProps, 'isOpen' | 'onClose'> & {
  table: Table
  session?: Session | null
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

  const closeTable = () => {
    makeAvailable(table.id)
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
            <VStack spacing="20px" align="stretch">
              {session && (
                <TableStatus
                  time="20:20"
                  status="Aguardando pagamento"
                  clientName={session.client}
                />
              )}
              <BillDetails sessionRef={sessionRef} />
            </VStack>
          </DrawerBody>

          <DrawerFooter flexDirection="column" alignItems="flex-start">
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
