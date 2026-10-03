import { createContext, useContext, useState } from 'react'

const OrderContext = createContext(null)

const initialTables = [
  { id: 1, number: '1', seats: 2, status: 'free' },
  { id: 2, number: '2', seats: 2, status: 'free' },
  {
    id: 3,
    number: '3',
    seats: 4,
    status: 'occupied',
    covers: 3,
    waiterId: 1,
    waiterName: 'Cameriere 1',
  },
  {
    id: 4,
    number: '4',
    seats: 4,
    status: 'reserved',
    reservation: '20:30',
  },
  { id: 5, number: '5', seats: 4, status: 'free' },
  {
    id: 6,
    number: '6',
    seats: 6,
    status: 'occupied',
    covers: 5,
    waiterId: 2,
    waiterName: 'Cameriere 2',
  },
  { id: 7, number: '7', seats: 2, status: 'free' },
  {
    id: 8,
    number: '8',
    seats: 6,
    status: 'reserved',
    reservation: '22:00',
  },
]

export const ORDER_LINE_STATUS = {
  WAITING: 'waiting',
  PREPARING: 'preparing',
  READY: 'ready',
  SERVED: 'served',
}

export const ORDER_LINE_STATUS_LABELS = {
  waiting: 'In attesa',
  preparing: 'In preparazione',
  ready: 'Pronto',
  served: 'Servito',
}

function OrderProvider({ children }) {
  const [tables, setTables] = useState(initialTables)
const [sentBatches, setSentBatches] = useState([])

  const sendOrderBatch = ({ tableSession, items }) => {
    if (!tableSession || items.length === 0) {
      return null
    }

    const now = new Date()
    const batchId = `batch-${crypto.randomUUID()}`

    const newBatch = {
      id: batchId,
      tableSession: {
        ...tableSession,
      },
      sentAt: now.toISOString(),
      sentTime: now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: items.map((item) => ({
        ...item,
        lineId: `line-${crypto.randomUUID()}`,
        status: ORDER_LINE_STATUS.WAITING,
      })),
    }

    setSentBatches((currentBatches) => [
      ...currentBatches,
      newBatch,
    ])

    return newBatch
  }

  const updateOrderLineStatus = (lineId, status) => {
    if (!Object.values(ORDER_LINE_STATUS).includes(status)) {
      return
    }

    setSentBatches((currentBatches) =>
      currentBatches.map((batch) => ({
        ...batch,
        items: batch.items.map((item) =>
          item.lineId === lineId
            ? {
                ...item,
                status,
              }
            : item,
        ),
      })),
    )
  }

 const value = {
  tables,
  setTables,
  sentBatches,
  sendOrderBatch,
  updateOrderLineStatus,
}

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}

function useOrders() {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error(
      'useOrders deve essere utilizzato dentro OrderProvider',
    )
  }

  return context
}

export { OrderProvider, useOrders }