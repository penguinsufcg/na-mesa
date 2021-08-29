import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { db } from '@/config/firebaseClient'
import { useFirestoreListQuery } from '@/hooks/useFirestoreQuery'
import OrderCard from 'components/admin/Order'
import '@atlaskit/css-reset'
import { useEffect } from 'react'

const { useState, memo } = React

interface Dish {
  dishId: string
  comments: string
  quantity: number
  name: string
  price: number
}

type Order = {
  id: string
  status: string
  session: string
  items: Dish[]
}

const OrderContainer = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'red' : 'white')};
  transition: background 0.1s;
`

interface Orders {
  id: string
  content: string
}

interface OrderProps {
  order: Orders
  index: number
}

// eslint-disable-next-line react/display-name
const Orders = memo(({ order, index }: OrderProps) => {
  return (
    <Draggable draggableId={order.id} index={index}>
      {(provided, snapshot) => (
        <OrderContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}>
          {order.content}
        </OrderContainer>
      )}
    </Draggable>
  )
})

const Container = styled.div<{ isDragging: boolean }>`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 361px;
  height: 904px;
  position: static;
  display: flex;
  flex-direction: column;
  background-color: grey};
`
const Title = styled.h3`
  padding: 8px;
`
const List = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background 0.1s;
  background-color: ${(props) =>
    props.isDraggingOver ? 'lightgrey' : 'inherit '};
  flex-grow: 1;
`

const Columns = styled.div`
  display: flex;
`

interface Column {
  id: string
  title: string
}

interface ColumnProps {
  orders: Orders[]
  index: number
  column: Column
}

// eslint-disable-next-line react/display-name
const Column = memo(({ column, orders, index }: ColumnProps) => (
  <Container>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id} type="order">
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}>
          {orders.map((t, i) => (
            <Orders key={t?.id} order={t} index={i} />
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  </Container>
))

const columns = {
  preparing: {
    id: 'preparing',
    title: 'PREPARING',
    ordersIds: [],
  },
  kitchen: {
    id: 'kitchen',
    title: 'KITCHEN',
    ordersIds: [],
  },
  ready: {
    id: 'ready',
    title: 'READY',
    ordersIds: [],
  },
  delivered: {
    id: 'delivered',
    title: 'DELIVERED',
    ordersIds: [],
  },
}

const columnOrder = ['preparing', 'kitchen', 'ready', 'delivered']

function DragAndDrop() {
  const [stateColumns, setStateColumns] = useState<any>(columns)
  const ordersData = useFirestoreListQuery<Order>(
    db.collection('orders')
  )
  const [state, setState] = useState<any>(ordersData ?? [])
  
  useEffect(() => {
    if (!ordersData) {
      return
    }

    const orders = ordersData?.map((order, index) => (
      {
        id: order.id,
        content: (
          <OrderCard
            id={index}
            code={order.id}
            subtotal={50.3}
            time={'20:31'}
            dishs={order.items}
          />
        ),
      }
    ))
    const cols = {}    
    columnOrder.forEach(col => {
      cols[col] = {
        id: col,
        title: col.toUpperCase(),
        ordersIds: ordersData.filter(order => order.status === col.toUpperCase()).map(o => o.id),
      }
    })

    setStateColumns(cols)
    setState(orders)
  }, [ordersData])
  
  const [winReady, setwinReady] = useState(false)
  useEffect(() => {
    setwinReady(true)
  }, [])

  return (
    <DragDropContext
      onDragEnd={({ destination, source, draggableId, type }) => {
        if (!destination) {
          return
        }
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return
        }

        const startcol = stateColumns[source.droppableId]
        const endcol = stateColumns[destination.droppableId]

        if (startcol === endcol) {
          const orders = Array.from(startcol.ordersIds)
          orders.splice(source.index, 1)
          orders.splice(destination.index, 0, draggableId)

          const newCol = {
            ...startcol,
            ordersIds: orders,
          }

          const newStateColumns = {
            ...stateColumns,
            [newCol.id]: newCol
          }

          setStateColumns(newStateColumns)
          return
        }
        const startorderIds = Array.from(startcol.ordersIds)
        startorderIds.splice(source.index, 1)
        const newStart = {
          ...startcol,
          ordersIds: startorderIds,
        }
        const endorderIds = Array.from(endcol.ordersIds)
        endorderIds.splice(destination.index, 0, draggableId)
        const newEnd = {
          ...endcol,
          ordersIds: endorderIds,
        }
        const newStateColumns = {
          ...stateColumns,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd,
        }
        setStateColumns(newStateColumns)
      }}>
      {winReady ? (
        <Columns>
          {columnOrder.map((id, i) => {
            const col = stateColumns[id]
            const orders = col.ordersIds.map(
              (orderId) => state?.find(o => o.id === orderId),
            )
            return (
              <Column key={id} column={col} orders={orders} index={i} />
            )
          })}
        </Columns>
      ) : null}
    </DragDropContext>
  )
}

export default DragAndDrop
