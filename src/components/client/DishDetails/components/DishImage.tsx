import React from 'react'
import { Image } from '@chakra-ui/react'

type DishImageProps = {
  src: string
}

const DishImage = ({ src }: DishImageProps) => {
  const fallbackSrc =
    'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png'

  return (
    <Image
      objectFit="cover"
      width="full"
      height="3xs"
      maxHeight="3xs"
      src={src}
      alt="Foto do prato"
      fallbackSrc={fallbackSrc}
    />
  )
}

export default DishImage
