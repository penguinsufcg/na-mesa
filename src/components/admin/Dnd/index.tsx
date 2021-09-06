import React, { useEffect, useState, memo } from 'react'
import { updateStatusOrder } from 'api/order'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import OrderCard from 'components/admin/Order'
import '@atlaskit/css-reset'
import { Flex, Text, List, Spacer, Box } from '@chakra-ui/react'

interface Orders {
  id: string
  time: string
  items: any[]
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
        <Box
          bg={snapshot.isDragging ? 'red.100' : 'white'}
          borderRadius="5"
          marginBottom="2"
          _hover= {{
            shadow: 'md',
            borderWidth: '1px',
            borderRadius: 'md',
            cursor: 'pointer',
          }}
          border="1px solid #D2D6E2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <OrderCard
            id={index}
            code={order.id}
            time={order.time}
            dishs={order.items}
          />
        </Box>
      )}
    </Draggable>
  )
})

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
const Column = memo(({ column, orders }: ColumnProps) => (
  <Droppable droppableId={column.id} type="order">
    {(provided, snapshot) => (
      <Box
        bg={snapshot.isDraggingOver ? '#F5F5F5' : '#ECECEC'}
        padding="3"
        margin="3"
        borderRadius="md"
        minHeight="800"
        width="22.5rem">
        <Flex marginBottom="24px">
          <Text fontSize="md" color="secondary.700">
            {column.title}
          </Text>
          <Spacer />
          <Text fontSize="md" color="secondary.700">
            {orders.length}
          </Text>
        </Flex>
        <List
          height="100%"
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {orders.map((o, i) => (
            <Orders key={o.id} order={o} index={i} />
          ))}
          {provided.placeholder}
        </List>
      </Box>
    )}
  </Droppable>
))

const columns = {
  pending: {
    id: 'pending',
    title: 'PENDING',
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

const columnOrder = ['pending', 'kitchen', 'ready', 'delivered']

function DragAndDrop() {
  const { data: ordersData, isLoading } = useFirestoreListQuery<Order>('orders')
  const [stateColumns, setStateColumns] = useState<any>(columns)
  const [winReady, setwinReady] = useState(false)

  useEffect(() => {
    setwinReady(true)
    if (!ordersData) {
      return
    }
    const cols = {}
    columnOrder.forEach((colId) => {
      cols[colId] = {
        id: colId,
        title: colId.toUpperCase(),
        ordersIds: ordersData
          .filter((order) => order.status === colId.toUpperCase())
          .map((o) => o.id),
      }
    })
    
    setStateColumns(cols)
  }, [ordersData])

  const handleDragEnd = (destination, source, draggableId, type) => {
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
        [newCol.id]: newCol,
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

    const prevStateColumns = stateColumns
    const newStateColumns = {
      ...stateColumns,
      [newStart.id]: newStart,
      [newEnd.id]: newEnd,
    }
    setStateColumns(newStateColumns)
    updateStatusOrder(draggableId, destination.droppableId.toUpperCase()).catch(
      (error) => {
        setStateColumns(prevStateColumns)
        console.error('Error: ', error)
      },
    )
  }

  return (
    <DragDropContext
      onDragEnd={({ destination, source, draggableId, type }) =>
        handleDragEnd(destination, source, draggableId, type)
      }>
      {winReady && (
        <Flex>
          {columnOrder.map((id, i) => {
            const col = stateColumns[id]
            const orders = col.ordersIds.map((orderId: string) =>
              ordersData?.find((o: Order) => o.id === orderId),
            )
            return <Column key={id} column={col} orders={orders} index={i} />
          })}
        </Flex>
      )}
    </DragDropContext>
  )
}

export default DragAndDrop