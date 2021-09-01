import { Image } from '@chakra-ui/react'

const fallbackImageSrc =
  'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png'

type ItemImageProps = {
  src: string
  alt: string
}

const ItemImage = ({ src, alt }: ItemImageProps) => (
  <Image
    src={src}
    fallbackSrc={fallbackImageSrc}
    alt={alt}
    sx={{
      objectFit: 'cover',
      minWidth: 20,
      minHeight: 20,
      marginRight: 2,
      boxSize: 20,
      borderRadius: '5px',
    }}
  />
)

export default ItemImage
