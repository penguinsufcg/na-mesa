import { db } from '@/config/firebaseClient'

const orderCollection = db.collection('orders')

export function createOrder(items: OrderItem[], sessionId: string) {
  orderCollection.add({
    session: db.doc(`sessions/${sessionId}`),
    status: 'PENDING',
    items
  })
}