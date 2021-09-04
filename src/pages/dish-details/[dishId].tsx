import React from 'react'
import { Button, Flex, useToast } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

import DATA from './mockedData'
import AddDishForm from '@/components/client/AddDishForm'
import DishDetails from '@/components/client/DishDetails.tsx'
import { useRouter } from 'next/router'

const DishPage = () => {
  const router = useRouter()
  const { dishId } = router.query

  //TODO: get dish data from Firebase using dishId
  const dish = DATA[0]

  const toast = useToast()

  // TODO: add integration with context
  const handleSubmit = (quantity: number, comments: string) => {
    console.log('submiting')
    console.log(quantity)
    console.log(comments)

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
      <DishDetails dish={dish} />
      <AddDishForm onSubmit={handleSubmit} />
    </Flex>
  )
}

export default DishPage
