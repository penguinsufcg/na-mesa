import React, { Context, useContext } from "react";

interface MinicartContextProps {
  items: OrderItem[],
  addItem?: ({ item } : { item: OrderItem }) => void
  removeItem?: ({ id }: { id: number }) => void
  updateItem?: ({ id, updatedItem }: { id: number, updatedItem: Partial<OrderItem> }) => void
  sendOrder?: () => Promise<void>
  total: number
}


export const MinicartContext: Context<MinicartContextProps> =
React.createContext<MinicartContextProps>({
  items: [],
  total: 0
})

const useMinicart = (): MinicartContextProps =>  {
  const context = useContext<MinicartContextProps>(MinicartContext)

  if (!context) {
    throw new Error('Do not use Minicart outside of context')
  }
  
  return context
}


export default useMinicart