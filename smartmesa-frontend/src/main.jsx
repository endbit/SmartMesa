import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/AppRoutes.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </StrictMode>,
)
