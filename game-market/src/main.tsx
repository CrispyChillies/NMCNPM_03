import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard from './app/dashboard/page.tsx'
import Product from './app/product/page.tsx'

createRoot(document.querySelector('.dark')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

createRoot(document.querySelector('.root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)