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

interface Order {
  sessionId: string
  status: string
  items: [OrderItem] | []
}

interface OrderItem {
  dishId: string
  name: string
  price: number
  comments: string
  quantity: number
  imageURL: string
}

type EntityWithID<P> = P & { id: string }
