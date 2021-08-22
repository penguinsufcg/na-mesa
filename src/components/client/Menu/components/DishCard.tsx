import React, { FC } from 'react'
import { Box, Flex, Image, Heading, Text, Spacer } from '@chakra-ui/react'

interface Props {
  item: Dish
}
const DishCard: FC<Props> = ({ item }) => {
  const { name, description, price, imageURL } = item

  const formattedPrice = (price: number) => (
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  )

  return (
    <Flex
      sx={{
        width: '355px',
        maxWidth: '355px',
        padding: '2px',
        _hover: {
          shadow: 'md',
          borderWidth: '1px',
          borderRadius: 'md',
          cursor: 'pointer'
        },
        overflow: 'hidden',
      }}

    >
      <Image
        src={imageURL}
        fallbackSrc="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
        alt={`Foto do prato ${name}`}
        boxSize="80px"
        objectFit="cover"
        sx={{
          paddingRight: 1,
        }}
      />
      <Box sx={{ width: '100%' }}>
        <Flex sx={{ width: '100%' }}>
          <Text
            isTruncated
            width="150px"
          >
            {name}
          </Text>
          <Spacer />
          <Text color="gray.700" fontWeight="medium">{formattedPrice(price)}</Text>
        </Flex>
        <Text color="gray.500" maxWidth="100%" maxHeight="50px" fontSize="xs">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
export default DishCard
