import React, { FC } from 'react'
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, Flex, Heading, useDisclosure, VStack } from '@chakra-ui/react'
import BillDetails from '@/components/BillDetails'
import ConfirmationModal from '@/components/admin/ConfirmationModal'
import TableStatus from './TableStatus'

type Props = Pick<DrawerProps, 'isOpen' | 'onClose'> & {
  table: Table
}

const TableDrawer: FC<Props> = ({ isOpen, onClose, table }) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="24px" fontWeight="medium" color="secondary.700">
            Mesa {table.id}
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing="20px" align="stretch">
              <TableStatus 
                time="20:20"
                status="Aguardando pagamento"
                clientName="João"
              />
              <BillDetails
                items={[
                { quantity: 6, name: 'Batata frita', price: 5.0 },
                { quantity: 6, name: 'Batata frita', price: 5.0 },
                { quantity: 6, name: 'Batata frita', price: 5.0 }
                ]}
                total={15}/>
            </VStack>
          </DrawerBody>

          <DrawerFooter flexDirection="column" alignItems="flex-start">
            <Heading size="sm">Total R$ 15,00 </Heading>
            <Button marginX="0" width="100%" onClick={onOpenModal}>Encerrar mesa</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ConfirmationModal
        label={'Encerrar mesa'}
        message={'Tem certeza que deseja encerrar a mesa?'}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        handleSubmit={() => {}}
      />
    </>
  )
}

export default TableDrawer