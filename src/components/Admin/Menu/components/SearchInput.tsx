import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import { BiSearch } from 'react-icons/bi'

type SearchInputProps = {
  onSearch: (e: any) => void
}

const SearchInput = ({ onSearch }: SearchInputProps) => (
  <InputGroup width="lg">
    <InputLeftElement color="secondary.500" pointerEvents="none">
      <BiSearch />
    </InputLeftElement>
    <Input
      placeholder="Pesquise um produto pelo nome..."
      fontFamily="body"
      fontWeight="light"
      fontSize="sm"
      onKeyPress={(e) => onSearch(e)}
    />
  </InputGroup>
)

export default SearchInput
