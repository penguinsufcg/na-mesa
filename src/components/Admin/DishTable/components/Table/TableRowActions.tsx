import { Button, HStack, Tooltip, useDisclosure } from '@chakra-ui/react'
import { ReactElement, useState } from 'react'
import { BiEditAlt, BiShow, BiTrash, BiHide } from 'react-icons/bi'
import DishModal from '@/components/Admin/DishModal'
import ConfirmationModal from '@/components/Admin/ConfirmationModal'
import { deleteDish, updateDish } from 'api/dishes'
import { Dish as DishType } from '@/api/dishes'

type ActionProps = {
  label: string
  icon: ReactElement
  onClick: () => void
}

const Action = ({ label, icon, onClick }: ActionProps) => (
  <Tooltip hasArrow label={label}>
    <Button variant="ghost" onClick={onClick}>
      {icon}
    </Button>
  </Tooltip>
)

type TableRowActionsProps = {
  data: DishType
}

const TableRowActions = ({ data }: TableRowActionsProps) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const [isDishAvailable, setIsDishAvailable] = useState(data.available)

  const changeAvailability = () => {
    updateDish({
      ...data,
      available: !isDishAvailable,
    })
      .then(() => console.log('Atualizou com sucesso'))
      .catch((error) => console.log(error))
    setIsDishAvailable(!isDishAvailable)
  }

  return (
    <HStack spacing={10} justifyContent="flex-end">
      {isDishAvailable ? (
        <Action
          label="Exibir no cardápio"
          onClick={changeAvailability}
          icon={<BiShow size={20} />}
        />
      ) : (
        <Action
          label="Esconder no cardápio"
          onClick={changeAvailability}
          icon={<BiHide size={20} />}
        />
      )}

      <Action
        label="Editar"
        onClick={onOpenEdit}
        icon={<BiEditAlt size={20} />}
      />
      <Action
        label="Excluir"
        onClick={onOpenDelete}
        icon={<BiTrash size={20} />}
      />

      <DishModal
        update={true}
        dish={data}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
      />
      <ConfirmationModal
        label={'Excluir Produto'}
        message={'Tem certeza que deseja excluir o produto?'}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleSubmit={() =>
          deleteDish(data).then(() =>
            console.log('Apagado com sucesso'),
          )
        }
      />
    </HStack>
  )
}

export default TableRowActions
