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

interface Session {
  client: string
  code: string
  orders: []
  table: string
}

type EntityWithID<P> = P & { id: string }
