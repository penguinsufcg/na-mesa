import { db } from '@/config/firebaseClient'

const sessionCollection = db.collection('sessions')

export function createSession(session: Session) {
  return sessionCollection.add(session)
}

// export function updateDish(dish: Dish) {
//   return sessionCollection.doc(dish.id).set(dish)
// }

// export function deleteDish(dish: Dish) {
//   return sessionCollection.doc(dish.id).delete()
// }
