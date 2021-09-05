import React from 'react'
import { Button, Flex, useToast } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

import AddDishForm from '@/components/client/AddDishForm'
import DishDetails from '@/components/client/DishDetails.tsx'
import { useRouter } from 'next/router'
import useMinicart from '@/hooks/useMinicart'
import { useFirestoreObjectQuery } from '@/hooks/useFirestoreObjectQuery'

const DishPage = () => {
  const router = useRouter()
  const { dishId } = router.query
  const { data: dishData } = useFirestoreObjectQuery<Dish>(`dishes/${dishId}`)
  const { addItem } = useMinicart()

  const toast = useToast()

  const handleSubmit = (quantity: number, comments: string) => {
    if (!dishId || !dishData) {
      return
    }

    addItem?.({
      item: {
        ...dishData,
        dishId: dishId.toString(),
        quantity,
        comments,
      },
    })

    toast({
      title: 'Item adicionado ao carrinho!',
      description: 'Veja detalhes na tela do carrinho',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Flex h="100vh" direction="column" justifyContent="space-between">
      <Button
        variant="ghost"
        sx={{
          position: 'fixed',
          top: 5,
          fontSize: '2xl',
          boxSize: 10,
          left: 4,
          background: '#ffffff',
        }}
        onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>
      {dishData && <DishDetails dish={dishData} />}
      <AddDishForm onSubmit={handleSubmit} />
    </Flex>
  )
}

export default DishPage
