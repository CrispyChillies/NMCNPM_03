import { type LucideIcon } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change: {
    value: string
    trend: "up" | "down"
    text: string
  }
}

export function StatCard({ title, value, icon: Icon, change }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${change.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                {change.value}
              </span>
              <span className="text-sm text-muted-foreground ml-1">{change.text}</span>
            </div>
          </div>
          <div className="rounded-lg p-2 bg-accent">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

