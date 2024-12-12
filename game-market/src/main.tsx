import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './app/dashboard/page.tsx'
import ProductPage from './app/product_page/page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductPage />
  </StrictMode>,
)