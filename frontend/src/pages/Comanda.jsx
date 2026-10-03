import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Send,
  Users,
} from 'lucide-react'
import { useState } from 'react'

const demoCategories = [
  'Antipasti',
  'Pizze',
  'Primi',
  'Secondi',
  'Contorni',
  'Dessert',
  'Bevande',
]

const demoMenu = [
  {
    id: 1,
    category: 'Antipasti',
    name: 'Antipasto della casa',
    price: 12,
    station: 'Antipasti',
  },
  {
    id: 2,
    category: 'Pizze',
    name: 'Margherita',
    price: 7,
    station: 'Pizzeria',
  },
  {
    id: 3,
    category: 'Pizze',
    name: 'Prosciutto e funghi',
    price: 9,
    station: 'Pizzeria',
  },
  {
    id: 4,
    category: 'Primi',
    name: 'Spaghetti al pomodoro',
    price: 10,
    station: 'Cucina',
  },
  {
    id: 5,
    category: 'Secondi',
    name: 'Tagliata di manzo',
    price: 18,
    station: 'Cucina',
  },
  {
    id: 6,
    category: 'Contorni',
    name: 'Patate al forno',
    price: 5,
    station: 'Antipasti',
  },
  {
    id: 7,
    category: 'Dessert',
    name: 'Tiramisù',
    price: 6,
    station: 'Antipasti',
  },
  {
    id: 8,
    category: 'Bevande',
    name: 'Acqua',
    price: 3,
    station: 'Bar',
  },
]

function Comanda() {
  const location = useLocation()
  const navigate = useNavigate()

  const tableSession = location.state?.tableSession ?? null

  const [category, setCategory] = useState('Pizze')
  const [items, setItems] = useState([])
  const [sentBatches, setSentBatches] = useState([])

  const visibleMenu = demoMenu.filter(
    (item) => item.category === category,
  )

  const addItem = (menuItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === menuItem.id,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          ...menuItem,
          quantity: 1,
          note: '',
        },
      ]
    })
  }

  const changeQuantity = (id, change) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const changeNote = (id, note) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, note } : item,
      ),
    )
  }

  const draftTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const sentTotal = sentBatches.reduce(
    (batchSum, batch) =>
      batchSum +
      batch.items.reduce(
        (itemSum, item) =>
          itemSum + item.price * item.quantity,
        0,
      ),
    0,
  )

  const orderTotal = sentTotal + draftTotal

  const draftQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  )

  const sendOrder = () => {
    if (!tableSession || items.length === 0) {
      return
    }

    const now = new Date()

    const newBatch = {
      id: `batch-${Date.now()}`,
      sequence: sentBatches.length + 1,
      sentAt: now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
      items: items.map((item) => ({
        ...item,
        lineId: `line-${item.id}-${Date.now()}`,
        status: 'waiting',
      })),
    }

    setSentBatches((currentBatches) => [
      ...currentBatches,
      newBatch,
    ])

    setItems([])
  }

  if (!tableSession) {
    return (
      <section>
        <div className="page-heading">
          <div>
            <p className="page-eyebrow">Comande</p>
            <h1>Nessun tavolo selezionato</h1>
            <p className="page-description">
              Apri la comanda partendo dalla Sala.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="primary-action"
          onClick={() => navigate('/sala')}
        >
          Torna alla sala
        </button>
      </section>
    )
  }

  return (
    <section>
      <div className="order-header">
        <div>
          <button
            type="button"
            className="table-opening-back"
            onClick={() => navigate('/sala')}
          >
            <ArrowLeft size={17} />
            Torna alla sala
          </button>

          <p className="page-eyebrow">Comanda</p>
          <h1>Tavolo {tableSession.tableNumber}</h1>

          <div className="order-session-info">
            <span>
              <Users size={16} />
              {tableSession.covers} coperti
            </span>

            <span>
              Cameriere: <strong>{tableSession.waiterName}</strong>
            </span>
          </div>
        </div>

        <div className="order-total">
          <span>Totale ordine</span>
          <strong>€ {orderTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div className="order-workspace">
        <div className="order-menu-panel">
          <div className="order-categories">
            {demoCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? 'order-category active'
                    : 'order-category'
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="order-products">
            {visibleMenu.map((menuItem) => (
              <button
                key={menuItem.id}
                type="button"
                className="order-product"
                onClick={() => addItem(menuItem)}
              >
                <span>{menuItem.name}</span>
                <small>{menuItem.station}</small>
                <strong>€ {menuItem.price.toFixed(2)}</strong>
              </button>
            ))}
          </div>

          {sentBatches.length > 0 && (
            <div className="sent-batches">
              <div className="sent-batches-heading">
                <span>Storico invii</span>
                <strong>{sentBatches.length}</strong>
              </div>

              {sentBatches.map((batch) => (
                <div key={batch.id} className="sent-batch">
                  <div className="sent-batch-header">
                    <div>
                      <Check size={17} />
                      <strong>Invio #{batch.sequence}</strong>
                    </div>

                    <span>{batch.sentAt}</span>
                  </div>

                  {batch.items.map((item) => (
                    <div
                      key={item.lineId}
                      className="sent-order-line"
                    >
                      <div>
                        <strong>
                          {item.quantity} × {item.name}
                        </strong>

                        <span>
                          {item.station}
                          {item.note
                            ? ` · Nota: ${item.note}`
                            : ''}
                        </span>
                      </div>

                      <span>In attesa</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="current-order">
          <div className="current-order-header">
            <div>
              <span>Nuovo invio</span>
              <h2>Tavolo {tableSession.tableNumber}</h2>
            </div>

            <strong>
              {draftQuantity}{' '}
              {draftQuantity === 1 ? 'articolo' : 'articoli'}
            </strong>
          </div>

          {items.length === 0 ? (
            <div className="empty-order">
              <p>Nessun articolo da inviare.</p>
              <span>
                Seleziona una categoria e aggiungi i piatti.
              </span>
            </div>
          ) : (
            <div className="order-lines">
              {items.map((item) => (
                <div key={item.id} className="order-line">
                  <div className="order-line-main">
                    <div>
                      <strong>{item.name}</strong>
                      <span>
                        € {item.price.toFixed(2)} · {item.station}
                      </span>
                    </div>

                    <strong>
                      € {(item.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>

                  <div className="order-line-controls">
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                        aria-label={`Riduci ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        type="button"
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                        aria-label={`Aumenta ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <input
                    className="order-note"
                    type="text"
                    placeholder="Nota o variazione..."
                    value={item.note}
                    onChange={(event) =>
                      changeNote(item.id, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}

          <div className="order-footer">
            <div className="order-footer-total">
              <span>Nuovo invio</span>
              <strong>€ {draftTotal.toFixed(2)}</strong>
            </div>

            {sentBatches.length > 0 && (
              <div className="order-footer-total">
                <span>Già inviato</span>
                <strong>€ {sentTotal.toFixed(2)}</strong>
              </div>
            )}

            <button
              type="button"
              className="primary-action order-send"
              disabled={items.length === 0}
              onClick={sendOrder}
            >
              <Send size={18} />
              Invia comanda
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Comanda