import React, { FC } from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface Props {
  onSearch: (searchKey: string) => unknown
}

const Search: FC<Props> = ({ onSearch }) => {

  return (
  <InputGroup width={335}>
    <InputLeftElement
      pointerEvents="none"
    >
      <SearchIcon color="gray.300" />
    </InputLeftElement>
    <Input placeholder="Pesquisar" onChange={e => onSearch(e.target.value)} />
  </InputGroup>
  )
}

export default Search