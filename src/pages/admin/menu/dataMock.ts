interface DishType {
  name: string
  description: string
  time: number
  servings: number
  price: number
  id: string
  imageURL: string
  [key: string]: string | number // DishType is indexable; not a new property
}

const DATA: DishType[] = [
  {
    id: '1',
    name: 'Batata frita',
    description: 'Um prato delicioso',
    time: 10,
    servings: 2,
    price: 20.0,
    imageURL: '',
  },
  {
    id: '2',
    name: 'Guacamole',
    description: 'Um prato delicioso',
    time: 20,
    servings: 4,
    price: 15.0,
    imageURL: '',
  },
  {
    id: '3',
    name: 'Coxinha',
    description: 'Um prato delicioso',
    time: 5,
    servings: 1,
    price: 5.0,
    imageURL: '',
  },
  {
    id: '4',
    name: 'Suco de Uva',
    description: 'Um prato delicioso',
    time: 3,
    servings: 1,
    price: 2.0,
    imageURL: '',
  },
  {
    id: '5',
    name: 'Pizza',
    description: 'Um prato delicioso',
    time: 30,
    servings: 4,
    price: 35.0,
    imageURL: '',
  },
  {
    id: '6',
    name: 'Quentinhas delicia',
    description: 'Um prato delicioso',
    time: 10,
    servings: 2,
    price: 20.0,
    imageURL: '',
  },
  {
    id: '7',
    name: 'Batata frita TOP',
    description: 'Descrição Descrição Descrição Descrição',
    time: 15,
    servings: 2,
    price: 10.0,
    imageURL:
      'https://escoladereceitas.com/wp-content/uploads/2021/01/como-fazer-batata-frita-crocante-e-sequinha.jpeg',
  },
  {
    id: '8',
    name: 'Arroz',
    description: 'Descrição Descrição Descrição Descrição',
    time: 15,
    servings: 2,
    price: 10.0,
    imageURL:
      'https://vivareceita-cdn.s3.amazonaws.com/uploads/2020/11/Aprenda-como-fazer-um-arroz-dos-deuses.-Fonte-Pinterest.jpg',
  },
  {
    id: '9',
    name: 'Macarrão',
    description: 'Descrição Descrição Descrição Descrição',
    time: 15,
    servings: 2,
    price: 10.0,
    imageURL:
      'https://www.sabornamesa.com.br/media/k2/items/cache/665e96c29d55b13435d7a8d39deafe53_XL.jpg',
  },
]

export default DATA