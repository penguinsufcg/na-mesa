import { Box, Flex, Heading, Spacer, Stack, Text, Image } from '@chakra-ui/react'
import React from 'react'

interface Props {
  items: any[]
}

const Item = ({ item }) => {
  const { name, description, price, imageURL } = item

  return (
    <Box
      p={5}
      flex="1"
      _hover={{
          shadow: 'md',
          borderWidth: '1px',
          borderRadius: 'md',
          cursor: 'pointer'
        }}
    >
      <Flex>
        <Image src={imageURL} alt="Segun Adebayo" boxSize="100px" objectFit="cover" />
        <Flex direction="column" sx={{ marginLeft: 4 }}>
          <Flex>
            <Heading size="md">
              {name}
            </Heading>
            <Spacer/>
            <Heading size="sm">
              R$ {price}
            </Heading>
          </Flex>
          <Text color="gray.500">
            {description}
          </Text>
        </Flex>
      </Flex>

    </Box>
  )
}
const DishList = ({ items }) => {
  console.log(items)
  return (
    <Stack direction="column">
      List
      {items.map(item => (
        <Item key={item.id} item={item}/>
      ))}
    </Stack>
  )

}

export default DishList