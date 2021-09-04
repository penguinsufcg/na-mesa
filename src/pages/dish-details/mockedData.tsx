interface Dish {
  name: string
  description: string
  servings: number
  price: number
  id: string
  imageURL: string
  available: boolean
  preparationTime: number
}

const DATA: Dish[] = [
  {
    id: '1',
    name: 'Batata frita',
    description: 'Um prato delicioso',
    servings: 2,
    price: 20.0,
    imageURL:
      'https://img.itdg.com.br/tdg/images/recipes/000/018/897/164773/164773_original.jpg?w=1200',
    available: false,
    preparationTime: 10,
  },
  {
    id: '7',
    name: 'Batata frita TOP',
    description: 'Descrição Descrição Descrição Descrição',
    servings: 2,
    price: 10.0,
    imageURL:
      'https://escoladereceitas.com/wp-content/uploads/2021/01/como-fazer-batata-frita-crocante-e-sequinha.jpeg',
    available: false,
    preparationTime: 10,
  },
  {
    id: '8',
    name: 'Arroz',
    description: 'Descrição Descrição Descrição Descrição',
    servings: 2,
    price: 10.0,
    imageURL:
      'https://vivareceita-cdn.s3.amazonaws.com/uploads/2020/11/Aprenda-como-fazer-um-arroz-dos-deuses.-Fonte-Pinterest.jpg',
    available: true,
    preparationTime: 10,
  },
  {
    id: '9',
    name: 'Macarrão',
    description: 'Descrição Descrição Descrição Descrição',
    servings: 2,
    price: 10.0,
    imageURL:
      'https://www.sabornamesa.com.br/media/k2/items/cache/665e96c29d55b13435d7a8d39deafe53_XL.jpg',
    available: true,
    preparationTime: 10,
  },
]

export default DATA
