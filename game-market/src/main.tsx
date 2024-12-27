import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Home from '@/app/page/home.tsx'
import Section from '@/app/page/section'
import Product from '@/app/page/product'
import ProfileUpdating from "@/app/page/user/profile-updating"
import CartPage from "@/app/page/user/cart"
import CheckoutPage from "@/app/page/user/checkout" // Import the CheckoutPage component
import OrderConfirmPage from "@/app/page/user/order-confirm" // Import the OrderConfirmPage component
import Dashboard from "@/app/page/admin/dashboard"
import GameManagement from "@/app/page/admin/game-management"
import UserManagement from "@/app/page/admin/user-management"
import BecomeSeller from "@/app/page/admin/become-seller"
import OrderList from "@/app/page/admin/order-list"
import UserRequest from "@/app/page/admin/user-request"
import ProductUploading from "@/app/page/provider/product-uploading"
import ProductDetail from "@/app/page/product-detail"
import SignIn from "@/app/page/auth/sign-in"
import SignUp from "@/app/page/auth/sign-up"

const data = {
  user: {
    name: "Phạm Văn Quyến",
    email: "pvquyen22@clc.fitus.edu.vn",
    avatar: "https://i.pinimg.com/736x/4e/ff/15/4eff156ff63f26f40a4280445631172d.jpg",
  },
  userType: "user",
}

createRoot(document.querySelector('.root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <SidebarProvider>
              <AppSidebar user={data.user} userType={data.userType} />
              <SidebarInset className="flex flex-col h-4 overflow-hidden">
                <Header user={data.user} userType={data.userType} className="sticky top-0 z-10 bg-background" />
                <main className="flex-grow overflow-y-auto min-w-screen">
                  <div className="mx-auto px-4">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Navigate to="/" />} />
                      <Route path="/user/game" element={<Section />} />
                      <Route path="/user/account" element={<Section />} />
                      <Route path="/user/purchase" element={<Section />} />
                      <Route path="/user/notification" element={<Section />} />
                      <Route path="/user/setting" element={<Section />} />
                      <Route path="/user/game/all" element={<Product />} />
                      <Route path="/user/game/:productId" element={<ProductDetail />} />
                      <Route path="/user/game/category" element={<Section />} />
                      <Route path="/user/account/payment" element={<Section />} />
                      <Route path="/user/account/profile" element={<ProfileUpdating />} />
                      <Route path="user/account/address" element={<Section />} />
                      <Route path="/user/account/password" element={<Section />} />
                      <Route path="/user/purchase/order" element={<Section />} />
                      <Route path="/user/purchase/history" element={<Section />} />
                      <Route path="/user/notification/order" element={<Section />} />
                      <Route path="/user/notification/promotion" element={<Section />} />
                      <Route path="/user/setting/general" element={<Section />} />
                      <Route path="/user/setting/notification" element={<Section />} />
                      <Route path="/user/setting/privacy" element={<Section />} />
                      <Route path="/user/cart" element={<CartPage />} />
                      <Route path="/user/checkout" element={<CheckoutPage />} />
                      <Route path="/user/order-confirm" element={<OrderConfirmPage />} />
                      <Route path="/admin" element={<Section />} />
                      <Route path="/admin/dashboard" element={<Dashboard />} />
                      <Route path="/admin/game-management" element={<GameManagement />} />
                      <Route path="/admin/user-management" element={<UserManagement />} />
                      <Route path="/admin/become-seller" element={<BecomeSeller />} />
                      <Route path="/admin/order-management" element={<OrderList />} />
                      <Route path="/admin/report-management" element={<UserRequest />} />
                      <Route path="/provider" element={<Section />} />
                      <Route path="/provider/dashboard" element={<Section />} />
                      <Route path="/provider/game" element={<ProductUploading />} />
                      <Route path="/provider/order" element={<Section />} />
                      <Route path="/provider/customer" element={<Section />} />
                      <Route path="/provider/finance" element={<Section />} />
                      <Route path="/provider/promotion" element={<Section />} />
                      <Route path="/provider/report" element={<Section />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    <Footer className="bg-background z-10" />
                  </div>
                </main>
              </SidebarInset>
            </SidebarProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
