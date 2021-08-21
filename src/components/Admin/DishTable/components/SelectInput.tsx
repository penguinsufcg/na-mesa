import { Select } from '@chakra-ui/react'

type SelectInputProps = {
  onChange: (e: any) => void
}

const SelectInput = ({ onChange }: SelectInputProps) => (
  <Select
    placeholder="Ordenar por"
    width="3xs"
    color="secondary.500"
    fontWeight="light"
    fontSize="sm"
    onChange={onChange}>
    <option value="name">Nome</option>
    <option value="time">Tempo de preparo</option>
    <option value="servings">Serve</option>
    <option value="price">Preço</option>
  </Select>
)

export default SelectInput
