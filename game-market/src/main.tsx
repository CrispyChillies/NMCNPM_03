import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './app/dashboard/page.tsx'
import ProductPage from './app/product_page/page.tsx'
import ThankYouPage from './app/thankyou/page.tsx'
import CheckoutPage from './app/checkout/page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CheckoutPage />
  </StrictMode>,
)