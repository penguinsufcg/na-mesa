import {
  Button,
  Center,
  Flex,
  Spacer,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react'
import DishModal from '@/components/Admin/DishModal'
import ConfirmationModal from '@/components/Admin/ConfirmationModal'
import useAuthContext from '@/hooks/useAuthContext'
import { useDisclosure } from '@chakra-ui/react'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { signIn } = useAuthContext()
  return (
    <Center h="100vh" w="100vw">
      <Flex direction="column">
        <Heading marginBottom={5} textAlign="center">
          <Box color="primary.500" display="initial">
            NaMesa
          </Box>{' '}
          is online!
        </Heading>
        <Flex>
          <Button variant="secondary" onClick={signIn}>
            Secondary
          </Button>
          <Spacer />
          <Button size="md" onClick={onOpen}>
            Primary
          </Button>
        </Flex>
      </Flex>
      {/*<DishModal update={false} isOpen={isOpen} onClose={onClose} /> */}
      {/*<ConfirmationModal
        label={'Excluir Produto'}
        message={'quer excluir gata?'}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={() => {}}
      />*/}
    </Center>
  )
}
