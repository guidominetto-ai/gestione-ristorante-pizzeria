import { useState } from 'react'
import { Users, X } from 'lucide-react'

const demoTables = [
  { id: 1, number: '1', seats: 2, status: 'free' },
  { id: 2, number: '2', seats: 2, status: 'free' },
  { id: 3, number: '3', seats: 4, status: 'occupied', covers: 3 },
  { id: 4, number: '4', seats: 4, status: 'reserved', reservation: '20:30' },
  { id: 5, number: '5', seats: 4, status: 'free' },
  { id: 6, number: '6', seats: 6, status: 'occupied', covers: 5 },
  { id: 7, number: '7', seats: 2, status: 'free' },
  { id: 8, number: '8', seats: 6, status: 'reserved', reservation: '22:00' },
]

const statusLabels = {
  free: 'Libero',
  occupied: 'Occupato',
  reserved: 'Prenotato',
}

function Sala() {
  const [selectedTable, setSelectedTable] = useState(null)

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">Gestione sala</p>
          <h1>Sala e tavoli</h1>
          <p className="page-description">
            Situazione operativa dei tavoli durante il servizio.
          </p>
        </div>

        <div className="service-badge">
          <span className="service-dot" />
          Servizio cena
        </div>
      </div>

      <div className="room-summary">
        <div className="summary-item">
          <span>Tavoli</span>
          <strong>8</strong>
        </div>

        <div className="summary-item">
          <span>Liberi</span>
          <strong>4</strong>
        </div>

        <div className="summary-item">
          <span>Occupati</span>
          <strong>2</strong>
        </div>

        <div className="summary-item">
          <span>Prenotati</span>
          <strong>2</strong>
        </div>

        <div className="summary-item">
          <span>Coperti disponibili</span>
          <strong>30</strong>
        </div>
      </div>

      <div className={`room-workspace${selectedTable ? ' table-selected' : ''}`}>
        <div className="room-panel">
          <div className="room-panel-header">
            <div>
              <h2>Sala principale</h2>
              <p>Seleziona un tavolo per visualizzarne i dettagli.</p>
            </div>

            <div className="table-legend">
              <span>
                <i className="legend-dot legend-free" />
                Libero
              </span>

              <span>
                <i className="legend-dot legend-occupied" />
                Occupato
              </span>

              <span>
                <i className="legend-dot legend-reserved" />
                Prenotato
              </span>
            </div>
          </div>

          <div className="table-map">
            {demoTables.map((table) => (
              <button
                key={table.id}
                type="button"
                className={
                  `restaurant-table table-${table.status}` +
                  (selectedTable?.id === table.id ? ' restaurant-table-selected' : '')
                }
                onClick={() => setSelectedTable(table)}
              >
                <span className="table-number">{table.number}</span>

                <span className="table-status">
                  {statusLabels[table.status]}
                </span>

                <span className="table-seats">
                  {table.seats} posti
                </span>
              </button>
            ))}
          </div>
        </div>

        {selectedTable && (
          <aside className="table-detail-panel">
            <div className="table-detail-header">
              <div>
                <span className="table-detail-eyebrow">Tavolo</span>
                <h2>{selectedTable.number}</h2>
              </div>

              <button
                type="button"
                className="table-detail-close"
                onClick={() => setSelectedTable(null)}
                aria-label="Chiudi dettagli tavolo"
              >
                <X size={20} />
              </button>
            </div>

            <div className={`table-detail-status detail-${selectedTable.status}`}>
              {statusLabels[selectedTable.status]}
            </div>

            <div className="table-detail-info">
              <div>
                <span>Capienza</span>
                <strong>
                  <Users size={17} />
                  {selectedTable.seats} posti
                </strong>
              </div>

              {selectedTable.status === 'occupied' && (
                <div>
                  <span>Coperti presenti</span>
                  <strong>{selectedTable.covers}</strong>
                </div>
              )}

              {selectedTable.status === 'reserved' && (
                <div>
                  <span>Prossima prenotazione</span>
                  <strong>{selectedTable.reservation}</strong>
                </div>
              )}
            </div>

            <div className="table-detail-actions">
              {selectedTable.status === 'free' && (
                <button type="button" className="primary-action">
                  Apri tavolo
                </button>
              )}

              {selectedTable.status === 'occupied' && (
                <>
                  <button type="button" className="primary-action">
                    Apri comanda
                  </button>
                  <button type="button" className="secondary-action">
                    Dettagli servizio
                  </button>
                </>
              )}

              {selectedTable.status === 'reserved' && (
                <>
                  <button type="button" className="primary-action">
                    Vedi prenotazione
                  </button>
                  <button type="button" className="secondary-action">
                    Registra arrivo
                  </button>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}

export default Sala