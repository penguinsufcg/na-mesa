interface Dish {
  id?: string
  available: boolean
  description: string
  imageURL: string
  name: string
  preparationTime: number
  price: number
  servings: number
}

interface Table {
  id: string
  name: string
  available: boolean
  currentSession: Session
}

interface Session {
  client: string
  code: string
  orders: [Order] | []
  table: string
}

type EntityWithID<P> = P & { id: string }

interface OrderItem {
  dishId?: string
  comments: string
  quantity: number
  name: string
  price: number
}

type Order = {
  id: string
  status: string
  session: string
  items: OrderItem[]
  time: string
}

type TableStatus = ''
