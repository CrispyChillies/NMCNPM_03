import { useEffect, useState } from 'react';
import { Users, Package, DollarSign, Clock } from 'lucide-react';
import { StatCard } from "@/components/ui/stat-card";
import { SalesChart } from "@/components/sales-chart";
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalPending: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const [usersResponse, ordersResponse, salesResponse, pendingResponse] = await axios.all([
          axios.get('http://localhost:6969/api/admin/users/count', { headers }),
          axios.get('http://localhost:6969/api/admin/orders/count', { headers }),
          axios.get('http://localhost:6969/api/admin/orders/sales', { headers }),
          axios.get('http://localhost:6969/api/admin/orders/pending', { headers })
        ]);

        setStats({
          totalUsers: usersResponse.data.totalUsers,
          totalOrders: ordersResponse.data.totalOrders,
          totalSales: salesResponse.data.totalSales,
          totalPending: pendingResponse.data.totalPending,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="w-full">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid w-full">
            <div className="w-full">
              <div className="h-full px-4 py-6 lg:px-8">
                <h1 className="text-xl font-bold mb-8 mt-2 mx-2">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total User"
                    value={stats.totalUsers}
                    icon={Users}
                    change={{
                      value: "8.5%",
                      trend: "up",
                      text: "Up from yesterday"
                    }}
                  />
                  <StatCard
                    title="Total Order"
                    value={stats.totalOrders}
                    icon={Package}
                    change={{
                      value: "1.3%",
                      trend: "up",
                      text: "Up from past week"
                    }}
                  />
                  <StatCard
                    title="Total Sales"
                    value={`$${stats.totalSales}`}
                    icon={DollarSign}
                    change={{
                      value: "4.3%",
                      trend: "down",
                      text: "Down from yesterday"
                    }}
                  />
                  <StatCard
                    title="Total Pending"
                    value={`$${stats.totalSales}`}
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
  );
}