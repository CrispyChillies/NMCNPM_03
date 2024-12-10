import { Bell, Heart, LogOut, MessageSquare, Package, Settings } from 'lucide-react'
// import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-[200px]", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-8">
            {/* <Link href="/" className="flex items-center">
              <div className="rounded bg-rose-500 p-2 mr-2">
                <h1 className="text-white font-semibold">GAME</h1>
              </div>
            </Link> */}
          </div>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start bg-emerald-600 text-white hover:bg-emerald-700">
              Category
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" />
              Favorite
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notification
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
        <div className="space-y-1">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Kien
          </h2>
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}

