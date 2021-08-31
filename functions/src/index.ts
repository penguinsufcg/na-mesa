import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()
const tableCollection = db.collection('tables')

export const onSessionCreate = functions.firestore
  .document('sessions/{sessionId}')
  .onCreate((snap, _context) => {
    functions.logger.info(`[onSessionCreate] Updating table ${snap.data()}`, {
      structuredData: true,
    })

    const { table, currentSession } = snap.data()

    tableCollection
      .where('name', '==', table)
      .limit(1)
      .get()
      .then((snapshot) => {
        const [tableDoc] = snapshot.docs

        tableCollection.doc(tableDoc.id).update({
          available: false,
          currentSession,
        })
      })
  })
