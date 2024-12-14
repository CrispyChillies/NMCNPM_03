import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './app/home.tsx'
import Product from './app/product.tsx'
import Checkout from './app/checkout.tsx'
import ThankYou from './app/thankyou.tsx'
import BecomeSeller from './app/admin/become-seller.tsx'
import Dashboard from './app/admin/dashboard.tsx'
import GameManagement from './app/admin/game-management.tsx'
import OrderList from './app/order-list.tsx'
import SignIn from './app/sign-in.tsx'
import SignUp from './app/sign-up.tsx'
import UserManagement from './app/admin/user-management.tsx'
import UserRequest from './app/admin/user-request.tsx'
import ProfileUpdating from "./app/profile-updating.tsx";
import ProductUploading from "./app/product-uploading.tsx";
import ProductDetail from "./app/product-detail.tsx";

const data = {
  user: {
    name: "Phạm Văn Quyến",
    email: "pvquyen22@clc.fitus.edu.vn",
    avatar: "https://i.pinimg.com/736x/4e/ff/15/4eff156ff63f26f40a4280445631172d.jpg",
  },
  userType: "GameProvider",
}

createRoot(document.querySelector('.root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar user={data.user} userType={data.userType} />
        <SidebarInset className="flex flex-col h-screen h-4 overflow-hidden">
          <Header user={data.user} userType={data.userType} className="sticky top-0 z-10 bg-background" />
          <main className="flex-grow overflow-y-auto">
            <div className="mx-auto px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thankyou" element={<ThankYou />} />
                <Route path="/become-seller" element={<BecomeSeller />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/game-management" element={<GameManagement />} />
                <Route path="/order-list" element={<OrderList />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/user-request" element={<UserRequest />} />
                <Route path="/profile-updating" element={<ProfileUpdating />} />
                <Route path="/product-uploading" element={<ProductUploading />} />
                <Route path="/product-detail" element={<ProductDetail />} />
              </Routes>
              <Footer className="bg-background z-10" />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
)