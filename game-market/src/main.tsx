import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DashboardDemo from './app/dashboard/page'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <DashboardDemo/>
  </StrictMode> 
)
