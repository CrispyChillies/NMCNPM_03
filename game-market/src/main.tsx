import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Page from '@/app/dashboard/page'
import ProductDetail from '@/components/product-detail'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductDetail /> 
  </StrictMode>,
)
