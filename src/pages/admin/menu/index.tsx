import { Heading, Flex, Spacer, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import DishTable from '@/components/Admin/Menu/components/DishTable'
import SearchInput from '@/components/Admin/Menu/components/SearchInput'
import SelectInput from '@/components/Admin/Menu/components/SelectInput'

import DATA from './dataMock'

interface DishType {
  name: string
  description: string
  time: number
  servings: number
  price: number
  id: string
  imageURL: string
  [key: string]: string | number // DishType is indexable; not a new property
}

const Menu = () => {
  const [data, setData] = useState<DishType[]>(DATA)
  const [orderBy, setOrderBy] = useState('')
  const [searchText, setSearchText] = useState('')

  const handleOrderBy = (event: any) => {
    setOrderBy(event.target.value)
  }

  const handleSearch = (event: any) => {
    if (event.key === 'Enter') {
      setSearchText(event.target.value.toLowerCase())
    }
  }

  useEffect(() => {
    const filtered = [...DATA].filter((dish) =>
      dish.name.toLowerCase().includes(searchText),
    )
    const sorted = [...filtered].sort((a, b) =>
      b[orderBy] > a[orderBy] ? -1 : 1,
    )
    setData(sorted)
  }, [orderBy, searchText])

  return (
    <Flex width="full" direction="column" padding={12}>
      <Flex paddingBottom={14}>
        <Heading fontWeight="normal">Cardápio</Heading>
        <Spacer />
        <Button leftIcon={<BiPlus size={20} />} margin={0}>
          NOVO PRODUTO
        </Button>
      </Flex>

      <Flex marginBottom={3}>
        <SearchInput onSearch={handleSearch} />
        <Spacer />
        <SelectInput onOrder={handleOrderBy} />
      </Flex>
      <DishTable data={data} />
    </Flex>
  )
}

export default Menu
