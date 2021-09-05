import { db } from '@/config/firebaseClient'
import type firebase from 'firebase'
import { useCallback, useEffect, useState } from 'react'

type FirestoreObjectQueryResponse<Entity> = {
  data: EntityWithID<Entity> | null
  isLoading: boolean
  error: firebase.firestore.FirestoreError | null
}

export function useFirestoreObjectQuery<Entity>(
  path: string,
  deps: any[] = [],
): FirestoreObjectQueryResponse<Entity> {
  const [doc, setDoc] = useState<EntityWithID<Entity> | null>(null)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(
    null,
  )
  const firestoreRef = db.doc(path)

  const onDocChange = useCallback(
    (snapshot: firebase.firestore.DocumentSnapshot) => {
      setDoc({
        id: snapshot.id,
        ...snapshot.data(),
      } as EntityWithID<Entity>)
    },
    [],
  )

  useEffect(() => {
    const unsubscriber = firestoreRef.onSnapshot(
      onDocChange,
      (error: firebase.firestore.FirestoreError) => setError(error),
    )

    return () => unsubscriber()
  }, [...deps])

  return {
    data: doc,
    isLoading: !doc && !error,
    error,
  }
}
