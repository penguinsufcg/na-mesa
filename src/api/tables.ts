import { db } from '@/config/firebaseClient'

const tablesCollection = db.collection('tables')

export function createTable(tableNumber: string) {
  tablesCollection.add({
    id: tableNumber,
    name: tableNumber,
    status: 'AVAILABLE',
    currentSession: null,
  })
}

export function removeTable({ tableNumber }: { tableNumber?: string }) {
  return tablesCollection
    .where('name', '==', tableNumber)
    .limit(1)
    .get()
    .then((snapshot) => {
      const [tableDoc] = snapshot.docs

      tablesCollection.doc(tableDoc.id).delete()
    })
}

export async function updateTableName({
  tableNumber,
  newTableNumber,
}: {
  tableNumber?: string
  newTableNumber?: string
}) {
  if (!newTableNumber) return
  tablesCollection
    .where('name', '==', tableNumber)
    .limit(1)
    .get()
    .then((snapshot) => {
      const [tableDoc] = snapshot.docs

      tablesCollection.doc(tableDoc.id).update({
        id: newTableNumber,
        name: newTableNumber,
      })
    })
}

export function updateTableStatus({
  id,
  newStatus,
  currentSession,
}: {
  id: string
  newStatus: TableStatus
  currentSession?: Reference<Session> | null
}) {
  return tablesCollection
    .where('name', '==', id)
    .limit(1)
    .get()
    .then((snapshot) => {
      const [tableDoc] = snapshot.docs

      tablesCollection.doc(tableDoc.id).update({
        status: newStatus,
        ...(typeof currentSession !== 'undefined' && { currentSession }),
      })
    })
}
