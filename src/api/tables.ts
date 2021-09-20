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

export function makeAvailable(id: string) {
  return tablesCollection.doc(id).update({
    available: true,
    currentSession: null,
  })
}