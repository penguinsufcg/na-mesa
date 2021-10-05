import { Flex, Center, Text, VStack, Image, Button, Spacer, Box } from '@chakra-ui/react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/router'

const LogOff = () => {
  const router = useRouter()

  return (
    <Flex h="100vh" direction="column">
      <Center sx={{ paddingY: 4, paddingX: 5 }}>
        <Logo />
      </Center>
      <VStack spacing={20} mt="20vw">
        <Text fontWeight="medium">Sua mesa foi encerrada!</Text>
        <Text width="60vw" textAlign="center" color="#696969">Agradecemos a preferência e volte sempre!</Text>
        <Image src={"closing-fig.svg"}/>
      </VStack>
      <Spacer />
      <Center p="20px">
        <Button onClick={() => { router.push('/') }}>
          Voltar para o menu
        </Button>
      </Center>
    </Flex>
  )
}

export default LogOff
