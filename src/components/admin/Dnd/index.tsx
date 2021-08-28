import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import OrderCard from 'components/admin/Order'
import '@atlaskit/css-reset'
import { useEffect } from 'react'

const { useState, memo } = React

const data = {
  orders: {
    order1: {
      id: 'order1',
      content: (
        <OrderCard
          id={1}
          code={'1'}
          subtotal={50.3}
          time={'20:31'}
          dishs={[
            {
              comments: 'Sem cebola',
              quantity: 4,
              name: 'Sanduiches',
              price: 9.9,
            },
          ]}
        />
      ),
    },
    order2: {
      id: 'order2',
      content: (
        <OrderCard
          id={1}
          code={'1'}
          subtotal={50.3}
          time={'20:31'}
          dishs={[]}
        />
      ),
    },
    order3: {
      id: 'order3',
      content: (
        <OrderCard
          id={1}
          code={'1'}
          subtotal={50.3}
          time={'20:31'}
          dishs={[]}
        />
      ),
    },
    order4: {
      id: 'order4',
      content: (
        <OrderCard
          id={1}
          code={'1'}
          subtotal={50.3}
          time={'20:31'}
          dishs={[]}
        />
      ),
    },
  },
  columns: {
    pending: {
      id: 'pending',
      title: 'PENDING',
      ordersIds: ['order1', 'order2', 'order3', 'order4'],
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
  },
  columnOrder: ['pending', 'kitchen', 'ready', 'delivered'],
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
  <Draggable draggableId={column.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        ref={provided.innerRef}>
        <Title {...provided.dragHandleProps}>{column.title}</Title>
        <Droppable droppableId={column.id} type="order">
          {(provided, snapshot) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}>
              {orders.map((t, i) => (
                <Orders key={t.id} order={t} index={i} />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>
    )}
  </Draggable>
))

function DragAndDrop() {
  const [winReady, setwinReady] = useState(false)
  useEffect(() => {
    setwinReady(true)
  }, [])
  const [state, setState] = useState<any>(data)

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

        if (type === 'column') {
          const newColOrd = Array.from(state.columnOrder)
          newColOrd.splice(source.index, 1)
          newColOrd.splice(destination.index, 0, draggableId)

          const newState = {
            ...state,
            columnOrder: newColOrd,
          }
          setState(newState)
        }
        const startcol = state.columns[source.droppableId]
        const endcol = state.columns[destination.droppableId]

        if (startcol === endcol) {
          const orders = Array.from(startcol.ordersIds)
          orders.splice(source.index, 1)
          orders.splice(destination.index, 0, draggableId)

          const newCol = {
            ...startcol,
            ordersIds: orders,
          }

          const newState = {
            ...state,
            columns: {
              ...state.columns,
              [newCol.id]: newCol,
            },
          }

          setState(newState)
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
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newStart.id]: newStart,
            [newEnd.id]: newEnd,
          },
        }
        setState(newState)
      }}>
      {winReady ? (
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder.map((id, i) => {
                const col = state.columns[id]
                const orders = col.ordersIds.map(
                  (orderId) => state.orders[orderId],
                )
                return (
                  <Column key={id} column={col} orders={orders} index={i} />
                )
              })}
              {provided.placeholder}
            </Columns>
          )}
        </Droppable>
      ) : null}
    </DragDropContext>
  )
}

export default DragAndDrop
