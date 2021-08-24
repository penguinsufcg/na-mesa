import type firebase from 'firebase'
import isEqual from 'lodash.isequal'
import type react from 'react'
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

export function useFirestoreObjectQuery<Entity>(query: FirestoreQuery): any {
  const [doc, setDoc] = useState<EntityWithID<Entity> | null>(null)
  const [error, setError] = useState<firebase.firestore.FirestoreError>()

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
      ? onFirebaseDocChange<Entity>(queryRef.current, setDoc, setError)
      : onFirebaseCollectionChange<Entity>(queryRef.current, setDoc, setError)

    return () => unsubscriber()
  }, [queryRef])

  return {
    data: doc,
    loading: !doc,
    error,
  }
}

export function useFirestoreListQuery<Entity>(
  query: firebase.firestore.Query,
): any {
  const [collection, setCollection] = useState<[Entity] | null>(null)
  const [error, setError] = useState<firebase.firestore.FirestoreError>()

  const queryRef = useRef<firebase.firestore.Query>(query)

  useEffect(() => {
    if (!isEqual(queryRef.current, query)) {
      queryRef.current = query
    }
  }, [])

  useEffect(() => {
    if (!queryRef.current) {
      return () => {}
    }

    const unsubscriber = queryRef.current.onSnapshot(
      (snapshot) => {
        setCollection(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as [
            EntityWithID<Entity>,
          ],
        )
      },
      (error) => setError(error),
    )
    return () => unsubscriber()
  }, [queryRef])

  return {
    data: collection,
    isLoading: !collection,
    error,
  }
}
