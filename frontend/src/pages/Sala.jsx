const demoTables = [
  { id: 1, number: '1', seats: 2, status: 'free' },
  { id: 2, number: '2', seats: 2, status: 'free' },
  { id: 3, number: '3', seats: 4, status: 'occupied' },
  { id: 4, number: '4', seats: 4, status: 'reserved' },
  { id: 5, number: '5', seats: 4, status: 'free' },
  { id: 6, number: '6', seats: 6, status: 'occupied' },
  { id: 7, number: '7', seats: 2, status: 'free' },
  { id: 8, number: '8', seats: 6, status: 'reserved' },
]

const statusLabels = {
  free: 'Libero',
  occupied: 'Occupato',
  reserved: 'Prenotato',
}

function Sala() {
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
              className={`restaurant-table table-${table.status}`}
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
    </section>
  )
}

export default Sala