import { db } from '@/config/firebaseClient'

const dishCollection = db.collection('orders')

export function updateStatusOrder(id: string, newStatus: string) {
  return dishCollection.doc(id).set({ status: newStatus }, { merge: true })
}
