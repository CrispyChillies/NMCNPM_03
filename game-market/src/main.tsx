import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DashboardDemo from './app/dashboard/page'
import { Header } from "@/components/header"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import SignIn from './app/signin/sign-in';
import SignUp from './app/signup/sign-up';
import OrderListPage from './app/order-list/page';
import UserManagementPage from './app/user-management/user-management';
import GameManagementPage from './app/game-managment/game-management';
import UserRequest from './app/user-request-pending/user-request';
import Dashboard from './app/dashboard/dashboard';
import BecomeSeller from './app/become-seller-pending/become-seller';
import {data} from '@/app/dashboard/page'

// Create a layout component for pages with sidebar
const LayoutWithSidebar = ({ children } : { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen h-4 overflow-hidden">
        <Header user={data.user} className="sticky top-0 z-10 bg-background" />
        <main className="flex-grow overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes with sidebar */}
        <Route
          path="/*"
          element={
            <LayoutWithSidebar>
              <Routes>
                <Route path="/dashboard" element={<Dashboard/>} /> 
                <Route path="/orders" element={<OrderListPage />} />
                <Route path="/users" element={<UserManagementPage />} />
                <Route path="/games" element={<GameManagementPage />} />
                <Route path="/user-requests" element={<UserRequest />} />
                <Route path="/dashboard-demo" element={<DashboardDemo />} />
                <Route path="/becomeseller-requests" element={<BecomeSeller />} />
              </Routes>
            </LayoutWithSidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode> 
)