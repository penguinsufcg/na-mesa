import SignInModal from '@/components/admin/SignInModal'
import Logo from '@/components/Logo'
import useAdminAuthContext from '@/hooks/useAdminAuthContext'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/layout'
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
    <Grid
      h="100vh"
      w="100vw"
      alignItems="center"
      templateRows="repeat(auto-fill, minmax(250px, 1fr))"
      templateColumns="repeat(2, 1fr)"
      gap={2}>
      <GridItem justifySelf="center" rowSpan={1} colSpan={1} m={8}>
        <Heading size="xl" color="gray.600" fontWeight="medium" mb="10px">
          Seja bem-vindo ao NaMesa
        </Heading>
        <Text fontFamily="body">
          Sua solução de cardápio digital e atendimento presencial de mesas
        </Text>
      </GridItem>

      <GridItem width="full" justifySelf="start" rowSpan={1} colSpan={1}>
        <Box>
          <Logo padding={0} />
        </Box>
      </GridItem>

      <GridItem justifySelf="center" rowSpan={2}>
        <TableImage />
      </GridItem>

      <GridItem justifySelf="start" rowSpan={1}>
        <Box>
          <Heading size="xl" color="gray.600" fontWeight="medium" mb="10px">
            Login
          </Heading>
          <Text fontFamily="body" mb="50px">
            Pronto para acessar sua lista de pedidos?
          </Text>
        </Box>
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          type="email"
          variant="outline"
          placeholder="Email"
          size="md"
          m={4}
        />
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          type="password"
          variant="outline"
          placeholder="Senha"
          size="md"
          m={4}
        />

        <Button onClick={handleSubmit} width="full" colorScheme="blue" m={4}>
          Entrar
        </Button>
      </GridItem>

      <SignInModal isOpen={isOpen} onClose={onClose} />
    </Grid>
  )
}

export default Login
