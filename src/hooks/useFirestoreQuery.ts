import { useState, useEffect } from 'react'
import type firebase from 'firebase'

type FirebaseDocRef =
  | firebase.firestore.Query
  | firebase.firestore.DocumentReference

function isDocumentReference(
  query: any,
): query is firebase.firestore.DocumentReference {
  // Depending on the query's content we handle using a different manner
  // this code helps to identify which specific type the query belongs
  // See https://github.com/vueuse/vueuse/blob/410b59e3360b76b100d6ecadc8463392cc92c0e3/packages/firebase/useFirestore/index.ts#L29
  return (query.path?.match(/\//g) || []).length % 2 !== 0
}

function useFirestoreQuery<Entity>(query: FirebaseDocRef): Entity | null {
  const [doc, setDoc] = useState<Entity | null>(null)
  if (isDocumentReference(query)) {
    useEffect(() => {
      const unsubscribe = query.onSnapshot((snapshot) => {
        setDoc(snapshot.data() as Entity)
      })
      return () => unsubscribe()
    }, [])
  } else {
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
              console.log('[useFirestoreQuery]: Unexpected firestore change')
              break
          }
        })
      })
      return () => unsubscribe()
    }, [])
  }

  return doc
}

export default useFirestoreQuery
