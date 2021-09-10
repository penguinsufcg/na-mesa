import SignInModal from '@/components/admin/SignInModal'
import Logo from '@/components/Logo'
import useAdminAuthContext from '@/hooks/useAdminAuthContext'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import TableImage from './TableImage'

const Login: FC = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { signIn } = useAdminAuthContext()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async () => {
    onOpen()
    const isLogged = await signIn(email, password)
    // TODO: Handle Error
    if (isLogged) {
      onClose()
      router.push('/admin')
    }
  }

  return (
    <Flex
      flexWrap="wrap"
      height="100vh"
      align="center"
      justifyContent="space-around">
      <Center flexDirection="column">
        <Heading
          fontSize="4xl"
          color="secondary.700"
          fontWeight="medium"
          mb="10px">
          Seja bem-vindo ao NaMesa
        </Heading>
        <Text
          width="490px"
          fontSize="xl"
          color="secondary.500"
          fontWeight="light"
          fontFamily="body">
          Sua solução de cardápio digital e atendimento presencial de mesas
        </Text>
        <TableImage />
      </Center>

      <Center width="450px" alignItems="start" flexDirection="column">
        <Logo padding={0} />

        <Box sx={{ marginTop: 12 }}>
          <Heading
            fontSize="4xl"
            color="secondary.700"
            fontWeight="medium"
            mb="10px">
            Login
          </Heading>
          <Text
            fontSize="md"
            color="secondary.500"
            fontWeight="light"
            fontFamily="body"
            sx={{ marginBottom: 10 }}>
            Pronto para acessar sua lista de pedidos?
          </Text>
        </Box>
        <VStack spacing={10} width="full">
          <FormControl id="email">
            <FormLabel fontWeight="medium" color="secondary.600">
              Email
            </FormLabel>
            <Input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              type="email"
              variant="outline"
              placeholder="Email"
              size="md"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel fontWeight="medium" color="secondary.600">
              Senha
            </FormLabel>
            <Input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              type="password"
              variant="outline"
              placeholder="Senha"
              size="md"
            />
          </FormControl>

          <Button onClick={handleSubmit} width="full" colorScheme="blue">
            Entrar
          </Button>
        </VStack>
      </Center>

      <SignInModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default Login
