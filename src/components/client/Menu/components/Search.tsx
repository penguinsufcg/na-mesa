import React, { FC } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

interface Props {
  onSearch: (searchKey: string) => unknown
}

const Search: FC<Props> = ({ onSearch }) => {

  return (
  // <InputGroup width={335}>
  //   <InputLeftElement
  //     pointerEvents="none"
  //   >
  //     <SearchIcon color="gray.300" />
  //   </InputLeftElement>
    <Input width={355} placeholder="Pesquisar" size="md" onChange={e => onSearch(e.target.value)} />
  // </InputGroup>
  )
}

export default Search