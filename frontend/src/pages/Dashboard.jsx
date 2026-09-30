function Dashboard() {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">Panoramica</p>
          <h1>Dashboard</h1>
          <p className="page-description">
            Situazione operativa del ristorante in tempo reale.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span>Tavoli occupati</span>
          <strong>0</strong>
        </div>

        <div className="dashboard-card">
          <span>Prenotazioni di oggi</span>
          <strong>0</strong>
        </div>

        <div className="dashboard-card">
          <span>Coperti</span>
          <strong>0</strong>
        </div>

        <div className="dashboard-card">
          <span>Comande aperte</span>
          <strong>0</strong>
        </div>
      </div>
    </section>
  )
}

export default Dashboard