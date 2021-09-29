import { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { MinicartContext } from '@/hooks/useMinicart'
import { createOrder } from '@/api/orders'
import { updateSessionOrders } from '@/api/session'

const MinicartProvider: FC = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>([])
  const [total, setTotal] = useState<number>(0)

  const addItem = useCallback(
    ({ item }: { item: OrderItem }) => {
      setItems([...items, item])
    },
    [items],
  )

  const updateItem = useCallback(
    ({ id, updatedItem }: { id: number; updatedItem: Partial<OrderItem> }) => {
      const newItems = items.map((item, index) => {
        if (index !== id) {
          return item
        }

        return {
          ...item,
          ...updatedItem,
        }
      })
      setItems(newItems)
    },
    [items],
  )

  const removeItem = useCallback(
    ({ id }: { id: number }) => {
      const newItems = items.filter((_, index) => index !== id)

      setItems(newItems)
    },
    [items],
  )

  const sendOrder = useCallback(async () => {
    const sessionId = localStorage.getItem('sessionId')
    if (!sessionId) {
      return
    }
    await createOrder(items, sessionId)
    // await updateSessionOrders(sessionId, items)
    setItems([])
  }, [items])

  useEffect(() => {
    const itemsLocal = JSON.parse(localStorage.getItem('minicart') ?? '[]')
    setItems(itemsLocal)
  }, [])

  useEffect(() => {
    localStorage.setItem('minicart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    const newTotal = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    )
    setTotal(newTotal)
  }, [items])

  const context = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateItem,
      sendOrder,
      total,
    }),
    [items, addItem, removeItem, updateItem, sendOrder, total],
  )

  return (
    <MinicartContext.Provider value={context}>
      {children}
    </MinicartContext.Provider>
  )
}

export default MinicartProvider
