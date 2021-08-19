import React, { useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import DishList from './components/DishList'
import Search from './components/Search'

const dishes = [
  {
    id: '1',
    name: 'Batata frita',
    description: 'Descrição Descrição Descrição Descrição',
    price: 10.00,
    imageURL: 'https://escoladereceitas.com/wp-content/uploads/2021/01/como-fazer-batata-frita-crocante-e-sequinha.jpeg'
  },
  {
    id: '2',
    name: 'Arroz',
    description: 'Descrição Descrição Descrição Descrição',
    price: 10.00,
    imageURL: 'https://vivareceita-cdn.s3.amazonaws.com/uploads/2020/11/Aprenda-como-fazer-um-arroz-dos-deuses.-Fonte-Pinterest.jpg'
  },
  {
    id: '3',
    name: 'Macarrão',
    description: 'Descrição Descrição Descrição Descrição',
    price: 10.00,
    imageURL: 'https://www.sabornamesa.com.br/media/k2/items/cache/665e96c29d55b13435d7a8d39deafe53_XL.jpg'
  }, 
]
const Menu = () => {
  const [filteredDishes, setFilteredDishes] = useState(dishes)

  // Temporary, TODO: Do a firebase query for search
  const handleSearch = (searchKey: string) => {
    const result = dishes.filter(item => item.name.startsWith(searchKey))
    setFilteredDishes(result)
  }

  return (
    <Flex direction="column" alignItems="center" sx={{ gap: '20px' }}>
      <Search onSearch={handleSearch}  />
      <DishList items={filteredDishes} />
    </Flex>
  )
}

export default Menu