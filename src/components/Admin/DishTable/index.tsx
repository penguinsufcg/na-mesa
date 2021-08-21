import { Flex, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Table from './components/Table'
import SearchInput from './components/SearchInput'
import SelectInput from './components/SelectInput'
import { Dish as DishType } from '../../../api/dishes'

type DishTableProps = {
  data: DishType[]
}

const DishTable = ({ data }: DishTableProps) => {
  const [formatedData, setFormatedData] = useState<DishType[]>(data)
  const [orderBy, setOrderBy] = useState<keyof Omit<DishType, 'id'>>('name')
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
    const filtered = [...data].filter((dish) =>
      dish.name.toLowerCase().includes(searchText),
    )
    const sorted = [...filtered].sort((a, b) =>
      b[orderBy] > a[orderBy] ? -1 : 1,
    )

    setFormatedData(sorted)
  }, [orderBy, searchText, data])

  return (
    <>
      <Flex marginBottom={3}>
        <SearchInput onKeyPress={handleSearch} />
        <Spacer />
        <SelectInput onChange={handleOrderBy} />
      </Flex>
      <Table data={formatedData} />
    </>
  )
}

export default DishTable
