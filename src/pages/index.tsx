import {
  Button,
  Center,
  Flex,
  Spacer,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react'
import useAuthContext from '@/hooks/useAuthContext'

export default function Home() {
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
          <Button size="md">Primary</Button>
        </Flex>
      </Flex>
    </Center>
  )
}
