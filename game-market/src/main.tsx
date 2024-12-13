import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './app/signin/sign-in'
import SignUp from './app/signup/sign-up'
import OrderListPage from './app/order-list/page'
import UserManagementPage from './app/user-management/user-management'
import GameManagementPage from './app/game-managment/game-management'
import UserRequest from './app/user-request-pending/user-request'
import Dashboard from './app/dashboard/dashboard'
import DashboardDemo from './app/dashboard/page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/games" element={<GameManagementPage />} />
        <Route path="/user-requests" element={<UserRequest />} />
        <Route path="/dashboard-demo" element={<DashboardDemo />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
