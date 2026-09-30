import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from '../layouts/AppLayout'
import Dashboard from '../pages/Dashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes