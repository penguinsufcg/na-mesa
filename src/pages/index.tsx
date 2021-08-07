import {
  Button,
  Center,
  Flex,
  Spacer,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react'

export default function Home() {
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
          <Button variant="secondary">LARGE</Button>
          <Button variant="secondary">MEDIUM</Button>
          <Button variant="secondary">SMALL</Button>
        </Flex>
        <Spacer />
        <Flex>
          <Button size="lg" variant="primary">LARGE</Button>
          <Button size="md" variant="primary">MEDIUM</Button>
          <Button size="sm" variant="primary">SMALL</Button>
          <Button size="xs" variant="primary">EXTRA SMALL</Button>

        </Flex>
      </Flex>
    </Center>
  )
}
