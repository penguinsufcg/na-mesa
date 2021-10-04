import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
  item: EntityWithID<Dish>
}
const DishCard: FC<Props> = ({ item }) => {
  const { name, description, price, imageURL } = item

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)

  return (
    <Link href={`dish-details/${item.id}`} passHref>
      <Flex
        // onClick={}
        sx={{
          width: 'full',
          padding: '2px',
          _hover: {
            shadow: 'md',
            borderWidth: '1px',
            borderRadius: 'md',
            cursor: 'pointer',
          },
          overflow: 'hidden',
        }}>
        <Image
          src={imageURL}
          fallbackSrc="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
          alt={`Foto do prato ${name}`}
          boxSize="80px"
          objectFit="cover"
          borderRadius="5px"
          sx={{
            marginRight: 2,
          }}
        />
        <Box sx={{ width: '100%' }}>
          <Flex sx={{ width: '100%' }}>
            <Text isTruncated width="150px">
              {name}
            </Text>
            <Spacer />
            <Text color="gray.700" fontWeight="medium">
              {formattedPrice(price)}
            </Text>
          </Flex>
          <Text color="gray.500" maxWidth="100%" maxHeight="50px" fontSize="xs">
            {description}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}
export default DishCard
