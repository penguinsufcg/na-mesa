import type firebase from 'firebase'
import type react from 'react'
import { useEffect, useRef, useState } from 'react'
import isEqual from 'lodash.isequal'

type FirestoreQuery =
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

function onFirebaseCollectionChange<Entity>(
  query: firebase.firestore.Query,
  callback: react.Dispatch<Entity | null>,
) {
  return query.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      switch (change.type) {
        case 'added':
        case 'modified':
          callback(change.doc.data() as Entity)
          break
        case 'removed':
          callback(null)
          break
        default:
          console.log('[useFirestoreQuery]: Unexpected firestore change')
          break
      }
    })
  })
}

function onFirebaseDocChange<Entity>(
  query: firebase.firestore.DocumentReference,
  callback: react.Dispatch<Entity | null>,
) {
  return query.onSnapshot((snapshot) => {
    callback(snapshot.data() as Entity)
  })
}

function useFirestoreQuery<Entity>(query: FirestoreQuery): Entity | null {
  const [doc, setDoc] = useState<Entity | null>(null)
  const queryRef = useRef<FirestoreQuery>(query)

  useEffect(() => {
    if (!isEqual(queryRef.current, query)) {
      queryRef.current = query
    }
  }, [])

  useEffect(() => {
    if (!queryRef.current) {
      return () => {}
    }

    let unsubscriber = () => {}
    if (isDocumentReference(queryRef.current)) {
      unsubscriber = onFirebaseDocChange<Entity>(queryRef.current, setDoc)
    } else {
      unsubscriber = onFirebaseCollectionChange<Entity>(
        queryRef.current,
        setDoc,
      )
    }
    return () => unsubscriber()
  }, [queryRef])

  return doc
}

export default useFirestoreQuery
