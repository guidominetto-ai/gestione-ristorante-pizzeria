import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-small">GESTIONE</span>
          <strong>Ristorante & Pizzeria</strong>
        </div>

        <nav className="sidebar-navigation">
          <span>Dashboard</span>
          <span>Cassa</span>
          <span>Sala</span>
          <span>Comande</span>
          <span>Prenotazioni</span>
          <span>Clienti</span>
          <span>Menu</span>
          <span>Magazzino</span>
          <span>HACCP</span>
          <span>Report</span>
        </nav>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <div>
            <strong>Gestione Ristorante e Pizzeria</strong>
          </div>

          <div className="app-header-user">
            Operatore
          </div>
        </header>

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout