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
            <div className="container mx-auto px-4">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
              <Footer className="bg-background z-10" />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
)