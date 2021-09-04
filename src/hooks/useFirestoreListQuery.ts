import type firebase from 'firebase'
import { useCallback, useEffect, useState } from 'react'
import {
  FieldPath,
  OrderByDirection,
  WhereFilterOp,
  Query,
} from '@firebase/firestore-types'
import { db } from '@/config/firebaseClient'

// Extracted from: https://github.com/nandorojo/swr-firestore/blob/master/src/hooks/use-swr-collection.ts
type KeyHack = string & {} // hack to also allow strings

type OrderByArray<Doc, Key = keyof Doc> = [
  Key | FieldPath | KeyHack,
  OrderByDirection,
]
type OrderByItem<Doc, Key = keyof Doc> = OrderByArray<Doc> | Key | KeyHack
type OrderByType<Doc> = OrderByItem<Doc> | OrderByArray<Doc>[]

type WhereItem<Doc, Key = keyof Doc> = [
  Key | FieldPath | KeyHack,
  WhereFilterOp,
  unknown,
]
type WhereType<Doc> = WhereItem<Doc>

export type CollectionQueryType<Doc> = {
  limit?: number
  orderBy?: OrderByType<Doc>
  where?: WhereType<Doc>
}

type FirestoreListQueryResponse<Entity> = {
  data: [EntityWithID<Entity>] | null
  isLoading: boolean
  error: firebase.firestore.FirestoreError | null
}

function getFirestoreRef<Entity>(
  path: string,
  options?: CollectionQueryType<Entity>,
) {
  let firestoreCollection: Query = db.collection(path)
  if (options) {
    const { where, limit } = options

    if (where) {
      firestoreCollection = firestoreCollection.where(
        where[0] as string | FieldPath,
        where[1],
        where[2],
      )
    }
    if (limit) {
      firestoreCollection = firestoreCollection.limit(limit)
    }
  }

  return firestoreCollection
}

export function useFirestoreListQuery<Entity>(
  path: string,
  options?: CollectionQueryType<Entity>,
  deps: any[] = [],
): FirestoreListQueryResponse<Entity> {
  const firestoreRef = getFirestoreRef<Entity>(path, options)
  const [collection, setCollection] = useState<[EntityWithID<Entity>] | null>(
    null,
  )
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(
    null,
  )

  const onCollectionChange = useCallback((snapshot) => {
    setCollection(
      snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })) as [
        EntityWithID<Entity>,
      ],
    )
  }, [])

  useEffect(() => {
    const unsubscriber = firestoreRef.onSnapshot(onCollectionChange, (error) =>
      setError(error),
    )

    return unsubscriber
  }, [...deps])

  return {
    data: collection,
    isLoading: !collection && !error,
    error,
  }
}
