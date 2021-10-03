import { db } from '@/config/firebaseClient'
import { getSession } from './session'

const orderCollection = db.collection('orders')

export async function createOrder(items: OrderItem[], sessionId: string) {
  const sessionRef = await getSession(sessionId)
  orderCollection.add({
    session: sessionRef,
    status: 'PENDENTE',
    items,
    time: new Date().toString(),
  })
}
