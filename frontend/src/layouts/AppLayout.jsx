import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

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