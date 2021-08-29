import type firebase from 'firebase'
import isEqual from 'lodash.isequal'
import react, { useCallback } from 'react'
import { useEffect, useRef, useState } from 'react'

type FirestoreQuery =
  | firebase.firestore.Query
  | firebase.firestore.DocumentReference

type EntityWithID<P> = P & { id: string }

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
  callback: react.Dispatch<EntityWithID<Entity> | null>,
) {
  return query.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      switch (change.type) {
        case 'added':
        case 'modified':
          callback({
            id: change.doc.id,
            ...change.doc.data(),
          } as EntityWithID<Entity>)
          break
        case 'removed':
          callback(null)
          break
        default:
          console.error('[useFirestoreQuery]: Unexpected firestore change')
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
    callback({
      id: snapshot.id,
      ...snapshot.data(),
    } as EntityWithID<Entity>)
  })
}

export function useFirestoreObjectQuery<Entity>(
  query: FirestoreQuery,
): Entity | null {
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

    const unsubscriber = isDocumentReference(queryRef.current)
      ? onFirebaseDocChange<Entity>(queryRef.current, setDoc)
      : onFirebaseCollectionChange<Entity>(queryRef.current, setDoc)

    return () => unsubscriber()
  }, [queryRef])

  return doc
}

type FirestoreListQueryResponse<Entity> = {
  data: [EntityWithID<Entity>] | null
  isLoading: boolean
  error: firebase.firestore.FirestoreError | null
}

export function useFirestoreListQuery<Entity>(
  query: firebase.firestore.Query,
): FirestoreListQueryResponse<Entity> {
  const [collection, setCollection] = useState<[EntityWithID<Entity>] | null>(
    null,
  )
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(
    null,
  )

  useEffect(() => {
    const unsubscriber = query.onSnapshot(
      (snapshot) => {
        setCollection(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as [
            EntityWithID<Entity>,
          ],
        )
      },
      (error) => setError(error),
    )
    return unsubscriber
  }, [query])

  return {
    data: collection,
    isLoading: !collection && !error,
    error,
  }
}
