import { db } from '@/config/firebaseClient'

const sessionCollection = db.collection('sessions')


export async function getSession(sessionId: string) {
  const sessionDocument = await sessionCollection.doc(sessionId)

  return sessionDocument
}

export async function createSession(session: Session) {
  const sessionRef = await sessionCollection.add(session)
  const sessionDocument = await sessionRef.get()

  const newSession = {
    id: sessionDocument.id,
    ...(sessionDocument.data() as Session),
  }

  return  { session: newSession, sessionRef }
}

export async function updateSessionOrders(sessionId: string, newOrders: OrderItem[]) {
  const sessionDocument = await getSession(sessionId)

  const mergedOrders = newOrders.map(order => {
    const orderIndex = newOrders.findIndex(o => o.dishId === order.dishId)
    if (orderIndex !== -1) {
      return {
        ...order,
        quantity: order.quantity + newOrders[orderIndex].quantity
      }
    } else {
      return order
    }
  })

  await sessionDocument.update({
    orders: mergedOrders
  })
}

export async function updateSessionStatus(sessionId: string, newStatus: string) {
  return await sessionCollection.doc(sessionId).update({ status: newStatus })
}
