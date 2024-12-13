const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    }
  };


<SidebarProvider>
<AppSidebar />
<SidebarInset className="flex flex-col h-screen overflow-hidden h-4">
  <Header user={data.user} className="sticky top-0 z-10 bg-background" />

</SidebarInset>
</SidebarProvider>