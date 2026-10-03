import { ArrowRight, ChefHat, Clock, Users } from 'lucide-react'

import {
  ORDER_LINE_STATUS,
  ORDER_LINE_STATUS_LABELS,
  useOrders,
} from '../context/OrderContext'

const nextStatus = {
  [ORDER_LINE_STATUS.WAITING]: ORDER_LINE_STATUS.PREPARING,
  [ORDER_LINE_STATUS.PREPARING]: ORDER_LINE_STATUS.READY,
  [ORDER_LINE_STATUS.READY]: ORDER_LINE_STATUS.SERVED,
}

const actionLabels = {
  [ORDER_LINE_STATUS.WAITING]: 'Inizia preparazione',
  [ORDER_LINE_STATUS.PREPARING]: 'Segna pronto',
  [ORDER_LINE_STATUS.READY]: 'Segna servito',
}

function KdsPizzeria() {
  const {
    sentBatches,
    updateOrderLineStatus,
  } = useOrders()

  const pizzeriaBatches = sentBatches
    .map((batch) => ({
      ...batch,
      items: batch.items.filter(
        (item) =>
          item.station === 'Pizzeria' &&
          item.status !== ORDER_LINE_STATUS.SERVED,
      ),
    }))
    .filter((batch) => batch.items.length > 0)

  const handleAdvanceStatus = (lineId, currentStatus) => {
    const status = nextStatus[currentStatus]

    if (!status) {
      return
    }

    updateOrderLineStatus(lineId, status)
  }

  return (
    <section className="kds-page">
      <div className="kds-header">
        <div>
          <div className="kds-title-row">
            <ChefHat size={28} />
            <h1>KDS Pizzeria</h1>
          </div>

          <p>
            Comande inviate alla postazione Pizzeria
          </p>
        </div>

        <div className="kds-counter">
          <strong>
            {pizzeriaBatches.reduce(
              (total, batch) =>
                total +
                batch.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                ),
              0,
            )}
          </strong>
          <span>piatti attivi</span>
        </div>
      </div>

      {pizzeriaBatches.length === 0 ? (
        <div className="kds-empty">
          <ChefHat size={40} />
          <h2>Nessuna comanda in attesa</h2>
          <p>
            Le nuove righe destinate alla Pizzeria
            compariranno qui automaticamente.
          </p>
        </div>
      ) : (
        <div className="kds-grid">
          {pizzeriaBatches.map((batch) => (
            <article
              className="kds-ticket"
              key={batch.id}
            >
              <div className="kds-ticket-header">
                <div>
                  <strong>
                    Tavolo {batch.tableSession.tableNumber}
                  </strong>

                  <span className="kds-ticket-covers">
                    <Users size={15} />
                    {batch.tableSession.covers} coperti
                  </span>
                </div>

                <div className="kds-ticket-time">
                  <Clock size={15} />
                  {batch.sentTime}
                </div>
              </div>

              <div className="kds-ticket-waiter">
                Cameriere:{' '}
                <strong>
                  {batch.tableSession.waiterName}
                </strong>
              </div>

              <div className="kds-ticket-lines">
                {batch.items.map((item) => (
                  <div
                    className={`kds-line kds-line-${item.status}`}
                    key={item.lineId}
                  >
                    <div className="kds-line-main">
                      <div>
                        <strong className="kds-line-name">
                          {item.quantity} × {item.name}
                        </strong>

                        {item.note && (
                          <p className="kds-line-note">
                            Nota: {item.note}
                          </p>
                        )}
                      </div>

                      <span
                        className={`kds-status kds-status-${item.status}`}
                      >
                        {ORDER_LINE_STATUS_LABELS[item.status]}
                      </span>
                    </div>

                    {nextStatus[item.status] && (
                      <button
                        type="button"
                        className="kds-action"
                        onClick={() =>
                          handleAdvanceStatus(
                            item.lineId,
                            item.status,
                          )
                        }
                      >
                        {actionLabels[item.status]}
                        <ArrowRight size={17} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default KdsPizzeria