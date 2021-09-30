import { db } from '@/config/firebaseClient'

const tablesCollection = db.collection('tables')

export function createTable(name: string) {
  tablesCollection.add({
    id: name,
    name,
    available: true,
    status: 'AVAILABLE',
    currentSession: null,
  })
}

export function occupyTable(id: string, currentSession: Session) {
  tablesCollection
    .where('name', '==', id)
    .limit(1)
    .get()
    .then((snapshot) => {
      const [tableDoc] = snapshot.docs

      tablesCollection.doc(tableDoc.id).update({
        available: false,
        status: 'OCCUPIED',
        currentSession,
      })
  })
}

export function makeAvailable(id: string) {
  return tablesCollection.doc(id).update({
    available: true,
    status: 'AVAILABLE',
    currentSession: null,
  })
}

export function updateTableStatus(id: string, newStatus: TableStatus, currentSession?: Session) {
  tablesCollection
    .where('name', '==', id)
    .limit(1)
    .get()
    .then((snapshot) => {
      const [tableDoc] = snapshot.docs

      tablesCollection.doc(tableDoc.id).update({
        status: newStatus,
        ...!!currentSession && { currentSession },
      })
  })
}