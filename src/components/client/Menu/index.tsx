import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import { Flex } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DishList from './components/DishList'
import Search from './components/Search'

interface Props {
  searchKey?: string
}

const Menu = ({ searchKey }: Props) => {
  const { data, isLoading, error } = useFirestoreListQuery<Dish>('dishes', {
    where: ['available', '==', true],
  })

  const [filteredDishes, setFilteredDishes] = useState<
    EntityWithID<Dish>[] | null
  >(data ?? [])

  useEffect(() => {
    if (isLoading || error) {
      return
    }
    if (!searchKey) {
      setFilteredDishes(data)
      return
    }
    const filtered =
      data?.filter((item: EntityWithID<Dish>) => item.name.startsWith(searchKey)) ?? []
    setFilteredDishes(filtered)
  }, [data, searchKey])

  return (
    <Skeleton isLoaded={!isLoading}>
      <Flex direction="column" alignItems="center">
        <DishList items={filteredDishes ?? []} />
      </Flex>
    </Skeleton>
  )
}

Menu.Search = Search

export default Menu
