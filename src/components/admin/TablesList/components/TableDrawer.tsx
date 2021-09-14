import React, { FC } from 'react'
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, Flex, Heading } from '@chakra-ui/react'
import BillDetails from '@/components/BillDetails'

type Props = Pick<DrawerProps, 'isOpen' | 'onClose'> & {
  table: Table
}

const TableDrawer: FC<Props> = ({ isOpen, onClose, table }) => {
  const btnRef = React.useRef()

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Mesa {table.id}</DrawerHeader>

        <DrawerBody>
          <Flex direction="column" sx={{ height: '100%', width: '100%', justifyContent: 'space-between' }} >
          <BillDetails
            items={[
            { quantity: 6, name: 'Batata frita', price: 5.0 },
            { quantity: 6, name: 'Batata frita', price: 5.0 },
            { quantity: 6, name: 'Batata frita', price: 5.0 }
            ]}
            total={15}/>
            <Heading size="sm">Total R$ 15,00 </Heading>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button width="100%">Encerrar mesa</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TableDrawer