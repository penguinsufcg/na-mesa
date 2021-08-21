import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import { BiSearch } from 'react-icons/bi'

type SearchInputProps = {
  onKeyPress: (e: any) => void
}

const SearchInput = ({ onKeyPress }: SearchInputProps) => (
  <InputGroup width="lg">
    <InputLeftElement color="secondary.500" pointerEvents="none">
      <BiSearch />
    </InputLeftElement>
    <Input
      placeholder="Pesquise um produto pelo nome..."
      fontFamily="body"
      fontWeight="light"
      fontSize="sm"
      onKeyPress={onKeyPress}
    />
  </InputGroup>
)

export default SearchInput
