import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

