import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from '../layouts/AppLayout'
import Dashboard from '../pages/Dashboard'
import ModulePlaceholder from '../components/ModulePlaceholder'
import Sala from '../pages/Sala'
import Comanda from '../pages/Comanda'


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="cassa"
            element={
              <ModulePlaceholder
                eyebrow="Operatività"
                title="Cassa"
                description="Gestione dei conti, preconti e pagamenti gestionali."
              />
            }
          />

          <Route path="sala" element={<Sala />} />

          <Route path="comande" element={<Comanda />} />

          <Route
            path="prenotazioni"
            element={
              <ModulePlaceholder
                eyebrow="Agenda"
                title="Prenotazioni"
                description="Gestione delle richieste, prenotazioni e turni di servizio."
              />
            }
          />

          <Route
            path="clienti"
            element={
              <ModulePlaceholder
                eyebrow="CRM"
                title="Clienti"
                description="Anagrafica clienti, visite e preferenze di servizio."
              />
            }
          />

          <Route
            path="menu"
            element={
              <ModulePlaceholder
                eyebrow="Offerta"
                title="Menu"
                description="Piatti, ricette, ingredienti, allergeni e disponibilità."
              />
            }
          />

          <Route
            path="magazzino"
            element={
              <ModulePlaceholder
                eyebrow="Inventario"
                title="Magazzino"
                description="Prodotti, giacenze, movimenti, lotti e approvvigionamenti."
              />
            }
          />

          <Route
            path="haccp"
            element={
              <ModulePlaceholder
                eyebrow="Sicurezza alimentare"
                title="HACCP"
                description="Controlli, registrazioni e verifiche operative HACCP."
              />
            }
          />

          <Route
            path="report"
            element={
              <ModulePlaceholder
                eyebrow="Analisi"
                title="Report"
                description="Indicatori operativi, vendite, costi e andamento dell'attività."
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes