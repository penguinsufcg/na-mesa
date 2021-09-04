import React, { ReactElement } from 'react'
import { Flex, HStack, Text } from '@chakra-ui/react'
import { BiTime, BiGroup } from 'react-icons/bi'

const TitleItem = ({ text }: { text: string }) => (
  <Text
    isTruncated
    sx={{ fontSize: 'lg', color: 'secondary.700', fontFamily: 'heading' }}>
    {text}
  </Text>
)

const SubtitleItem = ({ text, icon }: { text: string; icon: ReactElement }) => (
  <HStack>
    {icon}
    <Text
      sx={{
        fontFamily: 'body',
        fontSize: 'xs',
        fontWeight: 'light',
        lineHeight: 0,
      }}>
      {text}
    </Text>
  </HStack>
)

type DishTitleProps = {
  dish: Dish
}

const DishTitle = ({ dish }: DishTitleProps) => {
  return (
    <>
      <Flex justifyContent="space-between" marginBottom={1.5}>
        <TitleItem text={dish.name} />
        <TitleItem text={`R$ ${dish.price.toFixed(2)}`} />
      </Flex>
      <HStack spacing={4} color="secondary.500" marginBottom={3}>
        <SubtitleItem
          text={`${dish.preparationTime} min`}
          icon={<BiTime size={14} />}
        />
        <SubtitleItem
          text={dish.servings.toString()}
          icon={<BiGroup size={14} />}
        />
      </HStack>
    </>
  )
}

export default DishTitle
