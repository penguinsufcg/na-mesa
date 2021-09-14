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