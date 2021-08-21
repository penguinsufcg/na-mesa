import { Heading, Flex, Spacer, Button, useDisclosure } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import DishTable from '@/components/Admin/DishTable'
import DishModal from '@/components/Admin/DishModal'
import { Dish as DishType } from '@/api/dishes'

import DATA from './dataMock'
import { db } from '@/config/firebaseClient'
import { useFirestoreListQuery } from '@/hooks/useFirestoreQuery'
import { useEffect } from 'react'

const Menu = () => {
  const {
    isOpen: isOpenDishModal,
    onOpen: onOpenDishModal,
    onClose: onCloseDishModal,
  } = useDisclosure()

  const data = useFirestoreListQuery<DishType>(db.collection('dishes'))

  useEffect(() => {
    console.log(data)
  }, [data])

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

      <DishTable data={data ?? []} />
    </Flex>
  )
}

export default Menu
