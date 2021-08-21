import { Heading, Flex, Spacer, Button, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import DishTable from '@/components/Admin/DishTable'
import DishModal from '@/components/Admin/DishModal'

import DATA from './dataMock'

interface DishType {
  name: string
  description: string
  servings: number
  price: number
  id: string
  imageURL: string
  available: boolean
  preparationTime: number
  [key: string]: string | number | boolean // DishType is indexable; not a new property
}

const Menu = () => {
  const {
    isOpen: isOpenDishModal,
    onOpen: onOpenDishModal,
    onClose: onCloseDishModal,
  } = useDisclosure()

  return (
    <Flex width="full" direction="column" padding={12}>
      <Flex paddingBottom={14}>
        <Heading fontWeight="normal">Cardápio</Heading>
        <Spacer />
        <Button
          leftIcon={<BiPlus size={20} />}
          margin={0}
          onClick={onOpenDishModal}>
          NOVO PRODUTO
        </Button>
      </Flex>

      <DishModal
        update={false}
        isOpen={isOpenDishModal}
        onClose={onCloseDishModal}
      />

      <DishTable data={DATA} />
    </Flex>
  )
}

export default Menu
