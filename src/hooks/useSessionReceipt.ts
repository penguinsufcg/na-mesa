import { useEffect, useState } from 'react'
import { useFirestoreListQuery } from './useFirestoreListQuery'

interface Props {
  sessionRef?: Reference<Session> | null
}

const useSessionReceipt = ({ sessionRef }: Props) => {
  const [items, setItems] = useState<OrderItem[]>([])
  const [total, setTotal] = useState<number>(0)

  const { data: orders } = useFirestoreListQuery<Order>(
    'orders',
    { where: ['session', '==', sessionRef] },
    [sessionRef],
  )

  useEffect(() => {
    const updateReceipt = () => {
      if (!orders) {
        return
      }
      const receiptItems: OrderItem[] = []
      let total = 0
      orders.forEach((order) => {
        order.items.forEach((item) => {
          const itemIndex = receiptItems.findIndex(
            (i) => item.dishId === i.dishId,
          )
          if (itemIndex === -1) {
            receiptItems.push(item)
          } else {
            receiptItems[itemIndex] = {
              ...receiptItems[itemIndex],
              quantity: receiptItems[itemIndex].quantity + item.quantity,
            }
          }
          total += item.quantity * item.price
        })
      })
      setItems(receiptItems)
      setTotal(total)
    }

    updateReceipt()
  }, [orders])

  return {
    items,
    total
  }
}

export default useSessionReceipt
