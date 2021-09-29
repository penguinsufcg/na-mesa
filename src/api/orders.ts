import { db } from '@/config/firebaseClient'

const orderCollection = db.collection('orders')

export function createOrder(items: OrderItem[], sessionId: string) {
  orderCollection.add({
    session: `sessions/${sessionId}`,
    status: 'PENDENTE',
    items,
    time: new Date().toString(),
  })
}
