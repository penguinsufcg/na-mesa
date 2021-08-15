import { useState, useEffect } from 'react'
import type firebase from 'firebase'
import { db } from '@/config/firebaseClient'

export interface Dish {
  available: boolean
  description: string
  imageURL: string
  name: string
  preparationTime: number
  price: number
  servings: number
}

// db.collection('todos')
// db.collection('users').doc('my-user-id')
type FirebaseDocRef =
  | firebase.firestore.Query
  | firebase.firestore.DocumentReference

function isDocumentReference(
  query: any,
): query is firebase.firestore.DocumentReference {
  // TODO: Give Context
  // TODO: Reference owner code
  return (query.path?.match(/\//g) || []).length % 2 !== 0
}

function useFirebaseQuery<Entity>(query: FirebaseDocRef): Entity | null {
  const [doc, setDoc] = useState<Entity | null>(null)
  if (isDocumentReference(query)) {
    useEffect(() => {
      const unsubscribe = query.onSnapshot((snapshot) => {
        setDoc(snapshot.data() as Entity)
      })
      return () => unsubscribe()
    }, [])
  } else {
    // TO DISCUSS: Do we need to differentiate each type of event for UI purposes?
    // Beyond the data we can provide the event received
    useEffect(() => {
      const unsubscribe = query.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          switch (change.type) {
            case 'added':
            case 'modified':
              setDoc(change.doc.data() as Entity)
              break
            case 'removed':
              setDoc(null)
              break
            default:
              //TO BE DEFINED
              console.log('NOTHING', change.doc.data())
              break
          }
        })
      })
      return () => unsubscribe()
    }, [])
  }
  // await (
  //   await db.collection('dishes').get()
  // ).docs.forEach((doc) => console.log(doc.data()))
  //console.log(query)

  return doc
}

export default useFirebaseQuery
