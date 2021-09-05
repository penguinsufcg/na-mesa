import DishModal from '@/components/admin/DishModal'
import DishTable from '@/components/admin/DishTable'
import Layout from '@/components/admin/Layout'
import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import { Button, Flex, Heading, Spacer, useDisclosure } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

const Menu = () => {
  const {
    isOpen: isOpenDishModal,
    onOpen: onOpenDishModal,
    onClose: onCloseDishModal,
  } = useDisclosure()

  const { data } = useFirestoreListQuery<Dish>('dishes')

  return (
    <Layout>
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
    </Layout>
  )
}

export default Menu
