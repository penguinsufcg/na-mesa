import { db } from '@/config/firebaseClient'

const tablesCollection = db.collection('tables')

export function createTable(name: string) {
  tablesCollection.add({
    id: name,
    name,
    available: true,
    currentSession: null,
  })
}

export function occupyTable(id: string, currentSession) {
  tablesCollection
    .where('name', '==', id)
    .limit(1)
    .get()
    .then((snapshot) => {
      const [tableDoc] = snapshot.docs

      tablesCollection.doc(tableDoc.id).update({
        available: false,
        currentSession,
      })
  })
}

export function makeAvailable(id: string) {
  return tablesCollection.doc(id).update({
    available: true,
    currentSession: null,
  })
}