import { Flex, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Table from './components/Table'
import SearchInput from './components/SearchInput'
import SelectInput from './components/SelectInput'

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

type DishTableProps = {
  data: DishType[]
}

const DishTable = ({ data }: DishTableProps) => {
  const [formatedData, setFormatedData] = useState<DishType[]>(data)
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
