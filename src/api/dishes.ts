import { db } from '@/config/firebaseClient'

export interface Dish {
  id?: string
  available: boolean
  description: string
  imageURL: string
  name: string
  preparationTime: number
  price: number
  servings: number
}

const dishCollection = db.collection('dishes')

export function createDish(dish: Dish) {
  return dishCollection.add(dish)
}

export function updateDish(dish: Dish) {
  return dishCollection.doc(dish.id).set(dish)
}

export function deleteDish(dish: Dish) {
  return dishCollection.doc(dish.id).delete()
}