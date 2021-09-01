import { db } from '@/config/firebaseClient'

const sessionCollection = db.collection('sessions')

export function createSession(session: Session) {
  return sessionCollection.add(session)
}
