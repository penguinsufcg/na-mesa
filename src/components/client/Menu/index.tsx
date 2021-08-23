import React, { FC, useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import DishList from './components/DishList'
import Search from './components/Search'
import { useFirestoreListQuery } from '@/hooks/useFirestoreQuery'
import { db } from '@/config/firebaseClient'
import { useEffect } from 'react'
import { Skeleton } from '@chakra-ui/react'

interface Props {
  searchKey?: string
}

const Menu = ({ searchKey }: Props) => {
  const data = useFirestoreListQuery<Dish>(
    db.collection('dishes').where('available', '==', true),
  )
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(data ?? [])

  useEffect(() => {
    if (!data) {
      return
    }
    if (!searchKey) {
      setFilteredDishes(data)
      return
    }
    const filtered = data.filter((item: Dish) =>
      item.name.startsWith(searchKey),
    )
    setFilteredDishes(filtered)
  }, [data, searchKey])

  return (
    <Skeleton isLoaded={!!data}>
      <Flex direction="column" alignItems="center">
        <DishList items={filteredDishes ?? []} />
      </Flex>
    </Skeleton>
  )
}

Menu.Search = Search

export default Menu
