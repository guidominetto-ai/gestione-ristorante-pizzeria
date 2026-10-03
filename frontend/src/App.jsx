import './App.css'
import AppRoutes from './routes/AppRoutes'
import { OrderProvider } from './context/OrderContext'

function App() {
  return (
    <OrderProvider>
      <AppRoutes />
    </OrderProvider>
  )
}

export default App