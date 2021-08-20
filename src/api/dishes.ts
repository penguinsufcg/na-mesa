import { db } from '@/config/firebaseClient'

export interface Dish {
  available: boolean
  description: string
  imageURL: string
  name: string
  preparationTime: number
  price: number
  servings: number
}

const dishCollection = db.collection('dishes')

export async function createDish(dish: Dish) {
  const firestoreDoc = await dishCollection.add(dish)
  const data = (await firestoreDoc.get()).data()

  return data
}

export async function updateDish(dishId: string, dish: Dish) {
  await dishCollection.doc(dishId).set(dish)
}

export async function deleteDish(dishId: string) {
  await dishCollection.doc(dishId).delete()
}