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
import useFirestoreQuery from '@/hooks/useFirestoreQuery'
import { db } from '@/config/firebaseClient'

interface Dish {
  available: boolean
  description: string
  imageURL: string
  name: string
  preparationTime: number
  price: number
  servings: number
}

export default function Home() {
  const { signIn } = useAuthContext()
  const doc = useFirestoreQuery<Dish>(db.collection('dishes'))
  console.log(`My doc ${doc?.imageURL}`)

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
