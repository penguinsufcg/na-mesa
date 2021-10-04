type Reference<T> = firebase.firestore.DocumentReference<T>

type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'PAYMENT'

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
  status: TableStatus
  currentSession: Session
}

interface Session {
  client: string
  code: string
  orders: [OrderItem] | []
  table: string
  openTime?: string
}

type EntityWithID<P> = P & { id: string }

interface OrderItem {
  dishId?: string
  comments: string
  quantity: number
  name: string
  price: number
  imageURL?: string
}

type Order = {
  id: string
  status: string
  session: string
  items: OrderItem[]
  time: string
}
