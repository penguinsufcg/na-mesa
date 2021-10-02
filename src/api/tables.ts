import { db } from '@/config/firebaseClient'

const tablesCollection = db.collection('tables')

export function createTable(name: string) {
  tablesCollection.add({
    id: name,
    name,
    status: 'AVAILABLE',
    currentSession: null,
  })
}

export function updateTableStatus({ id, newStatus, currentSession }: { id: string, newStatus: TableStatus, currentSession?: Session | null }) {
  return tablesCollection
    .where('name', '==', id)
    .limit(1)
    .get()
    .then((snapshot) => {
      const [tableDoc] = snapshot.docs
      console.log(typeof currentSession !== 'undefined')

      tablesCollection.doc(tableDoc.id).update({
        status: newStatus,
        ...typeof currentSession !== 'undefined' && { currentSession },
      })
  })
}