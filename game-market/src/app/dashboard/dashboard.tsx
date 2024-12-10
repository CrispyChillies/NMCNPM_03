import { Users, Package, DollarSign, Clock } from 'lucide-react'
import { Sidebar } from "../../components/sidebar"
import { StatCard } from "../../components/stat-card"
import { SalesChart } from "../../components/sales-chart"

export default function Dashboard() {
  return (
    <div className="hidden md:block">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total User"
                    value="40,689"
                    icon={Users}
                    change={{
                      value: "8.5%",
                      trend: "up",
                      text: "Up from yesterday"
                    }}
                  />
                  <StatCard
                    title="Total Order"
                    value="10293"
                    icon={Package}
                    change={{
                      value: "1.3%",
                      trend: "up",
                      text: "Up from past week"
                    }}
                  />
                  <StatCard
                    title="Total Sales"
                    value="$89,000"
                    icon={DollarSign}
                    change={{
                      value: "4.3%",
                      trend: "down",
                      text: "Down from yesterday"
                    }}
                  />
                  <StatCard
                    title="Total Pending"
                    value="2040"
                    icon={Clock}
                    change={{
                      value: "1.8%",
                      trend: "up",
                      text: "Up from yesterday"
                    }}
                  />
                </div>
                <div className="mt-6">
                  <SalesChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

