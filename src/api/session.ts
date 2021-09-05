import { db } from '@/config/firebaseClient'

const sessionCollection = db.collection('sessions')

export async function createSession(session: Session) {
  const sessionDocument = await (await sessionCollection.add(session)).get()

  const newSession = {
    id: sessionDocument.id,
    ...sessionDocument.data() as Session
  }

  return newSession
}
