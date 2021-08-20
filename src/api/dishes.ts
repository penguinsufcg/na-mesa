import { db } from '@/config/firebaseClient'

const dishCollection = db.collection('dishes')

export async function createDish(dish: Dish) {
  const firestoreDoc = await dishCollection.add(dish)
  const data = await firestoreDoc.get()

  return data
}
