import type firebase from 'firebase'
import react, { useEffect, useState } from 'react'

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
  setData: react.Dispatch<EntityWithID<Entity> | null>,
  setError: react.Dispatch<firebase.firestore.FirestoreError>,
) {
  return query.onSnapshot(
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        switch (change.type) {
          case 'added':
          case 'modified':
            setData({
              id: change.doc.id,
              ...change.doc.data(),
            } as EntityWithID<Entity>)
            break
          case 'removed':
            setData(null)
            break
          default:
            console.error('[useFirestoreQuery]: Unexpected firestore change')
            break
        }
      })
    },
    (error) => setError(error),
  )
}

function onFirebaseDocChange<Entity>(
  query: firebase.firestore.DocumentReference,
  setData: react.Dispatch<EntityWithID<Entity> | null>,
  setError: react.Dispatch<firebase.firestore.FirestoreError>,
) {
  return query.onSnapshot(
    (snapshot) => {
      setData({
        id: snapshot.id,
        ...snapshot.data(),
      } as EntityWithID<Entity>)
    },
    (error) => setError(error),
  )
}

type FirestoreObjectQueryResponse<Entity> = {
  data: EntityWithID<Entity> | null
  isLoading: boolean
  error: firebase.firestore.FirestoreError | null
}

export function useFirestoreObjectQuery<Entity>(
  query: FirestoreQuery,
  deps: any[] = [],
): FirestoreObjectQueryResponse<Entity> {
  const [doc, setDoc] = useState<EntityWithID<Entity> | null>(null)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(
    null,
  )

  useEffect(() => {
    const unsubscriber = isDocumentReference(query)
      ? onFirebaseDocChange<Entity>(query, setDoc, setError)
      : onFirebaseCollectionChange<Entity>(query, setDoc, setError)

    return () => unsubscriber()
  }, [...deps])

  return {
    data: doc,
    isLoading: !doc && !error,
    error,
  }
}
